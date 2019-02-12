---
id: sdk_preparation
title: Java SDK
---

# Working with the applet

Regardless whether you are on Android or desktop, you should at this point have an implementation of the CardChannel interface (be it NFCCardChannel or PCSCCardChannel). You can now start working with the card. The first thing to do is creating a `KeycardCommandSet` instance. This class gives access to all of the applet functionality, wrapping the low-level APDUs in easy to use methods. All other classes in the SDK are helper to format parameters and parse responses from the card. To create a command set, just do

```java
// cardChannel is our CardChannel instance
KeycardCommandSet cmdSet = new KeycardCommandSet(cardChannel);
```

## Applet selection

Modern SmartCards can have several applications installed, so after connection with the card you need to select the Keycard applet. This is easily done with

```java
// The checkOK method can be called on any APDUResponse object to confirm that the
cmdSet.select().checkOK();
```

While this correctly selects the applet, it discards the card response, which contains information that can be useful to identify this specific card and its state. For this reason we could rewrite this as

```java
ApplicationInfo info = new ApplicationInfo(cmdSet.select().checkOK().getData());

// This method tells if the card is initialized (has a PIN, PUK and pairing password). If it is not, it must be
// initialized and no other operation is possible. Note that initialization touches only credentials to authenticate
// the user or the client, but does not touch the creation of a wallet on the card
info.isInitializedCard();

// Returns the instance UID of the applet. This can be used to identify this specific applet instance, very
// useful when storing instance-specific data on the client (pairing info, cached data, etc).
info.getInstanceUID();

// Returns the version of the applet.
info.getAppVersion();

// Returns the number of free pairing slots. If you are not yet paired with the card, it helps you know if you can still
// pair or not
info.getFreePairingSlots());

// Tells if the card has a wallet or not. If no wallet is available, you must create once before you can perform most
// operations on the card
info.hasMasterKey();

// Returns the UID of the master key of the wallet. The UID is value generated starting from the public key and is 
// useful to identify if the card has the expected wallet.
info.getKeyUID();
```

After the applet is selected, you can start working with it. Note that the application remains selected until another applet is explicitly selected, or the card is powered off (for example is removed from the field)

## Applet initialization

This step is necessary to bring the initial credentials on the Keycard instance. When the card is not initialized, it cannot perform any operation. Initialization sets the initial PIN, PUK and pairing password and requires no authentication, but still uses a SecureChannel resistant to passive MITM attacks. Once the card is initialized, it cannot be initialized again (but credentials can be different with a different mechanism with previous authentication).

Initialization is done with

```java
// Usually, you want to check if the card is initialized before trying to initialize it, otherwise you will receive an
// error.
if (!info.isInitializedCard()) {
  // The PIN must be 6 digits, the PUK 12 digits and the pairing password can be any password. 
  // All parameters are strings
  cmdSet.init(pin, puk, pairingPassword).checkOK();
}
```
