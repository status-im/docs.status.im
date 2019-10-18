---
id: sdk_cash
title: Java SDK
---

# Cash applet

Since version 3.0 the Keycard package also includes a Cash applet. When installed, the applet immediately generates a keypair which cannot be changed, exported or be used for derivation. The applet only responds to the SELECT and SIGN commands and has no concept of PIN or SecureChannel. All in all, it is a very basic version of the main Keycard applet. 

The use cases for this applet are burner wallets, payment cards (including prepaid ones). This applet can be installed alongside the main Keycard applet and does not interfere with it. As the name implies, the applet has roughly the same security level of cash in the pocket and should be used with this in mind. Security cen be enhanced by making the applet a signer to a smartcontract (instead of holding funds directly) and applying anti-fraud policies on the network.

The SDK provides a separate command set to interact with this applet.

## Instatiating the command set

```java
// cardChannel is our CardChannel instance
CashCommandSet cashCmdSet = new CashCommandSet(cardChannel);
```

## Selecting the CashApplet

```java
// note that selecting the cash applet deselects the Keycard applet, so if you use both command sets make sure you invoke select every time you want to switch application
CashApplicationInfo info = new CashApplicationInfo(cashCmdSet.select().checkOK().getData());

// Returns the public key of the wallet's keypair. This can be used to calculate the Ethereum address.
info.getPubKey();

// Returns the version of the applet.
info.getAppVersion();

// Returns arbitrary data which has been set either at applet installation or through the STORE DATA command in the Keycard applet
info.getPubData();
```

## Signing
```java
// hash is the hash to sign, for example the Keccak-256 hash of an Ethereum transaction
// the signature object contains r, s, recId and the public key associated to this signature
RecoverableSignature signature = new RecoverableSignature(hash, cashCmdSet.sign(hash).checkOK().getData());
```