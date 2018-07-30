---
id: status_web_api
title: Status JavaScript API
---

On top of regular `web3` access, Status offers a set of API available to DApps developers. This API follows the [EIP1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md) standard that will soon be used for web3 injection.

When [Status is the host browser](https://docs.status.im/docs/status_optimized.html#detecting-status), DApp developers can request access to Status-specific data using the the JavaScript API. 

### How to use it

To make requests to the Status JavaScript API, send a message using the `window.postMessage` API. This message must be sent with a payload object containing a type property with a value of `'STATUS_API_REQUEST'` and a `permissions` property for the requested permissions, e.g. `“CONTACT_CODE”`.

Status will notify the DApp of successful API exposure by returning a message via the `window.postMessage` API. This message will contain a payload object with a type property value of `'STATUS_API_SUCCESS'` as well as a property for granted permissions, e.g. `“CONTACT_CODE”`.

Status will expose a JavaScript API as a global `STATUS_API` variable on the `window` object.

#### JavaScript API properties

*  `"CONTACT_CODE"` provides access to a user's Whisper ID, which can be used to initiate chats or add a contact.

#### Example implementation

```JavaScript
window.addEventListener('message', function (event) {
    if (!event.data || !event.data.type) { return; }
    if (event.data.type === 'STATUS_API_SUCCESS') {
        console.log(event.data.permissions) //=> ["CONTACT_CODE"] if allowed , and [] if not allowed
        console.log(STATUS_API["CONTACT_CODE"]) //=> "0x0012300..123" if allowed
    }
});
// request status API
window.postMessage({ type: 'STATUS_API_REQUEST', permissions: ["CONTACT_CODE"] }, '*');
```
