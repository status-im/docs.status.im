---
id: apdu_setpinlesspath
title: Protocol
---

# SET PINLESS PATH

* CLA = 0x80
* INS = 0xC1
* P1 = 0x00
* P2 = 0x00
* Data = a sequence of 32-bit integers
* Response SW = 0x9000 on success, 0x6A80 if data is invalid
* Preconditions: Secure Channel must be opened, user PIN must be verified

Sets the given sequence of 32-bit integers as a PIN-less path. When the current derived key matches this path, SIGN will work even if no PIN authentication has been performed. An empty sequence means that no PIN-less path is defined.
