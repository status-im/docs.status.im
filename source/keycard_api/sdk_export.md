---
id: sdk_export
title: Java SDK

---

# Exporting (public or EIP-1581 compliant) keys

Sorry for the long title, but let's make it immediately clear: the keys used to sign transactions never leave the card and cannot be exported. You can however export any public key as well as the private key of keypaths defined in the [EIP-1581 specifications](https://eips.ethereum.org/EIPS/eip-1581). Those keys, by design, are not to be used for transactions but are instead usable for operations with lower security concerns where caching or storing the key outside the card might be beneficial from an UX point of view. Of course, exporting a key always requires user authentication.

## Exporting the current key

```java
// Exports the current public key. This is allowed for any key path
BIP32KeyPair publicKey = BIP32KeyPair.fromTLV(cmdSet.exportCurrentKey(true).checkOK().getData());

// Exports the entire key pair. This is only allowed for key path following the EIP-1581 definition
BIP32KeyPair keypair = BIP32KeyPair.fromTLV(cmdSet.exportCurrentKey(false).checkOK().getData());
```

## Derive & export

The export command is very powerful, since it allows you to derive & export a key in one step. You have the option to make the derived and exported key active or leave the active key untouched. You can also decide whether to export only the public key or the entire keypair (following the rules defined above).

A very convenient use case is deriving an account key and retrieving the public key in one step. This is faster than doing it with two commands (derive key and export public), because every command processed has some overhead. Example

```java
// The first parameter is the keypath, the second tells whether that you want to make the derived & exported key active
// and the third tells that you only want the public key to be exported.
BIP32KeyPair publicKey = BIP32KeyPair.fromTLV(cmdSet.exportKey("m/44'/0'/0'/0/0", true, true).checkOK().getData());

// The line above is equivalent to
// cmdSet.deriveKey("m/44'/0'/0'/0/0").checkOK();
// BIP32KeyPair publicKey = BIP32KeyPair.fromTLV(cmdSet.exportCurrentKey(true).checkOK().getData());
```

Another use case, is to export keys defined by EIP-1581 without changing the current active key, since you won't be signing with the exported key using the card

```java
// Let's assume the current active path is "m/44'/0'/0'/0/0"

// The first parameter is the key path, the second tells that you do not want to make it current and the third that you
// want the entire keypair, not only the public key
BIP32KeyPair keypair = BIP32KeyPair.fromTLV(cmdSet.exportKey("m/43'/60'/1581'/0'/0", false, false).checkOK().getData());

// At this point, the current active path would still be "m/44'/0'/0'/0/0"
```
