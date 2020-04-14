---
title: Whisper & QR Codes
description: Status offes an API to enhance your DApp with ease.
id: tutorial_3_status_extras
---

# Whisper & QR Codes

## Introducing the Status DApp API

Status presents an API you can use to enhance your DApp with ease. 

The Status DApp API will expand over time. Let us look at some features you might want to use right away. 

## Detecting Status

Your DApp will need to know if it is running in Status so it can implement extended functionality conditionally. 

``` javascript
if(window.ethereum.isStatus {
  // we are running in Status
}
```

Simple!

That means we can rely upon the Status DApp API.

## Whisper Contact

You can get/inspect the Contact ID to use with Whisper, the secure, distributed instant message protocol. 

``` javascript
window.ethereum.status
 .getContactCode()
 .then(data => {
   console.log('Contact code:', data)
 })
 .catch(err => {
   console.log('Error:', err)
 })
```

In this example, `data` is the user’s contact code. 

## ERC-925 (QR Codes)

ERC-925 ([https://github.com/ethereum/EIPs/issues/945](https://github.com/ethereum/EIPs/issues/945)) allows a DApp to trigger a generic QR Code scanner with ease, and Status supports this natively. 

``` javascript
window.ethereum
 .scanQRCode()
 .then(data => {
   console.log('QR Scanned:', data)
 })
 .catch(err => {
   console.log('Error:', err)
 })
```

In this example, `data` is the information encoded in the QR Code presented to the users’ camera and the `catch` will handle the case that the user cancels the scan before it finds a QR Code. 

DApps are not required to implement these features in order to appear in the DApp store but you may be able to improve your user experience by implementing them when your DApp detects Status.

## Links

- Detecting Status: [https://status.im/developer_tools/detecting_status.html](https://status.im/developer_tools/detecting_status.html)
- Status DApp API Reference: [https://status.im/developer_tools/status_web_api.html](https://status.im/developer_tools/status_web_api.html) 
- ERC-925: [https://github.com/ethereum/EIPs/issues/945](https://github.com/ethereum/EIPs/issues/945)