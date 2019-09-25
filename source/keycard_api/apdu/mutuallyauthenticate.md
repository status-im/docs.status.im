---
id: apdu_mutuallyauthenticate
title: Protocol
---

# MUTUALLY AUTHENTICATE

* CLA = 0x80
* INS = 0x11
* P1 = 0x00
* P2 = 0x00
* Data = 256-bit random number
* Response Data = 256-bit random number
* Response SW = 0x9000 on success, 0x6985 if the previous successfully executed APDU was not OPEN SECURE CHANNEL, 0x6982 if authentication failed or the data is not 256-bit long
* Capability: Secure Channel

This APDU allows both parties to verify that the keys generated in the OPEN SECURE CHANNEL step are matching and thus guarantee authentication of the counterpart. The data sent by both parties is a 256-bit random number The APDU data is sent encrypted with the keys generated in the OPEN SECURE CHANNEL step. Each party must verify the MAC of the received APDU. If the MAC can be verified, it means that both parties are using the same keys. Only after this step has been executed the secure channel can be considered to be open and other commands can be sent. If the authentication fails the card must respond with 0x6982. In this case the OPEN SECURE CHANNEL command must be repeated to generate new keys.
