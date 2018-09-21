---
id: send_transaction_flow
title: Send Transaction Flow
---

![Send Transaction Flow](../img/SendTransaction_flow_new.png)

The diagram above is fairly self-explanatory if you just follow the flow carefully. Essentially, we have three sources from whence a transaction can be generated - a Webview DApp or the Status Wallet calling `web3.sendTransaction` from within the status-react module, or a full chatbot living in an `JavaScriptCore` jail.

1. `web3.sendTransaction` is called with a callback function that add it to the transaction queue in status-go.
2. The callback fires off an event, transaction.queued that is passed back into status-react (i.e. the UI) and is shown to the user as something requiring an action.
3. At this stage, user can choose to sign or cancel it.
4. If they cancel it, it is passed back to status-go (i.e where the node is) with a `DiscardTransaction` flag that is used to remove it from the queue.
5. If they sign it, the signed transaction gets passed back to the node with another callback function, which checks if the correct password was used. If the password is correct, both callbacks are used to signal a successful transaction and clear it from the queue.
6. If the password is incorrect, the second callback - passed in at Step 3 - is used to return the transaction back to the UI with a transaction.failed flag that asks the user to re-enter the correct password, or gives them additional information about why it might have failed.

Also see [this issue](https://github.com/status-im/status-go/issues/1027), entitled "Get rid of transactions queue". 

