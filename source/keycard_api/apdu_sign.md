---
id: apdu_sign
title: Protocol
---

# SIGN

* CLA = 0x80
* INS = 0xC0
* P1 = 0x00
* P2 = 0x00
* Data = the hash to sign
* Response = public key and the signature
* Response SW = 0x9000 on success, 0x6A80 if the data is not 32-byte long
* Preconditions: Secure Channel must be opened, user PIN must be verified (or a PIN-less key must be active), a valid keypair must be loaded

Response Data format:
- Tag 0xA0 = signature template
  - Tag 0x80 = ECC public key component
  - Tag 0x30 = ECDSA Signature
    - Tag 0x02 = R value
    - Tag 0x02 = S value

Returns the ECDSA signature of the hash. The hash can be calculated using any algorithm, but must be 32-bytes long. The signature is returned in a signature template, containing the public key associated to the signature and the signature itself. For usage on the blockchain, you will need to calculate the recovery ID in addition to extracting R and S. To calculate the recovery ID you need to apply the same algorithm used for public key recovery from a transaction starting with a recovery ID of 0. If the public key matches the one returned in the template, then you have found the recovery ID, otherwise you try again by incrementing the recovery ID.
