---
sidebar_position: 3
---
import Link from '@docusaurus/Link';

# Flashing

## Verifying the connection

Open a console window where `esptool` is available. Test it using `esptool version`.

## Preparation

Follow the instructions for your specific hardware:

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


## Backing up factory software

:::warning

Successful completion of this step is _critical_ in case something goes wrong later. This file is necessary to restore the device to factory function.

:::

Run the following in the console: `esptool.py -b 921600 read_flash 0 0x800000 flash_contents.bin`.

If the above command fails, try again using `esptool.py -b 115200 read_flash 0 0x800000 flash_contents.bin`. 

:::info

**Apple Silicon (M1, M2, etc)**

If you're using an Apple Silicon (M1, M2, etc) CPU and it stops working after a certain percentage every time, try using a different machine.

:::

## Flashing ESPHome

Use the ESPHome dashboard to perform the initial flashing, which is just a placeholder configuration. We will load the configuration for your specific setup later, over WiFi, once the system is installed in the panel.

In the ESPHome dashboard, click "New Device". 

![the "New Device" button in the ESPHome dashboard](esphome-new-device.png)

Enter a device name for your Vue, which you will use later to identify it if you have multiple panels.

![dialog prompt for the ESPHome device name](esphome-device-name.png)

Select "ESP32" as the device type.

![dialog prompt for the device type](esphome-device-type.png)

Click "Install"

![prompt to install the new device](esphome-install-start.png)

Proceed to flash the board by clicking either "Plug into this computer" or "Plug into the computer running ESPHome Device Builder", as needed for your situation.

![the list of available install options](esphome-install-types.png)
