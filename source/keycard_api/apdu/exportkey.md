---
id: apdu_exportkey
title: Protocol
---

# EXPORT KEY

* CLA = 0x80
* INS = 0xC2
* P1 = derivation options
* P2 = export options
* Response SW = 0x9000 on success, 0x6A86 if P1 or P2 are wrong
* Data = a sequence of 32-bit integers (empty if P1=0x00)
* Response Data = key pair template
* Response SW = 0x9000 on success, 0x6985 if the private key cannot be exported, 0x6A80 if the path is malformed
* Preconditions: Secure Channel must be opened, user PIN must be verified
  
P1:
0x00 = Current key
0x01 = Derive
0x02 = Derive and make current

P2:
0x00 = private and public key
0x01 = public key only
  
Response Data format:
- Tag 0xA1 = keypair template
  - Tag 0x80 = ECC public key component (could be omitted)
  - Tag 0x81 = ECC private key component (if P2=0x00)
  
This command exports the requested public and private key. The public key can be always exported (P2=0x01), but the private key (P2=0x00) can be exported if and only if the requested key path is in the [EIP-1581](https://eips.ethereum.org/EIPS/eip-1581) subtree. 

The P1 parameter indicates how to the derive the desired key. P1 = 0x00 indicates that the current key must be exported, and no derivation will be performed. P1 = 0x01 derives the path given in the data field without changing the current path of the card. P1 = 0x02 derives the path but also changes the current path of the card. The source for derivation can be set by OR'ing P1 with the constants defined in the DERIVE KEY command. This allows deriving from master, parent or current.

If the private key is being exported, the card could omit exporting the public key for performance reason. The public key can then be calculate off-card if needed.