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
* Response SW = 0x9000 on success
* Preconditions: Secure Channel must be opened, PIN must be verified
* Capability: NDEF

Used to set the content of the data file owned by the NDEF applet. This allows changing the behavior of Android and other clients when tapping the card with no open client. As an example, it could be used to launch a specific wallet software.

If the first 2 bytes, read as a MSB first short, are equal to the Lc field minus 2 (the length of the field itself) then the data is stored as is. Otherwise Lc is extended to a 16-bit value and appended to the stored data.
