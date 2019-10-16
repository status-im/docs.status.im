---
id: apdu_changelog
title: Protocol
---

# Changelog

## Version 3.0
* **BREAKING** Removed the DUPLICATE KEY command
* **BREAKING** Removed SET NDEF command (replaced by STORE DATA)
* Added Cash applet for payments/burner wallet scenarios
* STORE DATA/GET DATA can now be used also for NDEF and Cash data

## Version 2.2
* Added additional options to the SIGN command to facilitate usage in POS transactions.
* Make SET NDEF more tolerant on the input format by automatically appending missing length.

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