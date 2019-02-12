---
id: sdk_derivation_signing
title: Java SDK
---

# Derivation & signing

Signing is the main goal of the Keycard and indeed any hardware wallet. The Keycard performs signing with the currently active key. Key derivation is used to select the active key to a specific key BIP32 key path. 

## Key derivation

As mentioned before, the Keycard is a BIP32 compatible wallet. This means that it can perform key derivation as defined by the BIP32 specification in order to create a hierarchical deterministic wallet. When deriving a key, this key becomes active. The active key is persisted across sessions, meaning that a power loss or applet reselection does not reset it.

When creating or importing a wallet to the Keycard, the active key is the master key. Unless you imported a non-BIP32 compatible wallet, you usually want to set the active key to a currency account by following the BIP44 specifications for paths. Note that the maximum depth of the key path is 10, excluding the master key.

Key derivation requires user authentication

Since a line of code is worth a thousand words, below is an example of deriving a standard key path

```java
cmdSet.deriveKey("m/44'/0'/0'/0/0").checkOK();
```

Since deriving a key is an expensive operation, you usually want to know what the current path is before performing derivation. You can do this with

```java
// you can then get is as a string with currentPath.toString()
KeyPath currentPath = new KeyPath(cmdSet.getStatus(KeycardCommandSet.GET_STATUS_P1_KEY_PATH).checkOK().getData());
```

To speed up operations, key derivation can be started not only from the master key, but also from the parent or the current key. The path in this case starts respectively with "../" and "./". You cannot navigate the hierarchy with multiple ".." in the paths, because only the direct parent of the current key is cached. Derivation from parent is especially convenient when switching between accounts of the same type. Example

```java
// Derive the main account
cmdSet.deriveKey("m/44'/0'/0'/0/0").checkOK();

// switch a secondary account, equivalent to "m/44'/0'/0'/0/1" but much faster
cmdSet.deriveKey("../1").checkOK();

// you can switch back and forth between siblings without limitations.
cmdSet.deriveKey("../0").checkOK();
```

## Signing

Your Keycard has been initialized, has a wallet and you have derived the keypath you need. You can now perform transactions by signing them with the card. Since the Keycard has no user input/output capabilities, it would be useless to transfer the entire transaction to the card for signing. You should instead calculate the transaction hash, according to the rules of the cryptocurrency you are handling and send that for signature instead. This also means, that you can handle anything which requires ECDSA signatures over SECP256k1 curve, regardless of the used hashing algorithm (at the condition that it output a 256-bit hash of course). This opens the door to signing transactions for the most common cryptocurrencies, but also makes it usable outside the realm of crypto transactions.

Signing is done as

```java
// hash is the hash to sign, for example the Keccak-256 hash of an Ethereum transaction
// the signature object contains r, s, recId and the public key associated to this signature
RecoverableSignature signature = new RecoverableSignature(hash, cmdSet.sign(hash).checkOK().getData());
```

Signing requires user authentication.
