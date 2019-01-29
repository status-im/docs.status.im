---
id: pairing
title: Pairing devices
layout: tutorials
---

This tutorial will explain how to correctly pair your devices, allowing your status client to sync contacts, public chats & messages.

# What is synced

Currently we sync:

- your profile picture and name
- your open public chats
- the messages you send in chats
- your contacts

Some things we do not sync:

- Seen status in your chats
- messages you sent before pairing

# How it works

First you need to *pair* and *enable* your devices (say A & B), this operation is symmetrical and needs to be done on both device.

A maximum of 3 devices can be paired.

## Instructions

Go to Profile->Devices.
You will be asked to set a name for your device.
Once you set a name, click on `Pair this device` on both devices.
You should see now the two devices in the device lists.
Enable the devices on both.

### Syncing old data

Once you have enabled the device, new information will be kept in sync.
To sync old data (contacts and open public chats, account profile), click on `Sync all devices` on the device where you have the data, and it should then appear on the other device if synced correcly.

# Troubleshooting

## Data is not synced

Make sure devices are paired correctly and enabled. If the problem still persist you can try clicking on `Pair this device` again on both devices and `disable` and `enable` them again. In any case please open an issue at https://github.com/status-im/status-react and upload your `geth.log` from both devices (after sending sending a message from both device A & B)

# Examples

### Example on android

![android-1](../img/pairing_android_01.png)
![android-2](../img/pairing_android_02.png)
![android-3](../img/pairing_android_03.png)
![android-4](../img/pairing_android_04.png)
![android-5](../img/pairing_android_05.png)


### Example on desktop

![android-1](../img/pairing_desktop_01.png)
![android-2](../img/pairing_desktop_02.png)
![android-3](../img/pairing_desktop_03.png)
![android-4](../img/pairing_desktop_04.png)
![android-5](../img/pairing_desktop_05.png)


