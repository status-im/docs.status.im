---
id: apdu_changelog
title: Protocol
---

# Changelog

## Version 2.1
* Added concept of capabilities, making some APDU conditional and extending the SELECT response.

## Version 2.0
* **BREAKING** Changed application AID
* **BREAKING** Completely redefined the EXPORT KEY command
* **BREAKING** Removed assisted key derivation
* **BREAKING** Removed plain data signing, now only 32-byte long hashes can be signed
* Added internal key generation (GENERATE KEY)
* Added the ability to customize the NDEF response (SET NDEF)
* Added DUPLICATE KEY command