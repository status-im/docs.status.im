---
id: apdu_overview
title: Protocol
---

# Overview

This document describes all APDUs part of the Keycard APDU protocol. Any implementation must fully implement this specification except for items explicitly marked as optional or conditional. The Keycard applet is a full implementation of this specification. The Java SDK provides both low-level methods to send each of the APDUs described here as well as convenience methods and classes to simplify integration.

## Version

This documentation is at version 2.1.
 
## Conventions

* When a command has a precondition clause and these are not met the Status Word 0x6985 is returned. 
* When a command is unsupported the Status Word 0x6A81 is returned.
* All tagged data structures are encoded in the [BER-TLV format](http://www.cardwerk.com/smartcards/smartcard_standard_ISO7816-4_annex-d.aspx).
* When parsing the card's response, the client should ignore unrecognized fields at the end of the response. This allows extending responses in future minor revisions without breaking compatibility with older clients.

## Capabilities

The Keycard protocol can be implemented by different devices which might have very different capabilities, different user interaction and connection types. For this reason some features not strictly related to signing transactions are optional. Each device reports its capabilities as response to the SELECT command. The optional capabilities are described below

### Secure Channel

The Secure Channel protocol defined in this document provides both passive and active MITM protection and PFS. Some devices however might have inherently secure connections to the client (for example Bluetooth based devices can use pairing and encrypted communication). To avoid overhead, devices using inherently secure connections can avoid implementing the secure channel defined here.

Devices not implementing the Secure Channel capability do not implement the **PAIR**, **UNPAIR**, **OPEN SECURE CHANNEL** and **MUTUALLY AUTHENTICATE** commands. The **CHANGE PIN** and **INIT** commands do not allow setting the pairing password.

### Key management

Key management is the ability to generate, remove, backup and restore keys. Some devices might have internal key management and not allow the client to take part in this process.

Devices not implementing the Key management capability do not implement the **LOAD KEY**, **GENERATE KEY**, **GENERATE MNEMONIC**, **REMOVE KEY** and **DUPLICATE KEY** commands.

### Credentials management

Credentials management is the ability to authenticate the user and manipulate PIN, PUK and pairing password. Some devices, especially those with screen and buttons, might want to handle this completely internally without client intervention.

Devices not implementing the Credentials management capability do not implement the **INIT**, **VERIFY PIN**, **UNBLOCK PIN** and **CHANGE PIN** commands.

### NDEF

The NDEF capability is the ability to set a custom NDEF record on the NFC interface. The NDEF record is used, for example, by mobile phones to decide the action to perform when a card is tapped to the device and no application using NFC is open. Customizing the NDEF record allow setting a default client or link to launch. Obviously, not all devices have a NFC interface and even those who do might not provide a way to customize the NDEF response.

Devices not implementing the NDEF capability do not implement the **SET NDEF** command.
