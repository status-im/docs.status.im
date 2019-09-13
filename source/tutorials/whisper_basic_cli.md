---
id: tutorial_basic_cli
title: Getting Started with Whisper
---

# Getting Started with Whisper

## Intro

In this tutorial we'll learn how to use Ethereum's Whisper protocol to create a simple chat CLI. While everything happens in your console for this tutorial, you should be able to re-use the JS we provide in your own apps and get a good sense of how to send and display different kinds of messages, as well as the beginnings of what it is possible to build with Whisper. 

We understand that not many DApp developers want to use Whisper in the way Status does (as a massive, multi-user messaging protocol), but rather to move specific (and often important) information about interactions in/with their DApp or plug into Status chats at specific moments. This tutorial is intended to provide you with the skills needed to adapt Whisper to your needs: you should know both enough to plug into any Status chat easily, as well as how to use Whisper for your own work by the end. Many other teams are already doing this, and you can - for instance - find more information about how to extend the basic concepts here into an interesting system on the [Bloom blog](https://blog.hellobloom.io/introducing-bloom-payment-channels-enabled-by-ethereum-whisper-1fec8ba10a03).

We have created [a repository](https://github.com/status-im/whisper-tutorial) specially for this tutorial. Please feel free to add additional tutorials if you would like to help the community out.

Before we clone that repository though, let's make sure all our dependencies are properly set up, especially NodeJS and Go-Ethereum. We'll be using the latest version of Geth to get you up to speed on what Whisper looks like today.

#### NodeJS 8.10+

``` bash
node version
> 8.10+
```

If you need to update Node, please [install `nvm`](https://github.com/creationix/nvm#installation) and install/use the LTS version. The macOS/Linux commands are provided for you below:

``` bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install --lts
nvm use lts
```

#### Go-ethereum 1.8.17+

``` bash
geth version
> 1.8.17+
```

If you need to [install `geth`](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum), you can use the below for macOS:

``` bash
brew tap ethereum/ethereum
brew install ethereum

/* Just to upgrade */
brew upgrade ethereum
```

And these instructions if you're using a Linux distro:

``` bash
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get install ethereum

# Just to upgrade
sudo apt-get update ethereum
```

## Start a Geth node

To use Whisper, you need a running Geth node. You can execute the following command to start a node with the minimum required options:

``` bash
geth --testnet --syncmode=light --ws --wsorigins=mychat --shh --wsapi=web3,shh,net
```

Here, we're connecting to Ropsten, ensuring that we're not validating full blocks (only headers), ensuring that `websockets` are enabled with a specific origin (which we'll use later in our JS), ensuring that Whisper (i.e. `shh`) is enabled, and that the `web`, `shh` and `net` APIs are available to us.

## Setup and explore!

Now that we have all the prerequisites set up, we need to clone our [tutorial project](https://github.com/status-im/whisper-tutorial) and install its dependencies.

``` bash
git clone https://github.com/status-im/whisper-tutorial.git
cd whisper-tutorial
npm install
```

Once you have installed all the dependencies, you may execute `npm start` to see what the tutorial is about. It's pretty simple - just a CLI interface that will allow you to send Whisper messages using a [default topic](https://github.com/status-im/whisper-tutorial/blob/start-here/src/index.js#L6) and some other settings. We cover below how to send both public and private messages.

To understand better why we go through the following steps and to understand each concept we introduce in more detail, please read through the [extended features](../research/extended_features.html) section above as you complete this.

You can close the application with `Ctrl + C` at any time.

## Coding our chat CLI

The file `src/index.js` is full of `TODO`s that we need to work with. The following sections will help us complete these actions in a logical way. At the end of each section you can execute `npm start` to see the progress.

#### `// TODO: Web3 connection`

In order to communicate via Whisper, we need a web3 connection. After ensuring that `geth` is running, we can connect to our node with the following code:

``` javascript
// Web3 connection
const web3 = new Web3();
try {
    web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546", {headers: {Origin: "mychat"}}));
    await web3.eth.net.isListening();
} catch(err) {
    process.exit();
}
```

Calling web3 and telling it to set its `provider` to our running geth instance (with the options above) will enable the CLI to connect to our node. It uses the origin `mychat`, specified in the `--wsorigins` flag of the `geth` command. If it cannot connect, the chat window closes.

#### `// TODO: Generate keypair`

We need to generate a keypair that is going to be used to sign the messages we send. We will use the same keypair to receive and decrypt private messages. This is as simple as calling a specific function that is exposed through the `shh` API:

``` javascript
// Generate keypair
const keyPair = await web3.shh.newKeyPair();
```

#### `// TODO: Generate a symmetric key`

"Public" messages are messages encrypted only by the whisper topic: i.e. they are not addressed to anyone in particular and are received by anyone that's listening in a specific channel. In our chat application, our channel is represented by a shared symmetric key whose "password" is just the channel we'll be using and listening to:

``` javascript
// Generate a symmetric key
const channelSymKey = await web3.shh.generateSymKeyFromPassword(DEFAULT_CHANNEL);
```

#### `// TODO: Obtain public key`

We need to generate for ourselves the public key so that we can identify messages that are sent over our channel. This is done with the following code:

``` javascript
// Obtain public key
const pubKey = await web3.shh.getPublicKey(keyPair);
```

#### `// TODO: Send a public message`

Once we have generated the symmetric key, we can send messages using `web3.shh.post`. We'll sign our message with our `keypair` and send it to a particular topic.

``` javascript
// Send a public message
web3.shh.post({
    symKeyID: channelSymKey,
    sig: keyPair,
    ttl: TTL,
    topic: channelTopic,
    payload: web3.utils.fromAscii(message),
    powTime: POW_TIME,
    powTarget: POW_TARGET
});
```

* `topic` is a 4 bytes hex string that can be used to filter messages. 
* `ttl` is the time to live in seconds. 
* `powTime` is the maximal time in seconds to be spent on proof of work. 
* `powTarget` is the minimal PoW target required for this message.

#### `// TODO: Subscribe to public chat messages`

You may have noticed that the messages you are sending are not being displayed on the screen. In order to see messages in Whisper, we'll need to `subscribe` to the messages received by the symmetric key. We can also create a filter using the same topic:

``` javascript
// Subscribe to public chat messages
web3.shh.subscribe("messages", {
    minPow: POW_TARGET,
    symKeyID: channelSymKey,
    topics: [channelTopic]
}).on('data', (data) => {
    // Display message in the UI
    ui.addMessage(data.sig, web3.utils.toAscii(data.payload));
}).on('error', (err) => {
    ui.addError("Couldn't decode message: " + err.message);
});
```

After adding this code, open two instances of the chat application and write a message. You'll see how it gets displayed in both windows. The only thing is that all messages you write can be seen by anyone listening to this channel, so lets fix this by adding private messages.

#### `// TODO: Send private message`

In order to send private messages, we have a command similar to IRC: `/msg 0xcontact_public_key message`. So, if you want to send a message, you just simply copy the contact's public key from the chat CLI, and write the message.

We already assign the contact's public key to the `contactCode` variable, and the body of the message in `messageContent`.

Sending a message to a specific asymmetric public key is similar to sending it to a symmetric key. The difference is that you need to specify the `pubKey` attribute instead of `symKeyId`.

``` javascript
// Send private message
web3.shh.post({
    pubKey: contactCode,
    sig: keyPair,
    ttl: TTL,
    topic: channelTopic,
    payload: web3.utils.fromAscii(messageContent),
    powTime: POW_TIME,
    powTarget: POW_TARGET
});
```

> In Ubuntu, you need to press `Shift` and drag-click the mouse to select the contact's public key

#### `// TODO: Subscribe to private messages`

Similar to receiving messages from the public channel, we'll need to create a subscription in order to receive private messages. To do this for private messages, we use as a `privateKeyID` our `keyPair` in order for the subscription to receive messages that were sent to our public key.

``` javascript
// Subscribe to private messages
web3.shh.subscribe("messages", {
    minPow: POW_TARGET,
    privateKeyID: keyPair,
    topics: [channelTopic]
}).on('data', (data) => {
    ui.addMessage(data.sig, web3.utils.toAscii(data.payload), true);
}).on('error', (err) => {
    ui.addError("Couldn't decode message: " + err.message);
});
```

Once you add this code, go ahead and open three instances of our chat application, write a public message in one window, and in the other, copy the public key and send a private message to the account that created the first message. The first and second window will be able to see the message, but the third window will only have received the public message.

## Final thoughts

As you can see, using Whisper for decentralized communication is quite easy, and you could leverage the protocol for passing offchain messages that are cryptographically secure. Bloom does this, as did [Project Khoka in South Africa](https://mybroadband.co.za/news/cryptocurrency/265811-how-the-sa-reserve-banks-ethereum-project-works.html), among many others.

However, at the moment there aren't enough online nodes available that have Whisper enabled (probably due to lack of incentives for running this feature), so messages may fail to get delivered unless you bootstrap some nodes like we do here at Status. You can contribute to the number of nodes availables by running your own node with the `--shh` option enabled. We'll <3 you forever.
