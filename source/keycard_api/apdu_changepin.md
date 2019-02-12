---
id: apdu_changepin
title: Protocol
---

# CHANGE PIN

* CLA = 0x80
* INS = 0x21
* P1 = PIN identifier
* P2 = 0x00
* Data = the new PIN
* Response SW = 0x9000 on success, 0x6A80 if the PIN format is invalid, 0x6A86 if P1 is invalid
* Preconditions: Secure Channel must be opened, user PIN must be verified
* Capability: Credentials management

Used to change a PIN or secret. In case of invalid format, the code 0x6A80 is returned. If the conditions match, the PIN or secret is updated. The no-error SW 0x9000 is returned.

P1:
* 0x00: User PIN. Must be 6-digits. The updated PIN is authenticated for the rest of the session. 
* 0x01: Applet PUK. Must be 12-digits.
* 0x02: Pairing secret. Must be 32-bytes long. Existing pairings are not broken, but new pairings will need to use the new secret. Only implemented if the Secure Channel capability is implemented.
