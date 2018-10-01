---
id: status_web_api
title: Status JavaScript API
---

## Status DApp API

On top of regular `web3` access, Status offers a set of API available to DApps developers. This API follows the [EIP1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md) standard that will soon be used for web3 injection.

When [Status is the host browser](https://docs.status.im/docs/status_optimized.html#detecting-status), DApp developers can request access to Status-specific data using the JavaScript API available at `window.web3.currentProvider.status`. 

#### JavaScript API methods

*  `getContactCode` provides access to a user's Whisper ID, which can be used to initiate chats or add a contact.

#### Example implementation

```JavaScript
window.web3.currentProvider.status
 .getContactCode()
 .then(data => {
   console.log('Contact code:', data)
 })
 .catch(err => {
   console.log('Error:', err)
 })
```

## Others API

Status also implements a number of API standardized by EIPs.

### ERC945

[https://github.com/ethereum/EIPs/issues/945](QR Code Scanning API) allows DApp developpers to trigger a native generic QR code scanner.

#### Example

```JavaScript
window.web3.currentProvider
 .scanQRCode()
 .then(data => {
   console.log('QR Scanned:', data)
 })
 .catch(err => {
   console.log('Error:', err)
 })
```
