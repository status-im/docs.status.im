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

## Encrypted APDUs

After a successful OPEN SECURE CHANNEL command all communication between card and client is encrypted. Note that only the data fields of C-APDU are encrypted, which means that CLA, INS, P1, P2 for C-APDU are plaintext. This means no sensitive data should be sent in these parameters. Additionally a MAC is calculated for the entire APDU, including the unencrypted fields.

Because R-APDU can only contain data if their SW is a success or warning status word (0x9000, 0x62XX, 0x63XX), when the secure channel is open all responses will have SW 0x9000. The actual SW is always appended at the end of the response data before encryption, which means the client must interpret the last two bytes of the plaintext response as the SW. An exception to this is SW 0x6982, which indicates that the SecureChannel has been aborted and as such is returned without any MAC.

To encrypt the data both the card and the client do the following:

1. The data is padded using the ISO/IEC 9797-1 Method 2 algorithm.
2. The data is encrypted using AES in CBC mode using the session key.
3. An AES CBC-MAC is calculated over the entire APDU data
4. The data field of the APDU is set to the MAC followed by the encrypted data.

To decrypt the data both the card and the client do the following:

1. The first 16 bytes of the APDU data are the MAC to be verified
2. The remaining data is decrypted using AES in CBC mode using the session key.
3. The padding is removed.

The IV used for the encryption is the last seen MAC from the counterpart. This optimizes the number of transmitted bytes and guarantees protection from replay attacks. For the MAC generation, a zero IV is always used.

MAC generation for C-APDUs is calculated on the concatenation of CLA INS P1 P2 LC 00 00 00 00 00 00 00 00 00 00 00 and the encrypted data field. The 11-byte long padding does not become part of the data field and does not affect LC

MAC generation fo R-APDUs is calculated on the concatenation of Lr 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 and the encrypted data field. The 15-byte long padding does not become part of the response field. Lr is the length of the encrypted response data field and is not transmitted.

Because AES in CBC mode requires the data field length in bytes to be a multiple of 16, the maximum effective APDU size becomes 240 bytes. Of these 16 bytes are used for the MAC and minimum of 1 byte for padding, making the maximum payload size in a single APDU 223 bytes, meaning about a 13,5% overhead.

## Error conditions

1. If a sensitive command is received without an active Secure Channel, the card shall respond with SW 0x6985 (SW_CONDITIONS_NOT_SATISFIED)
2. If a MAC cannot be verified the card shall respond 0x6982 and the Secure Channel must be closed