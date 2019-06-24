---
id: apdu_sign
title: Protocol
---

# SIGN

* CLA = 0x80
* INS = 0xC0
* P1 = derivation options
* P2 = 0x00
* Data = the hash to sign (32 bytes) | sequence of 32-bit integers (if P1=01 or P1=02)
* Response = public key and the signature
* Response SW = 0x9000 on success, 0x6A80 if the data is less than 32-byte long (36 bytes if P1=01 or P1=02), 0x6A88 if P1=0x03 but no PIN-less path is defined
* Preconditions: Secure Channel must be opened, user PIN must be verified (or a PIN-less key must be active), a valid keypair must be loaded

P1:
0x00 = Current key
0x01 = Derive
0x02 = Derive and make current
0x03 = PIN-less path

Response Data format:
- Tag 0xA0 = signature template
  - Tag 0x80 = ECC public key component
  - Tag 0x30 = ECDSA Signature
    - Tag 0x02 = R value
    - Tag 0x02 = S value

Returns the ECDSA signature of the hash. The hash can be calculated using any algorithm, but must be 32-bytes long. The signature is returned in a signature template, containing the public key associated to the signature and the signature itself. For usage on the blockchain, you will need to calculate the recovery ID in addition to extracting R and S. To calculate the recovery ID you need to apply the same algorithm used for public key recovery from a transaction starting with a recovery ID of 0. If the public key matches the one returned in the template, then you have found the recovery ID, otherwise you try again by incrementing the recovery ID.
P1 = 0x01 derives the path given in the data field without changing the current path of the card. P1 = 0x02 derives the path but also changes the current path of the card. The source for derivation can be set by OR'ing P1 with the constants defined in the DERIVE KEY command. This allows deriving from master, parent or current.
P1 = 0x03 is specifically thought for POS transactions. It can be executed without Secure Channel (since no sensitive info is transmitted) and does not require PIN authentication. The current derivation path on the card remains unchanged, but the signing process is performed using the PIN-less derivation path previously defined using the SET PINLESS PATH command.
