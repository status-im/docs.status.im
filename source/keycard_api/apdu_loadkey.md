---
id: apdu_loadkey
title: Protocol
---

# LOAD KEY

* CLA = 0x80
* INS = 0xD0
* P1 = key type
* P2 = 0x00
* Data = the key data
* Response SW = 0x9000 on success, 0x6A80 if the format is invalid, 0x6A86 if P1 is invalid
* Response Data = the key UID, defined as the SHA-256 of the public key
* Preconditions: Secure Channel must be opened, user PIN must be verified
* Capability: Key management

P1:
* 0x01 = ECC SECP256k1 keypair
* 0x02 = ECC SECP256k1 extended keypair
* 0x03 = Binary seed as defined in [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

Data:

If P1 is 0x01 or 0x02
- Tag 0xA1 = keypair template
  - Tag 0x80 = ECC public key component (can be omitted)
  - Tag 0x81 = ECC private key component
  - Tag 0x82 = chain code (if P1=0x02)
  
If P1 is 0x03 a 64 byte sequence generated according to the BIP39 specifications is expected. The master key will be generated according to the [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) specifications. This is only supported if the hardware supports public key derivation.

This command is used to load or replace the keypair used for signing on the card. This command always aborts open signing sessions, if any. Unless a DERIVE KEY is sent, a subsequent SIGN command will use this keypair for signature.
