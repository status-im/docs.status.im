---
id: apdu_getdata
title: Protocol
---

# GET DATA

* CLA = 0x80
* INS = 0xCA
* P1 = 0x00 for public data, 0x01 for NDEF data, 0x02 for Cash data
* P2 = 0x00
* Response SW = 0x9000 on success, 0x6A86 on undefined P1
* Response Data = the data as previously stored by STORE DATA command
* Capabilities: NDEF for P1 = 0x01

Notably, this command does not require an open secure channel