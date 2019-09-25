---
id: apdu_unpair
title: Protocol
---

# UNPAIR

* CLA = 0x80
* INS = 0x13
* P1 = the index to unpair
* P2 = 0x00
* Response SW = 0x9000 on success, 0x6985 if security conditions are not met, 0x6A86 if the index is higher than the
  highest possible pairing index.
* Preconditions: Secure Channel must be opened, user PIN must be verified
* Capability: Secure Channel

This APDU is sent to unpair a client. An existing secure channel session must be open. The application implementing this protocol may apply additional restrictions, such as the verification of a user PIN. On success the pairing slot at the  given index will be freed and will be made available to pair other clients. If the index is already free nothing will happen.
