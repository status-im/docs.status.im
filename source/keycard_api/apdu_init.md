---
id: apdu_init
title: Protocol
---

# INIT

* CLA = 0x80
* INS = 0xFE
* P1 = 0x00
* P2 = 0x00
* Data = EC public key (LV encoded) | IV | encrypted payload
* Response SW = 0x9000 on success, 0x6D00 if the applet is already initialized, 0x6A80 if the data is invalid
* Capability: Credentials management

This command is only available when the applet is in pre-initialized state and successful execution brings the applet in the initialized state. This command is needed to allow securely storing secrets on the applet at a different moment and place than installation is taking place. Currently these are the PIN, PUK and pairing password.

The client must take the public key received after the SELECT command, generate a random keypair and perform EC-DH to generate an AES key. It must then generate a random IV and encrypt the payload using AES-CBC with ISO/IEC 9797-1 Method 2 padding.

They payload is the concatenation of the PIN (6 digits/bytes), PUK (12 digits/bytes) and, if the Secure Channel capability is implemented, pairing secret (32 bytes).

This scheme guarantees protection against passive MITM attacks. Since the applet has no "owner" before the execution of this command, protection against active MITM cannot be provided at this stage. However since the communication happens locally (either through NFC or contacted interface) the realization of such an attack at this point is unrealistic.

After successful execution, this command cannot be executed anymore. The regular SecureChannel (with pairing) is active and PIN and PUK are initialized.