---
id: apdu_removekey
title: Protocol
---

# REMOVE KEY

* CLA = 0x80
* INS = 0xD3
* P1 = 0x00
* P2 = 0x00
* Response SW = 0x9000 on success.
* Preconditions: Secure Channel must be opened, user PIN must be verified
* Capability: Key management

Removes the key from the card, bringing it back to an uninitialized state. No signing operation is possible after this command until a new LOAD KEY command is performed.
