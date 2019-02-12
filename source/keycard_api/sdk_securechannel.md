---
id: sdk_securechannel
title: Java SDK
---

# Secure Channel

Communication with the card happens over a Secure Channel to protect sensitive information being transmitted. The Secure Channel relies on a pairing mechanism for mutual authentication.

## Pairing

Clients wishing to communicate with the card, need to pair with it first. This allows creating secure channels resistant not only to passive but also to active MITM attacks. Although pairing allows the card and the client to authenticate each other, the card does not grant access to any operation with the wallet until the user is authenticated (by verifying its PIN). To establish the pairing, the client needs to know the pairing password. After it is established, the pairing info (not the password) must be stored as securely as possible on the client for subsequent sessions. You should store the pairing information together with the instance UID to simplify handling of multiple cards.

Only 5 clients can be paired at once, but it is possible to unpair previously paired clients.

Using the SDK, pairing is a simple operation

```java
// pairingPassword is usually provided by the user. This method throws an exception if pairing fails.
cmdSet.autoPair(pairingPassword);
// Retrieves the pairing object from the command set. This is what must be persisted (together with the instance UID)
Pairing pairing = cmdSet.getPairing();
// The pairing object can be serialized by calling
pairing.toByteArray();
// or the convenience method
pairing.toBase64();
```

If you have already paired, you should instead load the persisted pairing information in the command set

```java
// serializedPairing can be either the byte array or base64 string representation
Pairing pairing = new Pairing(serializedPairing);
// Sets the pairing info in the command set. This must be done before further operation is possible
cmdSet.setPairing(pairing);
```

## Opening the Secure Channel

After a pairing has been established, a secure channel can be opened. Before opening a secure channel, the card won't allow sending any command. This guarantees secrecy, integrity and authenticity of the commands. Opening a secure channel must be performed every time the applet is selected (this means also after a power loss). After opening it, the SDK handles the secure channel transparently, encrypting and signing all command APDUs and decrypting and verifying the signature of all responses. To open a secure channel all you need to do is

```java
cmdSet.autoOpenSecureChannel();
```


