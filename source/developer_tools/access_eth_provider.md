---
id: access_eth_provider
title: Accessing an Ethereum Provider
---

# The Decentralized Web Awaits You...

The pattern of full provider auto-injection followed by the previous generation of Ethereum-enabled DOM environments fails to protect user privacy and fails to ensure a safe user experience: untrusted websites can both view account information and arbitrarily initiate transactions on a user's behalf. Even though most users may reject unsolicited transactions on untrusted websites, a protocol for provider exposure should make such unsolicited requests impossible.

In order to access an Ethereum provider (especially after November 2, 2018), you will need to request permission from the user, rather than automatically injecting `web3` into the page.

You can read the full rationale on [our blog](https://our.status.im/breaking-change-to-the-status-browser/).

### Include the web3.js Library in Your Project

This can be done different ways depending on the structure of your project and the flavour of JS you happen to be using. Most often it looks something like this:

``` js
import Web3 from 'web3'
```

### Create a New Web3 Object

After importing `Web3` from the library you're using, you need to make sure it is instantiated for that page/app:

``` js
web3 = new Web3(ethereum)
```

### Request Full Access to the Provider

```js
window.addEventListener('load', async () => {
    // Read-only provider is exposed by default
    console.log(await ethereum.send('net_version'));
    try {
        // Request full provider if needed
        await ethereum.enable();
        // Full provider exposed
    } catch (error) {
        // User denied full provider access
    }
});
```

Note the read-only provider in the first line, which is exposed by default. Accessing the user's address and initiating transactions or signing messages requires the `ethereum.enable()` call to be accepted by the user.

Further details around the structure we have all settled on together can be found in [EIP 1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md).

### Setting the default account

web3.js uses web3.eth.defaultAccount for any transaction that does not specify a `from`. In order to be able to create transactions, you must set a valid address. The following code can only be executed once `ethereum.enable();` has been executed successfully:

``` js
web3.eth.getAccounts().then(accounts => {
    web3.eth.defaultAccount = accounts[0];
});
```

### Using Web3 Rather Than the Provider

You can see that the EIP suggests using `await ethereum.send('eth_sendTransaction', [/* ... */]);`, after being granted full access, but we feel this is likely confusing. Most developers already use web3 when sending transactions (of any kind - i.e. it could be `web3.eth.defaultBlock` or `web3.eth.estimateGas` etc.).

This is why we suggest importing web3 from the appropriate library for your Dapp, instantiating it, adding the new provider block above, and then handling transactions through web3 as your normally would before the November 2, 2018 breaking changes.

This works exactly like it always has:

`web3.eth.sendTransaction(transactionObject)`

Constructing the transactionObject is, again, heavily dependent on what you’re trying to do, but here is a super simple example of what it might look like if you just plugged the required values straight in:

``` js
// using web3.js 1.0.0-beta
web3.eth.sendTransaction({
    from: web3.eth.defaultAccount,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000',
    gas: gasLimit // use web3.eth.estimateGas() to get this amount, and add a little for extra safety.
}).then(receipt => {
    console.log(receipt.transactionHash); // "0xe7991ac8107a2dd70f996ea0cd867a828b2f228b39436506271d6a53587eff16"
}).catch(function(err){
    console.error(err);
});
```
