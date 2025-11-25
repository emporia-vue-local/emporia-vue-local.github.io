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

### Command line

Run `esphome run <yourfilename>.yaml`, replacing `<yourfilename>.yaml` with the basic config you've set up before.

### ESPHome dashboard

If you're using the ESPHome dashboard, just click the install button and select "Plug into this computer" or "Plug into the computer running ESPHome Device Builder", as needed for your situation.

### Expected error messages

Once installed, you might see a bunch of errors like `Failed to read from sensor due to I2C error 3`, but that's fine, and they'll go away when it is installed into the wall.
