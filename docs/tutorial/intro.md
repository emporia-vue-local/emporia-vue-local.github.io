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

## Prerequisites (Bill of Materials)

### Hardware list

- Emporia Vue, either v2 or v3
- USB to serial converter module
    - I tested this with a cheap & generic CH340G adapter
- 4 male-to-female jumper wires
- 4 male pcb-mount headers
- Soldering iron & accessories
    - [some recommendations here][soldering-iron]

[soldering-iron]: https://web.archive.org/web/20250803172237/https://old.reddit.com/r/AskElectronics/wiki/soldering

### Software list

- [esptool.py](https://github.com/espressif/esptool) ([windows instructions](https://cyberblogspot.com/how-to-install-esptool-on-windows-10/), [generic instructions](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html))
- Working ESPHome installation [(see "Getting started")](https://esphome.io/)

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
