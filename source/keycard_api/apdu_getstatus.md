---
id: apdu_getstatus
title: Protocol
---

# GET STATUS

* CLA = 0x80
* INS = 0xF2
* P1 = 0x00 for application status, 0x01 for key path status
* P2 = 0x00
* Response SW = 0x9000 on success, 0x6A86 on undefined P1
* Response Data = Application Status Template or Key Path
* Preconditions: Secure Channel must be opened

Response Data format:
if P1 = 0x00:
- Tag 0xA3 = Application Status Template
  - Tag 0x02 = PIN retry count (1 byte)
  - Tag 0x02 = PUK retry count (1 byte)
  - Tag 0x01 = 0xff if key is initialized, 0 otherwise
  
This must be implemented even if Credential and/or Key management is not implemented. If the PIN/PUK retry count is not available or is not applicable, its value should be set to 0xff.

if P1 = 0x01:
- a sequence of 32-bit numbers indicating the current key path. Empty if master key is selected.