---
id: apdu_storedata
title: Protocol
---

# STORE DATA

* CLA = 0x80
* INS = 0xE2
* P1 = 0x00 for public data, 0x01 for NDEF data, 0x02 for Cash data
* P2 = 0x00
* Data = the data to store. Implementations should accept at least 127 bytes of data.
* Response SW = 0x9000 on success, 0x6A86 on undefined P1, 0x6A80 if the data is too long
* Preconditions: Secure Channel must be opened, user PIN must be verified
* Capabilities: NDEF for P1 = 0x01
