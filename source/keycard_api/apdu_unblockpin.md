---
id: apdu_unblockpin
title: Protocol
---

# UNBLOCK PIN

* CLA = 0x80
* INS = 0x22
* P1 = 0x00
* P2 = 0x00
* Data = the PUK followed by the new PIN
* Response SW = 0x9000 on success, 0x6A80 if the format is invalid
* Preconditions: Secure Channel must be opened, user PIN must be blocked
* Capability: Credentials management

Used to unblock the user PIN. The data field must contain exactly 18 numeric digits, otherwise SW 0x6A80 is returned. The first 12 digits are the PUK and the last 6 are the new PIN. If the PUK is correct the PIN is changed to the supplied one, it is unblocked and authenticated for the rest of the session. The status code 0x9000 is returned. When the PUK is wrong, the number of remaining retries is decreased and the SW 0x63CX, where X is the number of available retries is returned. When the number of remaining retries reaches 0 the PUK is blocked. When the PUK is blocked this command always returns 0x63C0, even if the PUK is inserted correctly. In this case the wallet is effectively lost.
