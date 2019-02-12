---
id: apdu_select
title: Protocol
---

# SELECT

* CLA = 0x00
* INS = 0xA4
* P1 = 0x04
* P2 = 0x00
* Data = the instance AID
* Response = Application Info Template or ECC public key.

Response Data format:
- Tag 0xA4 = Application Info Template
 - Tag 0x8F = Instance UID (16 bytes)
 - Tag 0x80 = ECC public Key (0 or 65 bytes)
 - Tag 0x02 = Application Version (2 bytes)
 - Tag 0x02 = Number of remaining pairing slots (1 byte)
 - Tag 0x8E = Key UID (0 or 32 bytes)
 - Tag 0x8D = Capabilities (1 byte)

The SELECT command is documented in the ISO 7816-4 specifications and is used to select the application on the card, making it the active one. The data field is the AID of the application. 

The response is the Application Info template which contains:
 
* the instance UID, which can be used by the client to keep track of multiple cards. 
* an ECC public key for the Secure Channel. If the device does not implement the Secure Channel capability then this field has 0 length.
* the application version number, formatted on two bytes. The first byte is the major version and the second is the minor version (e.g: version 2.1 is formatted as 0x0201). This number must match the version of the protocol implemented.
* the number of remaining pairing slots for the Secure Channel. If the device does not implement the Secure Channel capability then this field has a fixed value of 0xff.
* the Key UID, which can be either empty (when no key is loaded on card) or the SHA-256 hash of the master public key. Allows identifying the master key being used without revealing it.
* the capabilities descriptor. Its value is the bitwise OR of all capabilities supported by the device. The capabilities are defined as:
    * Secure Channel: 0x01
    * Key management: 0x02
    * Credentials management: 0x04
    * NDEF: 0x08

When the applet is in pre-initializated state (which implies support of Credentials management capability), it only returns the ECC public key, BER-TLV encoded with tag 0x80 (with length 0 if Secure Channel is not implemented).