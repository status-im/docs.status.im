---
weight: 20
title: Tutorials
---

# Tutorials

## Overview

Just before we get started, it's well worth acquainting yourself with some of our terminology so you'll be able to make sense of it all. This anatomy establishes the different sections of the chat interface and establishes a common verbiage. The main components are:

* Message
* Input
* Keyboard
* Suggestions

![Chat Anatomy](images/chat-anatomy.png)

Please take some time to familiarize yourself with all the areas and the different configurations possible depending on what you want to do. Missing from the above is what we refer to throughout this documentation as the 'markup', by which we mean the mobile equivalent of the 'view', i.e. where the messages appear.

Creating all of these native setups is totally possible through the API - just read on.

## Installing Status

OK, let's learn how to build our first DApp on Status (mobile-first ftw!). To progress further, you need to have Status running either:

* on a real phone,

* in an Android simulator, or

* in an iOS simulator.

You can go to [https://test.status.im](https://test.status.im) to download for Android.
Or you can DM @jarradhope with your email in our [Slack](status-im.slack) for ios Testflight.

 <aside class="success">
Please note that these documents are intended for the latest version of "status-dev-cli" (^3.2.8) and the latest release of Status app (^0.9.8). To update `status-dev-cli` please run "npm uninstall -g status-dev-cli" and then "npm i -g status-dev-cli".
 </aside>

You can build Status yourself for either Android or iOS by following [these guidelines](https://wiki.status.im/contributing/development/building-status/). There, you will find instructions for installing an Android simulator, or starting up Status in the Xcode simulator.

Then, connect your phone to your Wi-Fi network (do not use USB). Development machine and phone should be in the same network. Navigate to the Console, select the `/debug` command and choose the `On` suggestion. You’ll get back a message telling you that debugging is on, and that you can use the [status-dev-cli](https://github.com/status-im/status-dev-cli) tools.

You also need to install `status-dev-cli` to make talking between Status and your machine a breeze.

```shell
npm i -g status-dev-cli
```

![With your phone connected, /debug "On"](images/starting.png)

*With your phone connected, /debug "On"*


## Debugging


OK, so Status is installed, but how do we interact with it?

You can check `<DEVICE-IP>` by running the `scan` command in the terminal. Another useful command we will be using a lot later on is `list` which will return a list of all DApps you have added to Status.

```shell
status-dev-cli scan
status-dev-cli list --ip <DEVICE-IP>       #be sure to use the IPv4 address
```

You will see that these tutorials also use `<MACHINE-IP>` throughout. This refers to the INTERNAL IPv4 address of your development machine. You can find that by running the command provided.

```shell
ifconfig | grep inet

# Look for this line - i.e. your IPv4 address - and use the equivalent of 192.168.0.103
--> inet 192.168.0.103 netmask 0xffffff00 broadcast 192.168.0.255
```

Even more importantly though, how can we actually debug the code we write? We know how important this is for good developers and we're still working on it. Currently, the options are limited, but we ask you to work with us here as it will improve rapidly over the next little while. 

The first and the most powerful option is the development tools included in your browser. Chrome supports remote debugging, and you can easily connect to any web view on your mobile and debug it right from the browser. The detailed instructions can be found [here](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).

If you use iOS, you can use Safari on your Mac to debug any remote web page. [Here](http://developer.telerik.com/featured/a-concise-guide-to-remote-debugging-on-ios-android-and-windows-phone/) is a nice guide that will explain everything to you.

Unfortunately, you cannot use your browser's development tools to debug bots, as switching the node only works for DApps currently. So, the option we provide for bots is the ability to extract logs. 

```shell
status-dev-cli log <DAPP-IDENTITY> --ip <DEVICE-IP>
``` 

## Networking

We give instructions here for Genymotion (a popular Android emulator). 

1. Install genymotion
1. Create a genymotion virtual device
1. Switch to network bridge mode (in the settings of your virtual device)

![Switch to "Bridge"](images/networking.png)  

1. Start virtual device
1. Install status.im apk from nightly builds by dragging onto emulator window
1. Start status.im app on virtual device
1. Turn on debugging in console (/debug On).
1. Open terminal and run `status-dev-cli scan` it returns two `<DEVICE-IP>` addresses, use `192.168.1.*`, and ignore `192.168.56.*`. Alternately retrieve the device ip from the emulator window `Settings > About phone > Status > IP address`.
1. Run `status-dev-cli add [dapp] --ip <DEVICE-IP>`. **Replace** `[dapp]` with your dapp details (`whisper-identity`, etc) as stringified json or **remove** `[dapp]` if those details are specified in a `package.json` in the current directory.



## My First DApp

{{% tabs DIY Embark Truffle %}}
{{% tab DIY %}}
### Do It Yourself with `status-dev-cli`

First, install the `status-dev-cli` tools globally using NPM. Then, create a directory for your app to live in, switch into it, and create an `index.html` file and an `app.js` file.

```shell
npm install -g status-dev-cli
mkdir ~/my-dapp && cd my-dapp
touch index.html app.js
```

The index.html will be really simple. We are going to add several meta tags to make our DApp look good on the small screens of mobile phones, and add a span that will be used by our JavaScript.

Our `app.js` file will also be simple. We are going to display the information about your account inside a span with `account id`. Status injects `web3.js` automatically, so you have an access to web3 variable from everywhere and you don’t need to care about including `web3.js` manually. However, you can do this and most probably you want to do this if you want to make your DApps work on other platforms.

> In index.html, add:   

```html
<html>
<head>
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
 <meta name="HandheldFriendly" content="True">
 <meta name="MobileOptimized" content="320">
 <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1">
 <title>My DApp</title>
 <script src="app.js"></script>
</head>
<body>
 <h1>Hello world!</h1>
 Web3 account: <span id="account"></span>
</body>
</html>
```
> In app.js, add:    

```js
function onContentLoaded() {
  var accountSpan = document.getElementById("account");
  accountSpan.innerHTML =  
    (typeof web3 === "undefined" ? "undefined" : web3.eth.accounts);
}
document.addEventListener("DOMContentLoaded", onContentLoaded);
```

You then need to install a really simple `http-server` from NPM (we recommend it for ease-of-use), and start it in the `my-dapp` directory we just created.

Open a new terminal session, navigate back to your `my-dapp` directory, and go ahead and add your dapp to Status! Make sure to pass in the `--ip` flag using the address returned to you by Console, when you [enabled debugging](#enabling-debugging).

`<MACHINE-IP>` needs to be the internal IPv4 address returned when you run `ifconfig | grep inet`.


```shell
npm install http-server -g
http-server
```

> In a new terminal window run the port forwarding and DApp connection stuff. It is important to pass in the `--ip` flag with the IP address listed by Console once you have selected the `debug` option and turned it on.

```shell
status-dev-cli add '{"whisper-identity": "hello-bot", "dapp-url": "http://<MACHINE-IP>:8080/", "name": "Hello"}' --ip <DEVICE-IP>
```

That's it! You should be able to see your DApp in the chats, and opening it should browse automatically to a page that shows your account information. You can also do live-reloading once you're happy with this by running `status-dev-cli watch $PWD hello-bot --ip <DEVICE-IP>`

* Known Issues

1) You may need to escape the `json` information you are passing into `status-dev-cli` if you are on a windows machine, like so: `status-dev-cli add '{\"whisper-identity\": \"my-dapp5\", \"dapp-url\": \"http://<MACHINE-IP>:8
080\",\"name\": \"My DApp\"}' --ip <DEVICE-IP>`

2) If using a real device, you also need to ensure that it is set to use MTP (media transfer Protocol) in the USB-debugging settings. Open the equivalent of your settings or develop options by pulling down the top menu and clicking in the debugging options.

3) The new version of `status-dev-cli` does not require you to do any `adb` port forwarding any more and will, in fact, fail if you do. Just use the `scan` and `list` commands as and when you need them.

Happy travels!

<aside class="success">
  You need not use NPM's http-server to serve content, there are innumerable ways of doing this. Just pick whatever is best for your environment.
</aside>

{{% /tab %}}

{{% tab Truffle %}}

### Truffle

OK, so we can write a little HTML5 DApp that displays information to Status users through a simple webView component. However, we want to do so much more! We want to write smart contracts, deploy them, and interact with them through a fully mobile user interface; and we want to build decentralized chatbots that live within Status and make friends with all the humans.

If you want to get straight to making chatbots, please go [here](#my-first-1-1-chatbot).

Frameworks can lighten the load of developing considerably, and so we include here some quick examples to get you up and running with the two most popular Ethereum frameworks currently available - Truffle and Embark.

Firstly, we'll need a network to develop against, so let's go get `testrpc` - a neat little simulation of the rules and logic of the Ethereum network that runs much faster than the live network (because it's only simulating things) and is very useful for quick and dirty iterations.

```shell
npm install -g ethereumjs-testrpc
testrpc -p 8546
```

That’s it! It will show you a list of available accounts, private keys, your HD wallet and mnemonic. Please note that we're running testrpc on (non-default) RPC port 8546, just to avoid potential conflict with the node running inside Status. If using android, you need to open the connection from your PC to your phone on that port, so Status can listen for changes there.

We also need to make sure that our Status client is listening to our new `testrpc` network, rather than Ropsten, so that we can get the information we need about our contracts etc. Luckily, this is as easy as running:

```shell
status-dev-cli switch-node "http://<MACHINE-IP>:8546" --ip <DEVICE-IP>

# Of course, there are options. You can use go-ethereum instead of TestRPC, and instead of port forwarding you can switch to any other accessible node using its IP address.
```

<aside class="success">
    Please note that "switch-node" only works for DApps, and NOT for bots. You javascript is still confined to the Otto VM jail for now. We are working on a solution, but please use "dapp-url" if developing against a local network for now.
</aside>

Open a new shell (i.e. a new Terminal window or tab) for the next part. You’ll leave `testrpc` running in the first window, and use the second window for the rest of the tutorial.

Now that you have `testrpc` is going, and a new shell is open, run:

```shell
npm install -g truffle # Version 3.0.5+ required.
```

This installs the Truffle framework, and you can find its GitHub [page here](https://github.com/trufflesuite/truffle).

With Truffle installed, we can grab the Status Truffle Box, and get a basic DApp running. All the Truffle Boxes also include the app frameworks React and Redux, which were designed by Facebook and are widely used by app developers. You can find the other Truffle Boxes [here](https://truffle-box.github.io/).

To install the Status Truffle box, all you have to do is run this command in the same Terminal window:

```shell
git clone https://github.com/status-im/truffle-box-status.git

# Change into the truffle box directory and install the node dependencies
cd truffle-box-status && npm install

# Compile the contracts from Solidity (much like JavaScript) into runnable EVM code
 truffle compile

# Publish the compiled contracts to your network. testrpc must already be running
 truffle migrate
```

![Example on OS X: testrpc running on the left, and installing Truffle on the right](images/starting-a-dapp-on-status-with-frameworks_02.png)

*Example on OS X: testrpc running on the left, and installing Truffle on the right*

As you run the `migrate` command - which is what deploys your contracts to the network - you can look at the window with `testrpc` running, and you’ll see your transactions being published. If you get `Error: Invalid JSON RPC response`, you probably forgot to run `testrpc`.

Now we are ready to see our DApp running on Status. From within your DApp directory, run:

```shell
# Run your Javascript
npm run start

#(Remember to set ENV variable if working with real device)
 IP=<DEVICE-IP> npm run start
```

This should tell you that the the app is running, and that the DApp has been added to the Status Contacts.

![The DApp added to the default Contacts](images/starting-a-dapp-on-status-with-frameworks_03.png)

*The DApp added to the default Contacts*

Again, the DApp should appear in your chats screen, and navigating to it should automatically open a browser that reveals all the goodies hidden in this truffle box. It should also display the stored value of `5` from the SimpleStorage contract that we deployed to `testrpc` by running `truffle migrate` above.

If you would like to change the name that appears for your bot when it gets added to Status, simply edit the `package.json` and update the name there.

Once everything is running, leave it as is and move on directly to the next truffle tutorial to see the power of the `status-dev-cli watch` command.

*Known problems and Notes:*

1) If you are running on a real iOS device, you need to configure Truffle Box to use the network on your computer. In `truffle.js`, change `host` to the IP of your computer:

```js
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "<MACHINE-IP>",
      port: 8546,
      network_id: "*" // Match any network id
    }
  }
};
```

2) You can always use `localhost` instead of `<MACHINE-IP>`, but the application won't be accessible automatically, since it runs on port 3000 and your device/emulator knows nothing about it. Execute the following to induce black magic and make the web application accessible:

```shell
adb reverse tcp:8546 tcp:8546
adb reverse tcp:3000 tcp:3000
```

{{% /tab %}}

{{% tab Embark %}}

### Embark

OK, so Truffle is not your favourite and you prefer using Embark. Fine with us. As always, make sure you have installed the framework first.

```shell
npm -g install embark
```

Embark makes it super easy to set up a demo and get up and running fast:

```shell
embark demo
cd embark_demo
```

Next we want to start the network. You can run a full Ethereum node with `embark blockchain`, but for development you probably want to run `testrpc`. We want it to run on port 8546 though, so it doesn't interfere with Status, so we need to edit the `blockchain.js`:

```shell
nano config/blockchain.json

# Now edit the 'Development' Network and change only the rpcPort field to 8546:

"development": {
    "enabled": true,
    "networkType": "custom",
    "genesisBlock": "config/development/genesis.json",
    "datadir": ".embark/development/datadir",
    "mineWhenNeeded": true,
    "nodiscover": true,
    "maxpeers": 0,
    "rpcHost": "<MACHINE-IP>",
    "rpcPort": 8546,
    "rpcCorsDomain": "http://<MACHINE-IP>:8000",
    "account": {
      "password": "config/development/password"
    }
  }

# ctrl+O will write your changes to file, ctrl+X will exit the file.
# Now, navigate back to the root of your project and start testrpc

cd .. && embark simulator
```

Open a new shell tab and switch the RPC node. Once that is done, you need to install the `embark-status` package.

```shell
status-dev-cli switch-node "http://<MACHINE-IP>:8546" --ip <DEVICE-IP>
npm install embark-status --save
```

When using a real device, you will now need to insert the relevant IP into two config files.

Open the file `embark.json` and edit the `plugins` key to reflects your DEVICE's IP address:

```js
"plugins": {
  "embark-status": {
    "deviceIp": "<DEVICE-IP>",
    "whisperIdentity": "dapp-embark-test",
    "name": "MyEmbarkDapp"
  }
}
```

Navigate to and change the `config/webserver.js` file so that it reflects your development machine's IP address:

```js
{
  "enabled": true,
  "host": "<MACHINE-IP>",
  "port": 8000
}
```

Now we’re ready to run the DApp on Status. From within your DApp directory, run:

```shell
embark run
```

The Embark console will appear within your shell with useful information about the SimpleStorage contract it has created, compiled, and deployed. Now just add your DApp, and have some fun!

```shell
status-dev-cli add '{"whisper-identity": "embark", "dapp-url": "http://<MACHINE-IP>:8000/", "name": "Embark"}' --ip <DEVICE-IP>
```

![](images/starting-a-dapp-on-status-with-frameworks_04.png)

![The Embark simulator runs in one Terminal window on the left, and the Embark console on the right](images/starting-a-dapp-on-status-with-frameworks_05.png)

*The Embark simulator runs in one Terminal window on the top, and the Embark console on the bottom*

*Known Issues and Notes:*

1) To deploy the DApp successfully on a device you may need to patch [this line](https://github.com/status-im/embark-status/blob/master/index.js#L13) in embark-status to include `+ " --dapp-port 5561"`.

2) You can always use `localhost` instead of `<MACHINE-IP>`, but the application won't be accessible automatically, since it runs on port 8000 and your device/emulator knows nothing about it. Execute the following to induce black magic and make the web application accessible:

```shell
adb reverse tcp:8546 tcp:8546
adb reverse tcp:8000 tcp:8000
```

{{% /tab %}}

{{% /tabs %}}

If you want to remove your DApp because you're unhappy with it for some reason, just run `status-dev-cli list --ip <DEVICE-IP>` and then `status-dev-cli remove --ip <DEVICE-IP> [my-dapp]` where [my-dapp] is the `whisper-identity` returned by the `list` command.

Using Status, you can now develop mobile DApps as easily as developing for MetaMask or Mist! But Status offers extra goodies as well.

In particular, Status will help you allow your users to chat with your DApp! The chat interface will let your users easily and intuitively accomplish tasks. In the future, your users will be able to hold group conversations where all the other participants are DApps, which is kind of amazing.

Later we’ll have an easy mechanism to make your DApp available for others to use on Status, but for now please just submit a pull request using our [guide on adding DApps](http://wiki.status.im/contributing/development/adding-dapps/).

## My First 1-1 Chatbot

{{% tabs DIY Embark Truffle %}}
{{% tab DIY %}}

### Do It Yourself

First, we're going to create a new `bots` directory and add file to keep our javascript in.

```shell
cd ~/my-dapp
mkdir bots && cd bots && touch bot.js
```

Instead of adding a new DApp, we can now include a `bot-url` parameter in our call to `status-dev-cli`. The chatbot url targets a `js` file, and this file will be loaded in the Otto VM shown in the anatomy. Code in this file сan interact with the input field, messages and react however we program it to.

Add the following code snippet to the newly-created `bot.js` file.

```js
status.addListener("on-message-send", function (params, context) {
    var result = {
            err: null,
            data: null,
            messages: []
        };

    try {
        result["text-message"] = "You're amazing, master!";
    } catch (e) {
        result.err = e;
    }

    return result;
});
```

Then, navigate back to the `bots` directory, do the necessary Android steps if you are using that platform, and start the http server again. Then, open a new shell window and add your new bot. It's important to note a few things here. We are `add`ing a new new bot, rather than just watching the DApp we built earlier for changes. Also, we are only passing in a `bot-url`, rather than a `dapp-url` - this will ensure that, when you open your new bot contact, it won't automatically launch a browser a window.

```shell
#make sure you're in my-dapp or the equivalent
cd ~/my-dapp

#start the server and then open a new shell window
http-server
```

```shell
status-dev-cli add '{"whisper-identity": "botler",  "name": "Botler" ,"bot-url": "http://<MACHINE-IP>:8080/bots/bot.js"}' --ip <DEVICE-IP>
```

This is pretty much the simplest responsive chatbot we can write, using only the `addListener` function from the API. All it's listening for is a message-send event, to which it will try to respond with the test `You're amazing, master!`.

Obviously, there's much more we can do than simply listen for messages and send flattering responses. All will be revealed in the next tutorial. If you're feeling impatient, you can find a full Demo Bot [here](https://github.com/status-im/status-react/tree/34b77022f7926dbabbb0e8c5e8471eaea5ed812f/bots/demo_bot).

*Known Issues and Notes:*

1) You can always use `localhost` instead of `<MACHINE-IP>`, but the application won't be accessible automatically, since it runs on port 8080 and your device/emulator knows nothing about it. Execute the following to induce black magic and make the web application accessible:

```shell
adb reverse tcp:8080 tcp:8080
```

{{% /tab %}}

{{% tab Embark %}}

### Embark

OK, so even though `status-dev-cli` is lightweight and awesome, the frameworks offer some really cool features and make development significantly easier for many projects. Let's see what it's like to add the same chatbot to Status using Embark.

First, go back to the `embark_demo/` directory we created [earlier](#my-first-dapp), where we set up the correct configuration for Embark and Status. Essentially, you just want to make sure - as with the Truffle Box example - that you put the javascript file in the right place so that you can reference it correctly.

Instead of adding a new DApp, we can now include a `bot-url` parameter in our call to `status-dev-cli`. The chatbot url targets a `js` file, and this file will be loaded in the Otto VM shown in the anatomy. Code in this file сan interact with the input field, messages and react however we program it to.

Let's create a bot.js in the `/embark_demo/app/js/` directory and put the short snippet of javascript we need into it.

```shell
touch ~/embark_demo/app/js/bot.js
nano ~/embark_demo/app/js/bot.js
```

```js
status.addListener("on-message-send", function (params, context) {
    var result = {
            err: null,
            data: null,
            messages: []
        };

    try {
        result["text-message"] = "You're amazing, master!";
    } catch (e) {
        result.err = e;
    }

    return result;
});
```
This is pretty much the simplest responsive chatbot we can write, using only the `addListener` function from the API. All it's listening for is a message-send event, to which it will try to respond with the test `You're amazing, master!`.

Obviously, there's much more we can do than simply listen for messages and send flattering responses. All will be revealed in the next tutorial. If you're feeling impatient, you can find a full Demo Bot [here](https://github.com/status-im/status-react/tree/34b77022f7926dbabbb0e8c5e8471eaea5ed812f/bots/demo_bot).

We now need to update the `config/blockchain.json` so it copies over our bot into a public directory (see the last line inside app object).

```js
  "contracts": ["app/contracts/**"],
  "app": {
    "css/app.css": ["app/css/**"],
    "images/": ["app/images/**"],
    "js/app.js": ["embark.js", "app/js/_vendor/jquery.min.js", "app/js/_vendor/bootstrap.min.js", "app/js/**"],
    "index.html": "app/index.html",
    "js/bot.js": "app/js/bot.js"   # Add this line in #
  },
  "buildDir": "dist/",
```

That should serve the `js` files you need, so the last thing you'll need to do is add this bot to Status as per usual.

```shell
status-dev-cli add '{"whisper-identity":"embark-demo-bot", "name":"Embark-Demo-Bot", "bot-url":"http://<MACHINE-IP>:8000/js/bot.js"}' --ip <DEVICE-IP>
```

Again, you could always use `localhost` instead if you run into issues, and just make sure to run `adb reverse tcp:8000 tcp:8000`.

{{% /tab %}}

{{% tab Truffle %}}

### Truffle

 Let's see what it looks like to add the same, flattering little chatbot to Status through the Truffle Box we set up earlier. We assume here that you still have `testrpc` running from the previous tutorial and that you are still running the `npm start` script. If not, navigate back to that directory, ensure that `testrpc` is switched on and that you have opened all the right ports if you're on Android.

 > Only if you have switched off everything from the previous tutorial.

```shell
testrpc -p 8546

status-dev-cli switch-node "http://<MACINE-IP>:8546" --ip <DEVICE-IP>

cd ~/truffle-box-status

# If you want to be extra sure your contracts are there, run:
truffle migrate --reset
```

So, all we need to do here is add a `bot` directory in Truffle's `public` directory (i.e. the one accessible from the web) and write some simple javascript and - hey presto! - we'll have a decentralized chatbot. Copy the code provided into another `bot.js` file. The `bot-url` targets a `js` file, and this file will be loaded in the Otto VM shown in the anatomy. Code in this file сan interact with the input field, messages and react however we program it to.

```shell
cd ~/truffle-box-status/public/ && mkdir bot/
touch bot/bot.js
nano bot/bot.js
```

```js
status.addListener("on-message-send", function (params, context) {
    var result = {
            err: null,
            data: null,
            messages: []
        };

    try {
        result["text-message"] = "You're amazing, master!";
    } catch (e) {
        result.err = e;
    }

    return result;
});
```

If you look on line 42-43 of the `npm start` script, you'll see that we already passed in a `bot-url` when adding the Truffle Box in the previous tutorial. So, all we need to do now is `status-dev-cli watch` that same DApp to activate the live-reloading and start chatting to our bot through the chat, or interacting with our contracts through the webView. However, we need to know what to tell `status-dev-cli` to watch for, so let's try `list` our DApps currently in Status.

```shell
status-dev-cli list --ip <DEVICE-IP>
# dapp-0x74727566666c652d626f782d737461747573 (Name: "truffle-box-status", DApp URL: "http://<MACINE-IP>:3000")
```

The first value returned there is the DApp's `whisper-identity`, which is what we need to pass to the `watch` command to tell it what to look for. Using it, we can now tell `status-dev-cli` to watch for our changes and go find that brand new bot.

```shell
# Make sure you're in the truflle-box-status/ directory as that is what $PWD refers to below
cd ~/truffle-box-status

# I would use dapp-0x74727566666c652d626f782d737461747573 for <whisper-identity> below, Substitute your own one in.
status-dev-cli watch $PWD "<whisper-identity>" --ip <DEVICE-IP>
```

And you're away! You should be able to see your DApp, browse to the same site as before, and chat with the repetitively flattering greeter bot.

{{% /tab %}}

{{% /tabs %}}

Once you have worked through the first tutorials and understood the basic steps to building a DApp and adding it into Status, it's time to get our hands a little more dirty by actually writing a simple, one-response chatbot that will begin to utilise the awesome power of the Status API.

We kind of cheated a little in the previous tutorials. While it is totally possible to have your html5 DApp work perfectly in Status via `webView`, it's obviously not the most optimal way to do things. There are essentailly two different ways for developers to interact with Status, best illustrated by the Status Anatomy below:

![status-anatomy.png](images/status-anatomy.png)

The main take away here is that the chat context itself is actually an Otto VM jail that executes the javascript you write, and then integrates that directly with Status. So, we can actually write bots that are purely javascript-based. Please see [here](https://github.com/status-im/status-react/tree/develop/resources/js/bots) for a full list of all our current bots and their source code.


## My First Status Command

{{% tabs DIY Embark Truffle %}}

{{% tab DIY %}}

### Do It Yourself with `status-dev-cli`

So, we have set up Status in `debug` mode, added our DApp to it (hopefully run the `status-dev-cli watch` command to get some live-reloading going) and learned how to start a conversation with a simple javascript chatbot. Now it's time to start using the API proper and start using the provided commands to interact with our users and help them out.

Navigate back to your `bots` directory and open the `bot.js` file where we put the `status.addListener` function in the previous tutorials. We will again pass this fils in as a `bot-url` parameter to `status-dev-cli`, which will then execute the code in an Otto VM jail.

```shell
cd ~/my-dapp/bots/ && nano bot.js

# or use 'vi bot.js' if that's your preference
```

Then, open the file in the text editor of your choice and add in the code provided. All we want to do is provide our user with a command, called `hello` that they can issue into the chat and we can respond to. In order to achieve this effect, we set up a simple `status.command()` and pass in a name, title and description so as to identify our command and display it to the user, along with some helpful information about what it does.

```js
status.command({
     name: "hello",
     title: "HelloBot",
     description: "Helps you say hello",
     color: "#CCCCCC",
     preview: function (params) {
             var text = status.components.text(
                 {
                     style: {
                         marginTop: 5,
                         marginHorizontal: 0,
                         fontSize: 14,
                         fontFamily: "font",
                         color: "black"
                     }
                 }, "Hello from the other side!");

             return {markup: status.components.view({}, [text])};
         }
 });
```

We then set a color for the command to appear in set up our preview function. You can read about exactly what the preview function can achieve in the formal API specififcation but, in a nutshell, the preview defines what the user will see returned in the markup - i.e. where the messages appear.

Here, we are creating a simple text response by setting up a variable that we pass to `status.components.text`, which the perceptive will notice is a React Native component - a whole bunch more of which are available and detailed in the formal specification. Beneath the text, we are creating a standard response of "Hello from the other side!", all of which will be returned as json to the markup. Note again the use of another React Native component - `status.components.view`.

Go ahead and serve your dapp again:

```shell
http-server

status-dev-cli list --ip <DEVICE-IP>

status-dev-cli watch $PWD "<whisper-identity>" --ip <DEVICE-IP>
```

And there you go - we are now capable of greeting and interacting with our bot in two ways! You should be able to see your DApp, navigate to it, tap the new `/hello` command you see above the text input field and see your new Dapp respond.

{{% /tab %}}

{{% tab Embark %}}

### Embark

```shell
cd ~/embark_demo/app/js/bot.js && nano bot.js
```
Here, we are going to create a simple text response by setting up a variable that we pass to `status.components.text`, which the perceptive will notice is a React Native component - a whole bunch more of which are available and detailed in the formal specification. Beneath the text, we are creating a standard response of "Hello from the other side!", all of which will be returned as json to the markup. Note again the use of another React Native component - `status.components.view`.

```js
status.command({
     name: "hello",
     title: "HelloBot",
     description: "Helps you say hello",
     color: "#CCCCCC",
     preview: function (params) {
             var text = status.components.text(
                 {
                     style: {
                         marginTop: 5,
                         marginHorizontal: 0,
                         fontSize: 14,
                         fontFamily: "font",
                         color: "black"
                     }
                 }, "Hello from the other side!");

             return {markup: status.components.view({}, [text])};
         }
 });
```
Go ahead and `run` your Embark application again and watch for changes to your new, interactive bot. We have already made sure that the `js` is built to, and served in, the right place, so we should just be able to list the DApps and bots currently in Status and just watch the "embark-demo-bot" we set up earlier.

```shell
# Only if using an Android device
adb reverse tcp:8000 tcp:8000

embark run

status-dev-cli list --ip <DEVICE-IP>

status-dev-cli watch $PWD "<whisper-identity>" --ip
```

And there you go - we are now capable of greeting and interacting with our bot in two ways! You should be able to see your DApp, navigate to it, tap the new `/hello` command you see above the text input field and see your new Dapp respond.

{{% /tab %}}

{{% tab Truffle %}}

### Truffle

```shell
cd ~/truffle-box-status/public/bot/ && nano bot.js
```

Navigate back to the truffle box  `public` directory and open the `bot.js` file we previously created so as to add the code provided and display it through truffle.

```js
status.command({
     name: "hello",
     title: "HelloBot",
     description: "Helps you say hello",
     color: "#CCCCCC",
     preview: function (params) {
             var text = status.components.text(
                 {
                     style: {
                         marginTop: 5,
                         marginHorizontal: 0,
                         fontSize: 14,
                         fontFamily: "font",
                         color: "black"
                     }
                 }, "Hello from the other side!");
             return {markup: status.components.view({}, [text])};
         }
 });
```

Much like we did last time, just find the `whisper-identity` of your DApp and `watch` for changes.

```shell
status-dev-cli list --ip <DEVICE-IP>
# dapp-0x74727566666c652d626f782d737461747573 (Name: "truffle-box-status", DApp URL: "http://<MACHINE-IP>:3000")

# Make sure you're in the truflle-box-status/ directory as that is what $PWD refers to below
cd ~/truffle-box-status

# I would use dapp-0x74727566666c652d626f782d737461747573 for <whisper-identity> below, Substitute your own one in.
status-dev-cli watch $PWD "<whisper-identity>" --ip <DEVICE-IP>
```


{{% /tab %}}

{{% /tabs %}}

We can now write a 1-1 chatbot that responds when users send messages to it using the `status.addListener` method provided by the API, but what if we want to provide our users with a command they can interact with, rather than just waiting for them to send us some kind of message, or take some other action?

We need to use the `status.command()` method. As usual, we can do this ourselves through the barebones `status-dev-cli`, or through the popular frameworks currently available on Ethereum.


## My First Interactive Suggestions Area

Let's go ahead and make that `hello` command we just created a little bit more clever.

```shell
cd ~/my-dapp/bots/ && nano hello.js
```
Instead of the preview parameter we used last time, let's build another `status.command()` and add in a `params` option with a `suggestions` object in it. This will create a suggestions area which - if you refer back to the [Chat Anatomy](#overview) - is what rolls up above the keyboard, such as you see when turning on the debugging server with the options `On` and `Off`.

```js
status.command({
     name: "greet",
     title: "Greeter",
     description: "Helps you choose greetings",
     color: "#0000ff",
     params: [{
              name: "greet",
              type: status.types.TEXT,
              suggestions: helloSuggestions
             }]
 })
```

"But wait!" we hear you cry, "what on earth is that `helloSuggestions` thing about?!". Well, let’s make a function to explain. This will return a `scrollView` with two suggestions: "Hello", and "Goodbye". Don’t get intimidated by the length, there’s actually not much to it.

First, we set up the helpers that will style the suggestion as it appears in the suggestions area.

```js
function suggestionsContainerStyle(suggestionsCount) {
    return {
        marginVertical: 1,
        marginHorizontal: 0,
        keyboardShouldPersistTaps: "always",
        height: Math.min(150, (56 * suggestionsCount)),
        backgroundColor: "white",
        borderRadius: 5,
        flexGrow: 1
    };
}
var suggestionSubContainerStyle = {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#0000001f"
};

var valueStyle = {
    marginTop: 9,
    fontSize: 14,
    fontFamily: "font",
    color: "#000000de"
};
```

Now, we need to write the main star of our show - that mysterious `helloSuggestions` function we passed into the `params` of our `status.command()`. The objective here is to return two touchable buttons - one for `Hello` and the other for `Goodbye`. We are making quite extensive use of React native Components here, so we expect at least some level of familiarity with the framework in order to get the most out of these tutorials.

```js
function helloSuggestions() {
    var suggestions = ["Hello", "Goodbye"].map(function(entry) {
        return status.components.touchable(
            {onPress: status.components.dispatch([status.events.SET_VALUE, entry])},
            status.components.view(
                suggestionsContainerStyle,
                [status.components.view(
                    suggestionSubContainerStyle,
                    [
                        status.components.text(
                            {style: valueStyle},
                            entry
                        )
                    ]
                )]
            )
        );
    });

    // Let's wrap those two touchable buttons in a scrollView
    var view = status.components.scrollView(
        suggestionsContainerStyle(2),
        suggestions
    );

    // Give back the whole thing inside an object.
    return {markup: view};
}
```

The main point of this example is that your `suggestions` parameter should accept users’ input, and then return a component to be rendered.

We have already added this contact to Status, so let's se if we can set up our environment to do some live reloading so that we don't have to revert to the cli every time we want to change something in the process of building all the new things.

```shell
http-server

status-dev-cli watch $PWD "<whisper-identity>" --ip <DEVICE-IP>
```

You can also work with the `suggestionsTrigger` parameter. Now that we’ve covered `params` and the possibility of `suggestions`, it’s easy to see that `suggestionsTrigger` will take a string corresponding to an event that, when triggered, will show all your `suggestions`. If you don’t include this parameter, the default is "on-change", so your suggestions will show when your users selects the command.

It's also worth knowing about the `fullscreen` option. If your command has `suggestions`, this `param` controls whether that list of suggestions expands to fill the entire screen. If your command has a lot of suggestions, you might want to set `fullscreen` to `true`, so that your users don’t have to pull the list upwards. On the other hand, if your command has only a few suggestions and you set `fullscreen` to `true`, your users will have to pull the list downwards to keep it from hiding the screen. Choose whichever will be most convenient to your users, considering your command’s suggestions.

OK, so we can build up a basic command, show it to the user and have it do something (like return text) when the user taps it. That's great, but what happens if we want to be a bit more dynamic and interactive and suggest to our users a range of options to choose from when issuing the command? Let's take a look...

For another full example of an interactive suggestion area, please take a look over our [Demo Bot](https://github.com/status-im/status-react/blob/develop/resources/js/bots/demo_bot/bot.js), which makes prominent use of the `defineSubscription` method from the API and may be helpful for those looking to work with things like the `status.component.slider` React Native Component.

You could also build a location bot following a similar pattern. We provide the code for you, just because we can. See if you can get it all working right this time...

```js
I18n.translations = {
    en: {
        location_title: 'Location',
        location_suggestions_title: 'Send location',
        location_description: 'Share your location',
        location_address: 'address'
}}

status.command({
    name: "location",
    title: I18n.t('location_title'),
    description: I18n.t('location_description')
    hideSendButton: true,
    sequentialParams: true,
    params: [{
        name: "address",
        type: status.types.TEXT,
        placeholder: I18n.t('location_address')
    }]
 })
 ```

 Or, even better, can you get some location suggestions to display?

 ```js
 function locationsSuggestions (params) {
    var result = {title: "Send location"};
    var seqArg = params.seqArg ? params.seqArg : "";

    if (seqArg == "Dropped pin")
    {
        result.markup = ["view", {}, ["text", {}, "Dropped pin" + seqArg]];
    }
    else if (seqArg != "")
    {
        result.markup = ["view", {}, ["text", {}, "Let's try to find something " + seqArg]];
    }
    else
    {
        result.markup = ['current-location', {showMap: true}];
    }

    return result;
}
```


## Frequently Asked Questions (FAQ)

### My bot has been deployed but it does not appear to work.

Make sure that the `bot-url` you provided when adding your bot is accessible from your device. For example, open it in mobile browser. 

### Is there a way to debug my bot?

`status-dev-cli log` allows to access outputs from `console.log()`. So, just add in the necessary `console.log()`s and read them in your terminal. The team is working actively to make this easier.

### Can I connect to a different RPC server?

`status-dev-cli switch-node` only works for `dapp-url`s at the moment. Due to the restrictions of the Otto VM jail that the bots `js` is run in, it still connects by default to Ropsten and your Status account. The team is actively working on ways around this.

### Can custom commands be added to normal chat?

Currently they are only available to 1-1 chat with bots. At some stage in the future we will implement group chats and all your dreams will come true.

## Status API FAQs

### How can I set the text input value?

You can use `status.components.dispatch` in tandem with the `SET_VALUE` object. For instance, if you wanted to sugeest a url, you would do the following: `status.components.dispatch([status.events.SET_VALUE, "@browse url"])}`. A more complete example is also given alongside.

```javascript
return {markup: status.components.touchable(
            {onPress: status.components.dispatch([status.events.SET_VALUE, "@browse url"])},
            status.components.view( {},
                        status.components.text(
                            {},
                            "Click me"
                        )
            )
        )};
```

### How can I send a command a display result back?

Here we use the `onSend` function to direct a user to a website based on their initial input.

```javascript
status.command({
    name: "google_or_yahoo",
    title: 'TITLE',
    description: 'DESCRIPTION',
    fullscreen: true,
    params: [{
        name: "option",
        type: status.types.TEXT,
        placeholder: "either type G or Y"
    }],
    onSend: function(params){
      console.log('***', params);
      if (params.option == 'g') {
        url = 'http://www.google.com'
      }else{
        url = 'http://www.yahoo.com'
      }
      return {
              title: "Browser",
              dynamicTitle: true,
              singleLineInput: true,
              actions: [ { type: status.actions.FULLSCREEN } ],
              markup: status.components.bridgedWebView("http://google.com/")
      };
    }
});
```

### Can I send a message asynchrounously after a request has been sent?

Use the latest nightlies and `status.sendMessage` will now be available.

```javascript
 status.command({
    name: "test",
    icon: "test",
    title: "test",
    description: "test",
    color: "#a187d5",
    sequentialParams: true,
    params: [{
        name: "address",
        type: status.types.TEXT,
        placeholder: "address"
    }],
    handler: function (params) {
        status.sendMessage("Address " + params.address);
    }
});
```

### How can I add an image to my reactive component?

It's easy enough to achieve this by using `status.components.image`.

```js
status.components.image({style: {width: 50, height: 50}, source: {uri: 'https://facebook.github.io/react/img/logo_og.png'}}),
```

## JS and web3 API FAQ

### How can data be stored and retrieved?

Yes it can be, using `localStorage`.

```js
status.addListener("on-message-send", function (params, context) {
    var cnt = localStorage.getItem("cnt");
    if(!cnt) {
        cnt = 0;
    }

    cnt++;

    localStorage.setItem("cnt", cnt);
    if (isNaN(params.message)) {
        return {"text-message": "Seems that you don't want to send money :(. cnt = " + cnt};
    }

    var balance = web3.eth.getBalance(context.from);
    var value = parseFloat(params.message);
    var weiValue = web3.toWei(value, "ether");
    if (bn(weiValue).greaterThan(bn(balance))) {
        return {"text-message": "No way man, you don't have enough money! :)"};
    }
    web3.eth.sendTransaction({
        from: context.from,
        to: context.from,
        value: weiValue
    }, function (error, hash) {
        if (error) {
            status.sendMessage("Something went wrong, try again :(");
            status.showSuggestions(demoSuggestions(params, context).markup);
        } else {
            status.sendMessage("You are the hero, you sent " + value + " ETH to yourself!")
        }
    });
});
```

### Can I interract with `web3` object?

Yes! The snippet provided showcases both `localStrage` and the `web3` object operating in tandem.


### Can I parse JSON data?

Yes JSON.parse()is supported. 

### Is XMLHttpRequest supported?

Not yet. 

### Any examples ?

* https://github.com/status-im/status-react/blob/develop/resources/js/bots/demo_bot/bot.js
* https://github.com/status-im/status-react/blob/develop/resources/js/bots/console/bot.js
