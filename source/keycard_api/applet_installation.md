---
id: applet_installation
title: Getting Started
---

# Preparing the card

If you got a Keycard and you are integrating it in your project, you will most likely want to reset the applet status completely for testing purposes. This is done by reinstalling the applet, which can be accomplished using the [Keycard CLI](https://github.com/status-im/keycard-cli). To use  the Keycard CLI, a USB reader is needed to be able to communicate with the card.

## Card requirements

The Keycard applet can be installed not only on our cards, but on any card which meets the following requirements:

* JavaCard 3.0.4 or later.
* Cipher.ALG_AES_BLOCK_128_CBC_NOPAD
* Cipher.ALG_AES_CBC_ISO9797_M2
* KeyAgreement.ALG_EC_SVDP_DH_PLAIN
* KeyAgreement.ALG_EC_SVDP_DH_PLAIN_XY (defined in JavaCard 3.0.5 but available on some 3.0.4 cards nonetheless)
* KeyPair.ALG_EC_FP (generation of 256-bit keys)
* MessageDigest.ALG_SHA_256
* MessageDigest.ALG_SHA_512
* RandomData.ALG_SECURE_RANDOM
* Signature.ALG_AES_MAC_128_NOPAD
* Signature.ALG_ECDSA_SHA_256

Best performance is achieved if the card supports:

* Signature.ALG_HMAC_SHA_512

Keycard requires about 10kb of NVM. All allocations, instantiations and checks are performed at installation time, so if installation succeeds, the applet will work fine.

