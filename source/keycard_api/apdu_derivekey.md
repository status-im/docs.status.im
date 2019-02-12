---
id: apdu_derivekey
title: Protocol
---

# DERIVE KEY

* CLA = 0x80
* INS = 0xD1
* P1 = derivation options
* P2 = 0x00
* Data = a sequence of 32-bit integers (most significant byte first). Empty if the master key must be used.
* Response SW = 0x9000 on success, 0x6A80 if the format is invalid, 0x6984 if one of the components in the path generates an invalid key, 0x6B00 if derivation from parent keys is selected but no valid parent key is cached.
* Preconditions: Secure Channel must be opened, user PIN must be verified (if no PIN-less key is defined), an extended keyset must be loaded

This command is used before a signing session to generate a private key according to the [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) specifications. This command always aborts open signing sessions, if any. The generated key is used for all subsequent SIGN sessions. The maximum depth of derivation from the master key is 10. Any attempt to get deeper results in 0x6A80 being returned. The BIP32 specifications define a few checks which must be performed on the derived keys. If these fail, the 0x6984 is returned and the invalid key is discarded. A client should perform a GET STATUS command to get the actual current key path and resume derivation using a different path.

The ability to start derivation from the parent keys allows to more efficiently switch between children of the same key. Note however that only the immediate parent of the current key is cached so you cannot use this to go back in the hierarchy. If no valid parent key is available the status code 0x6B00 will be returned.

P1:
* bit 0-5 = reserved
* bit 7-6:
  - 00 derive from master keys
  - 01 derive from parent keys
  - 10 derive from current keys
  - 11 reserved
