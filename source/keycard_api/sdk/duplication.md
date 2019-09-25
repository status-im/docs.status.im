---
id: sdk_duplication
title: Java SDK
---

# Card duplication

Card duplication is especially relevant when the keys have been generated on-card, without using BIP39 mnemonic (or when this has been destroyed). To make duplication secure the client must not possess the (full) encryption key. For this reason, a scheme where multiple clients are used and none of them has the full key has been devised. From the user point of view, the duplication process goes like this

1. Take the card to be duplicated (source) and one or more cards to duplicate to (target)
2. On one of the user's clients initiate the duplication. This involves entering the PIN of each of the involved cards
3. Tap all cards to one or more additional clients (the amount must be defined before, the order is irrelevant). These clients do not need to be paired or be trusted, so the user can borrow a friend's phone without compromising security. This step does not require entering a PIN
4. On one of the user's clients, usually the same which initiated the duplication (must be paired, trusted) finalize the duplication by first tapping the source card and then all target cards, again inserting the PIN for each.
   
At the end of procedure, each card will have the same master key, but PIN, PUK and pairing key remain unchanged and are independent from each other. A client could propose changing them to be all the same if desired or do this automatically. All cards are fully functional, so at this point there isn't any difference between the source card and the targets.

Since the cards are still protected by the PIN, these can be stored remotely in moderately trusted places to recover from lost or destroyed cards. The duplication has been performed securely since no client ever had the full encryption key and no authentication credentials has been inserted on untrusted clients. For flexibility reason, an arbitrary number of clients can be used. Using a single client could be convenient from an UX point of view, but relies on said client not being compromised. Using 2 or 3 clients greatly increases security. More than 3 clients is probably an overkill.

From an implementation point of view, we have two different roles a client can take

1. The trusted client, starting and performing the duplication
2. The (possibly) untrusted clients, only adding entropy to the encryption key

Both can be implemented by using the `CardDuplicator` class. On each client, the same instance of the `CardDuplicator` class must be used for the entire duplication process, otherwise duplication will fail.

The trusted client must also provide an implementation of `DuplicatorCallback`. This is needed to retrieve the Pairing and PIN for each card. Example below

```java
class MyDuplicatorCB implements DuplicatorCallback {
  Pairing getPairing(ApplicationInfo applicationInfo) {
    // The Instance UID is the one to use when storing/retrieving pairings
    byte[] uid = applicationInfo.getInstanceUID();
    
    // Using the UID try to retrieve the pairing. The method getSavedPairing is an example and is not part of the SDK,
    // you are responsible of how you store and retrieve pairing data in your app
    Pairing pairing = getSavedPairing(uid);
    
    // Optionally, you could prompt the user and make a new pairing if none if given, but this is an UX decision in
    // your application.
    if (pairing == null) {
      pairing = tryToPair();
    }
    
    // possibly null, in this case the operation requiring pairing is aborted
    return pairing;
  }
  
  String getPIN(ApplicationInfo applicationInfo, int remainingAttempts) {
    // Optionally, you might have a cache of PINs for recently used card, but this should be done carefully as the PIN
    // is sensitive data. You might instead want to just prompt the user each time.
    String pin = getCachedPIN(applicationInfo.getInstanceUID());
    
    if (pin == null) {
      // prompt the user to insert the PIN. You can optionally inform them about how many retry attempts are left.
      // For UX reason you could also use the instance UID to show the user an identifiable name, this is again
      // application specific.
      pin = promptUser(remainingAttempts);
    }
    
    // This must not be null. PIN verification will be performed by the CardDuplicator itself, do no not perform it here!
    return pin;
  }
}
```

The next step to do, is instantiating a CardDuplicator.

For the trusted client

```java
// The cmdSet is a KeycardCommandSet instance, duplicatorCallback is an object implementing the DuplicatorCallback
// interface
cardDuplicator = new CardDuplicator(cmdSet, duplicatorCallback);
```

For the untrusted clients

```java
// apduChannel is a CardChannel instance. Alternatively the same constructor as for the trusted client can be used,
// passing null as the second parameter.
cardDuplicator = new CardDuplicator(apduChannel);
```

Once the instance has been created, depending on the role and state the client must perform a specific action every time a new card is presented. The CardDuplicator keeps track of the action performed on any card, so if the user presents the same card twice an `IllegalStateException` exception is thrown.

To start duplication on a card, for example, you might do

```java
// Client count is the amount of devices contributing to forming the entire key. This means 1 + the number of clients
// which will be adding entropy (the untrusted clients)
cardDuplicator.startDuplication(clientCount);
```

On untrusted clients, to add entropy, you do

```java
cardDuplicator.addEntropy();
```

When the full key has been stored on all cards, you then call the following method on the source card on a trusted client

```java
byte[] exportedKey = cardDuplicator.exportKey();
```

whereas, from the same client, you invoke on all target cards the following

```java
// you should then check that the keyUID matches the one of the source card to be sure that the duplication has been
// performed correctly.
byte[] keyUID = cardDuplicator.importKey(exportedKey);
```
