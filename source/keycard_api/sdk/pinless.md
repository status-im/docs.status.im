---
id: sdk_pinless
title: Java SDK
---

# Pinless signing

The card offers the option to define a BIP32 path which can be used to sign transactions (or meta-transactions) without requiring a PIN. The **SIGN** command also has the option to sign with this pinless path (if defined) without having to know its value in advance. Since in such a scenario no sensitive data is being transferred, signing using the pinless path can be done without opening a Secure Channel.

There are several scenarios made possible by this feature. One example, is the ability to use the card for payments at POS terminals. Pairing with every terminal is not practical and inserting the PIN on an untrusted device (the terminal is owned by a 3rd party) is not safe, since it could be logged. Pinless signing with no Secure Channel solves both issues.

Since the wallet assigned to pinless signing is basically unprotected, it must not hold great value. One option is to consider the funds in that account like pocket cash. You put a little of your favourite cryptocurrency and should someone get hold of the card, you lost maybe the equivalent of $5. Another option, valid when using Ethereum, is to not hold any value in that wallet at all. Instead it can be used to sign meta-transactions and actual fund allocation can be handled by a smart contract through a dApp. Of course in this case the POS must be compatible with the specific payment scheme for this to work properly.

## Defining a pinless path

Defining which path is used for pinless signing, of course, requires PIN authentication and thus a Secure Channel. This means that only the owner can define which wallet is allocated for this operation. Then SDK call to set the pinless path is

```java
cmdSet.setPinlessPath("m/44'/0'/0'/0/200").checkOK();
```

## Signing with pinless path

When a pinless path is defined, a wallet (or POS terminal, or whatever) can invoke the `signPinless` method without having to know the path. If no pinless path was defined, the Status Word 0x6A88 will be returned. As mentioned before, opening a Secure Channel and authenticating with PIN before sending this command is allowed but not necessary.

```java
cmdSet.signPinless(hashToSign).checkOK();
```