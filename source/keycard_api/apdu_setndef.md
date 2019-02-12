---
id: apdu_setndef
title: Protocol
---

# SET NDEF

* CLA = 0x80
* INS = 0xF3
* P1 = 0x00
* P2 = 0x00
* Data = the data to store
* Response SW = 0x9000 on success, 0x6A80 on invalid data
* Preconditions: Secure Channel must be opened, PIN must be verified
* Capability: NDEF

Used to set the content of the data file owned by the NDEF applet. This allows changing the behavior of Android and other clients when tapping the card with no open client. As an example, it could be used to launch a specific wallet software.

The data is stored as is. A check is made that the first 2 bytes, read as a MSB first short, are equal to the Lc field minus 2 (the length of the field itself). This does not ensure that the NDEF record is valid, but ensures that no out of bound access happens.
