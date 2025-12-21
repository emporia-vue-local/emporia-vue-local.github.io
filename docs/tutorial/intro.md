---
sidebar_position: 0
title: Welcome
pagination_next: null
---

import Link from '@docusaurus/Link';

# Local Control for Emporia Vue

The Emporia Vue is an excellent piece of hardware for measuring your home's electrical consumption.
Critically, it has a UL listing that proves that it has been designed and tested to be safe,
something many hobbyist solutions lack.

The goal of this project, and this guide, is to help you get (unofficial) Open Source firmware
running on your Emporia Vue so that you can control it locally from
[Home Assistant](https://www.home-assistant.io/). This gets you

- faster update times
- fully offline function, with no internet requirement
- the ability to automate your home based on your power consumption, to, for example, handle time-of-use billing

It is an unofficial project, so you should not expect any support from Emporia on your flashed hardware.

:::danger

**Working with mains electricity is dangerous**

You should not attempt flashing the board while it is connected to mains electricity, for both your and your computer's safety.

Electrical panel work should only be done by a qualified person.

:::

## Supported Hardware

This project supports both the Emporia Vue 2 and the Emporia Vue 3.

## What you need

- Working ESPHome installation [(see "Getting started")](https://esphome.io/)
- The [esptool](https://github.com/espressif/esptool) utility ([windows instructions](https://cyberblogspot.com/how-to-install-esptool-on-windows-10/), [generic instructions](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html))
- Emporia Vue, either v2 or v3
- USB to serial converter module (cheap & generic CH340G adapter should work, ideally with CTS+DTR pins)

## Flashing tools

All of these are valid options, but different people will have different skill levels and different tools already on hand.
Use whichever technique is most convinent for you.

### Solder headers (Vue 2)

- 4 to 6 male-to-female jumper wires
- 4 to 6 male pcb-mount headers
- Soldering iron & accessories
  - [some recommendations here][soldering-iron]

[soldering-iron]: https://web.archive.org/web/20250803172237/https://old.reddit.com/r/AskElectronics/wiki/soldering

### Clip technique (Vue 2)

See [clowrey's community post for details.](https://github.com/emporia-vue-local/esphome/discussions/53)

- [7 pin pogo pin adapter](https://www.aliexpress.us/item/3256803519317326.html)

### BDM Frame (Vue 2, Vue 3)

See [digiblur's guide here. It's for different device, but the concept is the same.](https://digiblur.com/wiki/devices/plugs/wyze_plug_outdoor_wlppo1/#how-to-flash-esphome-or-tasmota)

Ideally you would want a BDM frame with 6 probes.

### Soldering (Vue 3)

You can carefully solder on jumper wires but note that the pads are fragile!

- 4 to 6 male-to-female jumper wires
- Soldering iron & accessories
  - [some recommendations here][soldering-iron]

## Next Steps

Select your hardware version to continue:

<div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
  <Link
    className="pagination-nav__link"
    to="./hardware-prep-v2">
    <div className="pagination-nav__sublabel">Continue to</div>
    <div className="pagination-nav__label">Hardware Prep for the Emporia Vue 2</div>
  </Link>
  <Link
    className="pagination-nav__link"
    to="./hardware-prep-v3">
    <div className="pagination-nav__sublabel">Continue to</div>
    <div className="pagination-nav__label">Hardware Prep for the Emporia Vue 3</div>
  </Link>
</div>
