---
id: apdu_verifypin
title: Protocol
---

# VERIFY PIN

* CLA = 0x80
* INS = 0x20
* P1 = 0x00
* P2 = 0x00
* Data = the PIN to be verified
* Response SW = 0x9000 on success, 0x63CX on failure, where X is the number of attempt remaining
* Preconditions: Secure Channel must be opened
* Capability: Credentials management

Used to verify the user PIN. On correct PIN entry the card returns 0x9000, the retry counter is reset and the PIN is marked as authenticated for the entire session (until the application is deselected or the card reset/teared). On error, the number of remaining retries is decreased and the SW 0x63CX, where X is the number of available retries is returned. When the number of remaining retries reaches 0 the PIN is blocked. When the PIN is blocked this command always returns 0x63C0, even if the PIN is inserted correctly.
