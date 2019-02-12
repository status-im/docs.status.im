---
id: sdk_create_wallet
title: Java SDK
---

# Wallet creation

To actually use the Keycard, it needs to have a wallet. This can be achieved in several different ways, which one you choose depends on your usage scenario. Creating a wallet requires user authentication and is possible even if a wallet already exists on the card (the new wallet replaces the old one). Use the `ApplicationInfo.hasMasterKey()` method to determine if the card already has a wallet or not. Note that the response of the `KeycardCommandSet.loadKey` method contains the key UID of the created wallet. This UID can be stored to keep track of this specific wallet in the client. The UID is tied to the key itself (is derived from the public key) so it will change if the wallet on card is replaced. The key UID is also part of the response of the applet selection command, so the wallet can be identified immediately upon selection.

## Creating a BIP39 mnemonic phrase

This method is great for interoperability with other wallets. The card can assist in creating the mnemonic phrase, since it features a TRNG. Generating the mnemonic itself does not require user authentication (since it does not modify the card state), but loading the key derived from it does. Example of the entire procedure is below

```java
// Generates a Mnemonic object from the card. You can choose between generating 12, 15, 18, 21 or 24 words
Mnemonic mnemonic = new Mnemonic(cmdSet.generateMnemonic(KeycardCommandSet.GENERATE_MNEMONIC_12_WORDS).checkOK().getData());

// We need to set a wordlist if we plan using this object to derive the binary seed. We can set our own list or we can
// fatch the official BIP39 english word list as shown below.
mnemonic.fetchBIP39EnglishWordlist();

// If we did not verify the PIN before, we can do it now
cmdSet.verifyPIN(pin).checkOK();

// Loads the key generated from the mnemonic phrase.
cmdSet.loadKey(mnemonic.toBIP32KeyPair()).checkOK();
```

## Importing a wallet from BIP39 mnemonic phrase

Importing an existing passphrase requires only the loading step.

```java
// The passphrase is a string with space separated words. The password can be any non-null string, usually is empty.
cmdSet.loadKey(Mnemonic.toBinarySeed(passphrase, password)).checkOK();
```

## Generating keys on-card

This is the simplest and safest method, because the generated wallet never leaves the card and there is no "paper backup" to keep secure. It is possible to create secure duplicates of the wallet on other Keycards, with a mechanism described in later chapters. Using the SDK, you simply do

```java
cmdSet.generateKey().checkOK();
```

## Importing an EC keypair

You can import on the keycard any EC keypair on the SECP256k1 curve, with or without the BIP32 extension. If your import a key without the BIP32 extension, then key derivation will not work, but you will still be able to use the Keycard for signing transactions using the imported key. This scenario can be useful if you are migrating from a wallet not using BIP39 passphrases or for wallets following some custom generation rules. It is however generally preferable to use one of the methods presented above.

An example of key import is

```java
// privKey is the S component of the key, as a 32-byte long byte array
// chainCode is the extension to the keypair defined by BIP32, this is another 32-byte long byte array. Can be null, in
// which case the created wallet won't be BIP32 compatible.
// pubKey is the DER encoded, uncompressed public key. Can be null, in which case it is automatically calculated from
// the private key.
BIP32KeyPair keypair = new BIP32KeyPair(privKey, chainCode, pubKey);

// Loads the keypair
cmdSet.loadKey(keypair).checkOK();
```
