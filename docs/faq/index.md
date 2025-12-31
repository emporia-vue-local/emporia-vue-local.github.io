---
sidebar_position: 7
---

# FAQ


## What is MQTT?

MQTT is an alternative way of communicating the readings. If you need it, you already know, and it is not required for use with Home Assistant.

## How do I use this with MQTT?

There's now support for MQTT with this integration thanks to the hard work of the ESPHome folks! Please reference [MQTT Client Component](https://esphome.io/components/mqtt.html) for how to get this set up.

## I'm seeing zeros on certain current clamps

First off, you will want to remove all filters for that sensor. Replace `filters: [ *throttle_avg, *pos ]`, etc, with `filters: []`.

If your data is hovering around 0, then you either don't have any load on that circuit or there's some other issue that hasn't come up before.

If you're seeing negative data, it could be a few things:

- First off, make sure you've properly installed the clamps according to the instructions. The L side of the clamp should point towards the load. For solar systems or similar, keep in mind that current flows from the solar panel to your electrical panel, not the other way.
- Make sure you've selected the correct phase in the configuration. You will get negative _and_ nonsense power readings if you select the wrong phase. You can't negate the data through a filter and expect it to be correct.

When you're done troubleshooting, remember to place the filters back.

## I have unused / unplugged / open clamps

If a clamp isn't used or isn't installed, remove its entry from the `ct_clamps` list and delete any expressions or templates that reference it.

For example, if you remove `cir16`, update any math that still references it:

```diff
   - platform: template
     lambda: !lambda |-
       return max(0.0f, id(total_power).state -
         id( cir1).state -
         id( cir2).state -
         id( cir3).state -
         id( cir4).state -
         id( cir5).state -
         id( cir6).state -
         id( cir7).state -
         id( cir8).state -
         id( cir9).state -
         id(cir10).state -
         id(cir11).state -
         id(cir12).state -
         id(cir13).state -
         id(cir14).state -
-        id(cir15).state -
-        id(cir16).state);
+        id(cir15).state);
```

## I'm getting negative values

- You may have put that clamp on the wire backwards
- You may have selected the wrong phase in the configuration

## The readings on one or two of my sensors are crazy

Sometimes the CTs aren't fully plugged into the 3.5mm jacks on the Vue 2. It's often not an issue with the initial install, but with stuff getting jostled around as you put things back together.

This issue will often manifest as jumps between 0W and some other wattage for no reason.

Open up the panel, and make sure every connector is fully inserted into the Vue. Check if the problem is solved before putting the panel cover back on.

Alternatively, if you intend to leave certain slots empty, you'll need to see ["I have unused / unplugged / open clamps"](#i-have-unused--unplugged--open-clamps).

## My data readings go up and down

If your readings are within ±1W, then they're within the expected margin of error. The filters are designed to smooth out noise like this, and it's expected as no physical system can be perfect.

If the readings are significant outside of that, there may be a problem.

## I'm using a 64-bit Pi & can't compile!

Some users have successfully managed to build this on a 64-bit Pi: https://github.com/emporia-vue-local/esphome/discussions/147

~If you're using a 64-bit ARM OS, unfortunately you are unable to build this. It's not a limitation with this project, but a limitation with the upstream PlatformIO toolchains.~

You'll see an error like

```
Could not find the package with 'platformio/toolchain-esp32ulp @ ~1.22851.0' requirements for your system 'linux_aarch64'
```

You can try using a different computer. 32-bit and 64-bit x86 computers are both compatible (most laptops & desktops).
