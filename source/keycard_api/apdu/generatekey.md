---
id: apdu_generatekey
title: Protocol
---

# GENERATE KEY

* CLA = 0x80
* INS = 0xD4
* P1 = 0x00
* P2 = 0x00
* Response SW = 0x9000 on success.
* Response Data = the key UID, defined as the SHA-256 of the public key
* Preconditions: Secure Channel must be opened, user PIN must be verified
* Capability: Key management

Generates and stores keys completely on card. The state of the card after execution is the same as if a LOAD KEY command had been performed.
