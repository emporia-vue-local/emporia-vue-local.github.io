---
sidebar_position: 1
pagination_prev: tutorial/intro
pagination_next: tutorial/flashing
---

# Hardware Preparation (Vue 2)



Guide the user through the physical modification of the device and the electrical panel work.

## Panel Installation (Part 1)

### Mapping circuits
* The "Writing on tape" step.

### Identifying phases and multipliers

## Vue 2 Modification

### Opening the case

Use a small philips screwdriver to open the case. You will then need to solder a serial header onto the programming port, so that it looks like this:

![closeup of the debug header pinout](./vue2-headers.jpeg)

If your TTL adapter has both the DTR and RTS pins exposed, you can let it automatically reboot the board and put the chip into flash mode when necessary. IO0 connects to DTR, and EN connects to RTS. In this case, you can skip to [Connecting UART](#connecting-uart).

### Manufacture the ground jumper

Pry the lever on one of the jumper cables up using a pencil or a needle or some other sharp thing. If your cables don't have a lever, cut one end of the cable & strip it using scissors or a knife.

![prying the lever on the jumper cable](./ground-jumper-1.jpeg)

![separated cable](./ground-jumper-2.jpeg)


### Soldering the header pins
*(Insert images here)*

## Connecting UART




Plug the USB adapter in. Connect RX to RX, TX to TX, and GND to GND. Do not connect 5V or 3.3V at this time.

Plug in the unmodified end of the cable we modified above into the IO0 pin of the Emporia Vue 2.

Open a console window and test that `esptool.py version` works.

![photo of connected jumpers](https://i.imgur.com/TmB5PPV.jpeg)
Hold the modified end of the cable in IO0 to the metal shield on the ESP32. If you'd like, you can tape it down so that you have both hands free.

While holding it in place, connect 5V on your UART adapter to the `VCC_5V0` pin on the board.

If your TTL adapter has both the DTR and RTS pins exposed, you can let it automatically reboot the board and put the chip into flash mode when necessary. IO0 connects to DTR, and EN connects to RTS. In this case, you don't need to hold anything down.

### Doing a backup

With your other hand, run the following in the console: `esptool.py -b 921600 read_flash 0 0x800000 flash_contents.bin`. Successful completion of this step is _critical_ in case something goes wrong later. This file is necessary to restore the device to factory function.

If the above command fails, try again using `esptool.py -b 115200 read_flash 0 0x800000 flash_contents.bin`. If you're using an Apple Silicon (M1, M2, etc) CPU and it stops working after a certain percentage every time, try using a different machine


### Wiring diagram
* RX -> TX
* TX -> RX
* GND -> GND
* IO0 -> GND

:::danger STOP POINT
**Explicit instruction not to connect 5V yet.**
:::
