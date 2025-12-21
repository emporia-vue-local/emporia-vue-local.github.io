---
sidebar_position: 5
---

# Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import Mustache from 'mustache';

import configTemplate from './base-config.mustache.yaml?raw';

export const vue2Context = {
    variant: 'vue2',
    calibration: 0.022,
    vue2: true,
    vue3: false
};

export const vue3Context = {
    variant: 'vue3',
    calibration: 0.01925,
    vue2: false,
    vue3: true
};

# Complete Configuration

This firmware uses ESPHome as the base, which means that your system is configured with a text-based configuration format.
You'll need your notes from the panel installation to fill out that configuration file with the details for your specific system.

A common feature in configuration files are comments. Everything after the `#` symbol on a given line will be ignored by the computer.
In the text below, these comments frequently contain explanation or instruction.

Below you'll find a starting point. You'll need to tailor this to your own system using the information you've collected in Panel installation.

We've broken out some [substitutions](https://esphome.io/components/substitutions/) for the repeated circuit names but note that you will still need to go to each circuit within the `ct_clamps` section and make sure for each:

* the `phase_id` is set to the correct leg of your panel for that circuit
    * see [this explanation](https://github.com/emporia-vue-local/esphome/discussions/332#discussioncomment-12257818)
* you have the right either `*pos` or `*neg` filter depending on which direction the CT reads
    * note that the suggested filters also [truncate out noise](https://github.com/emporia-vue-local/esphome/discussions/354) that would lead to negative energy readings. for solar or other generation this may not be what you want!
* if you want to adjust the reading, e.g. it is common to `multiply: 2` if you are monitoring half of a double-pole breaker
    * compare [this alternative](https://github.com/emporia-vue-local/esphome/discussions/55#discussioncomment-5018829) wiring

<Tabs groupId="vue-version">
  <TabItem value="vue2" label="Emporia Vue Gen 2">
    <CodeBlock language="yaml" title="vue2.yaml">
      {Mustache.render(configTemplate, vue2Context).trim()}
    </CodeBlock>
  </TabItem>
  <TabItem value="vue3" label="Emporia Vue Gen 3">
    <CodeBlock language="yaml" title="vue3.yaml">
      {Mustache.render(configTemplate, vue3Context).trim()}
    </CodeBlock>
  </TabItem>
</Tabs>

## How it works

There's a lot here, don't get overwhelmed! A lot of it is simply repeated 16x for each of the circuits. The general outline is:

* per-circuit labels ([split out](https://esphome.io/guides/yaml/#substitutions) for convenience)
* some shared filters (more on these later)
* the core `emporia_vue` sensor configuration:
    * starting with the per-phase A/B(/C) *voltage* monitoring [sometimes called L1/L2/L3 poles]
    * followed by the per-phase A/B(/C) *current* sensing CTs  [again intended for the mains/poles into the panel]
    * and then the 16x individual circuit CT sensors (really the same, only indented differently, as the per-phase ones)
    * NOTE: all these subsensors update [every 240ms](https://github.com/emporia-vue-local/esphome/discussions/333)!
* templates to prepare the readings for more efficient Home Assistant data collection:
    * each of the current sensors live power reading copied into HA via a `throttle_avg` (5sec) filter
    * each of the sensors integrated into a total daily energy reading via a 1m `throttle_time` (1min) filter
    * also a `balance_power` template (which you can remove if not wanted) which subtracts the 16x individual from the A+B total [for comparison](https://github.com/emporia-vue-local/esphome/discussions/329)

Note especially the `throttle_avg` we set up. This is optional, but since we get a reading every 240ms, it is helpful to average these readings together so that we don't need to store such dense, noisy, data in Home Assistant. Similarly note the "Total Power", "Total Daily Energy", and "Circuit x Daily Energy". These are needed for the Home Assistant energy system, which requires daily kWh numbers. These are (again optionally) processed through a customizable `throttle_time` filter so HA gets a reading every minute.

Okay, so that's still a lot. The general flow is:

```
(Emporia-local)     (Copied to Home Assistant)
  raw readings  -->  smoothed power (5s)
    (240ms)     \->  daily integral (60s)

total = A + B
balance = total - (1 + 2 + 3 + … + 16)
```

## Solar & Net metering

To configure energy returned to the grid for net metering ([more info here](https://www.nrel.gov/state-local-tribal/basics-net-metering.html)), you need to add the following configuration:

```yaml
sensor:
  - platform: emporia_vue
    ct_clamps:
      - phase_id: phase_a
        input: "A"  # Verify the CT going to this device input also matches the phase/leg
        power:
          name: "Phase A Power Return"
          id: phase_a_power_return
          filters: [*throttle_avg, *invert]  # This measures energy uploaded to grid on phase A
      - phase_id: phase_b
        input: "B"  # Verify the CT going to this device input also matches the phase/leg
        power:
          name: "Phase B Power Return"
          id: phase_b_power_return
          filters: [*throttle_avg, *invert]  # This measures energy uploaded to grid on phase B
  - platform: template
    name: "Total Power Return"
    lambda: return id(phase_a_power_return).state + id(phase_b_power_return).state;
    update_interval: 1s
    id: total_power_return
    device_class: power
    state_class: measurement
    unit_of_measurement: "W"
  - platform: total_daily_energy
    name: "Total Daily Energy Return"
    power_id: total_power_return
    accuracy_decimals: 0

```

Your solar sensors' configuration depends on your setup (single phase, split phase, 3-phase). The following example shows a split-phase installation using ct clamps 15 and 16:

```yaml
sensor:
  - platform: template
    name: "Solar Power"
    lambda: return id(cir15).state + id(cir16).state;
    id: solar_power
    device_class: power
    state_class: measurement
    unit_of_measurement: "W"
  - platform: total_daily_energy
    name: "Solar Daily Energy"
    power_id: solar_power
    accuracy_decimals: 0
```
