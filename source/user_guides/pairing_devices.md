---
id: pairing
title: Pairing devices
layout: tutorials
---

This tutorial will explain how to correctly pair your devices, allowing your status client to sync contacts, public chats & messages.

# What is synced

Currently we sync:

- your current ENS name
- your open public chats
- the messages you send in chats
- your contacts

Some things we do not sync:

- messages you sent before pairing
- if removing a chat on device B, or clearing history, it won't be removed on device A
- push notifications will only be received on one device

# How it works

First you need to *pair* and *enable* your devices (say A & B), this operation is symmetrical and needs to be done on both device.

A maximum of 3 devices can be paired.

## Instructions

Go to Profile->Sync settings->Devices.
You will be asked to set a name for your device.
Once you set a name, click on `Advertise device` on both devices.
You should see now the two devices in the device lists.
Enable the devices on both.

### Syncing old data

Once you have enabled the device, new information will be kept in sync.
To sync old data (contacts and open public chats, account profile), click on `Sync all devices` on the device where you have the data, and it should then appear on the other device if synced correcly.

# Troubleshooting

## Data is not synced

Make sure devices are paired correctly and enabled. If the problem still persist you can try clicking on `Advertise device` again on both devices and `disable` and `enable` them again. In any case please open an issue at https://github.com/status-im/status-react and upload your `geth.log` from both devices (after sending a message from both device A & B)

## I see "No info" on one device

Click on `Advertise device` on the other device, and `No info` should be replaced with the actual device name

# Examples

![android-1](/user_guides/img/pairing_set_name.png)
![android-2](/user_guides/img/pairing_sync.png)
