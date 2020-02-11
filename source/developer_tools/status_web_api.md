---
id: status_web_api
title: Status JavaScript API
---

# Status DApp API

On top of regular `web3` access, Status offers a set of API available to DApps developers.

When [Status is the host browser](https://docs.status.im/docs/status_optimized.html#detecting-status), DApp developers can request access to Status-specific data using the JavaScript API available at `window.ethereum.status`. 

#### JavaScript API methods

*  `getContactCode` provides access to a user's Whisper ID, which can be used to initiate chats or add a contact.

#### Example implementation

``` js
window.ethereum.status
 .getContactCode()
 .then(data => {
   console.log('Contact code:', data)
 })
 .catch(err => {
   console.log('Error:', err)
 })
```

*  `installExtension("extension-url")` allows DApp developers to trigger a native screen for installation of extension.

#### Example implementation

``` js
window.ethereum.status.installExtension("https://join.status.im/extension/ipfs@Qmb1B3jXNdc9WZCcWFzpkTXtrurnKxYQFvUDhp2J4SVCCX")
```

## Other APIs

Status also implements a number of APIs standardized by EIPs.

### ERC945

[https://github.com/ethereum/EIPs/issues/945](QR Code Scanning API) allows DApp developers to trigger a native generic QR code scanner.

#### Example

``` js
window.ethereum
 .scanQRCode()
 .then(data => {
   console.log('QR Scanned:', data)
 })
 .catch(err => {
   console.log('Error:', err)
 })
```