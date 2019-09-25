---
id: apdu_generatemnemonic
title: Protocol
---

# GENERATE MNEMONIC

* CLA = 0x80
* INS = 0xD2
* P1 = checksum size (between 4 and 8)
* P2 = 0x00
* Response SW = 0x9000 on success. 0x6A86 if P1 is invalid.
* Response Data = a sequence of 16-bit integers (most significant byte first).
* Preconditions: Secure Channel must be opened
* Capability: Key management

Used to generate a mnemonic according to the algorithm specified in [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki). The returned data is a list of 16-byte integers which should be used as indexes in a wordlist to generate the human-readable mnemonic. Each integer can have a value from 0 to 2047.
