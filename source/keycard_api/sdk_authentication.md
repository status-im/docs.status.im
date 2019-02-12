---
id: sdk_authentication
title: Java SDK
---

# User authentication

Most operations with the card (all involving operations with the wallet or credentials) require authenticating the user. After authentication, the user remains authenticated until the card is powered off or the application is re-selected.

Authentication is performed by verifying the user PIN. Note that this piece of information is sensitive and must be handled accordingly in the application. PIN verification is done with a single step

```java
// pin is the user PIN as a string of 6 digits
try {
  cmdSet.verifyPIN(pin).checkAuthOK();
} catch(WrongPINException e) {
  System.out.println("Number of remaining attempts: " + e.getRetryAttempts());
}
```

if the PIN is wrong, you will receive an error SW in the format 0x63CX where X is the number of attempts remaining. When the number of remaining attempts is 0, the card is blocked. The user must then enter the PUK and a new PIN to restore access to the card. The maximum number of retries for the PUK is 5. To simplify things, the `APDUResponse.checkAuthOK()` method can be used to verify if the authentication was correct, and if not throw a `WrongPINException` which contains the number of remaining attempts.

```java
cmdSet.unblockPIN(puk, newPIN).checkAuthOK();
```

## Changing credentials

All credentials of the Keycard can be changed (PIN, PUK, pairing password). Changing the pairing password does not invalidate existing pairings, but applies to the ones which can be created in the future. Changing credentials, requires user authentication.

```java
// Changes the user PIN
cmdSet.changePIN("123456").checkOK();

// Changes the PUK
cmdSet.changePUK("123456123456").checkOK();

// Changes the pairing password
cmdSet.changePairingPassword("my pairing password").checkOK();
```