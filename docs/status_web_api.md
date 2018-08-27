---
id: status_web_api
title: Status JavaScript API
---

On top of regular `web3` access, Status offers a set of API available to DApps developers. This API follows the [EIP1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md) standard that will soon be used for web3 injection.

When [Status is the host browser](https://docs.status.im/docs/status_optimized.html#detecting-status), DApp developers can request access to Status-specific data using the JavaScript API. 

### How to use it

To make requests to the Status JavaScript API, send a message using the `window.postMessage` API. This message must be sent with a payload object containing a type property with a value of `'STATUS_API_REQUEST'` and a `permissions` property for the requested permissions, e.g. `“CONTACT_CODE”`.

Status will notify the DApp of successful API exposure by dispatching an event on `window` object. This event will contain a `detail` object with allowed `permissions` and `data` properties.


#### JavaScript API properties

*  `"CONTACT_CODE"` provides access to a user's Whisper ID, which can be used to initiate chats or add a contact.

#### Example implementation

```JavaScript
window.addEventListener('statusapi', function (event) {
    console.log(event.detail.permissions) //=> ["CONTACT_CODE"] if allowed 
    console.log(event.detail.data["CONTACT_CODE"]) //=> "0x0012300..123" if allowed
});
// request status API
window.postMessage({ type: 'STATUS_API_REQUEST', permissions: ["CONTACT_CODE"] }, '*');
```
