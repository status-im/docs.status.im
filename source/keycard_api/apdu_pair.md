---
id: apdu_pair
title: Protocol
---

# PAIR

* CLA = 0x80
* INS = 0x12
* P1 = pairing phase
* P2 = 0x00
* Data = see below
* Response Data = see below
* Response SW = 0x9000 on success, 0x6A80 if the data is in the wrong format, 0x6982 if client cryptogram verification fails, 0x6A84 if all available pairing slot are taken, 0x6A86 if P1 is invalid or is 0x01 but the first phase was not completed, 0x6985 if a secure channel is open
* Capability: Secure Channel

P1:
* 0x00: First step
* 0x01: Final step

Data:
* On first step: a 256-bit random client challenge
* On second step: the client cryptogram as SHA-256(shared secret, card challenge)

Response Data:
* On first step: the card cryptogram as SHA-256(shared secret, client challenge) followed by a 256-bit card challenge
* On second step: the pairing index followed by a 256-bit salt

This APDU is sent to pair a client. Pairing is performed with two commands which must be sent immediately one after the other. 

In the first phase the client sends a random challenge to the card. The card replies with the SHA-256 hash of the challenge and the shared secret followed by its random challenge. The client is thus able to authenticate the card by verifying the card cryptogram (since the client can generate the same and verify that it matches).

In the second phase the client sends the client cryptogram which is the SHA-256 hash of the shared secret and the card challenge. The card verifies the cryptogram and thus authenticates the client. On success the card generates a random 256-bit salt which is appended to the shared secret. The SHA-256 hash of the concatenated value is stored in the first available pairing slot and will be further used to derive session keys. The card responds with the pairing index (which the client must send in all OPEN SECURE CHANNEL commands) and the salt used to generate the key, so that the client can generate and store the same key.

The shared secret is a 256-bit value which must be be known to both parts being paired.