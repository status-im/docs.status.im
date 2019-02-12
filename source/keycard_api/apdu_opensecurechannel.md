---
id: apdu_opensecurechannel
title: Protocol
---

# OPEN SECURE CHANNEL

* CLA = 0x80
* INS = 0x10
* P1 = the pairing index
* P2 = 0x00
* Data = An EC-256 public key on the SECP256k1 curve encoded as an uncompressed point.
* Response Data = A 256-bit salt and a 128-bit seed IV
* Response SW = 0x9000 on success, 0x6A86 if P1 is invalid, 0x6A80 if the data is not a public key
* Capability: Secure Channel

This APDU is the first step to establish a Secure Channel session. A session is aborted when the application is deselected, either directly or because of a card reset/tear.

The card generates a random 256-bit salt which is sent to the client. Both the client and the card do the following for key derivation

1. Use their private key and the counterpart public key to generate a secret using the EC-DH algorithm.
2. The generated secret, the pairing key and the salt are concatenated and the SHA-512 of the concatenated value is calculated.
3. The output of the SHA-512 algorithm is split in two parts of 256-bit. The first part is used as the encryption key and the second part is used as the MAC key for further communication.

The seed IV is used by the client as the IV for the next encrypted APDU.