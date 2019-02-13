---
id: workflow
title: Workflow
---

Now is the time to create a first extension.

# Installation

Extensions are currently installed by QR code or URL.

Once an extension is deployed via the [playground](https://status.im/extensions/play.html), a unique QR code and universal link are generated for its IPFS hash.

To install the extension in Status:

1. Open the profile screen
2. Enable `Development mode`
3. Open the `Extensions` tab
4. Tap the `+` icon
5. Enter the extension's URL or scan its QR code

![Extension installation](./assets/install-extension.gif)

# Development

First get familiar with the [syntax](https://status.im/extensions/syntax.html) and decide what extension [type](https://status.im/extensions/extension_types.html) you want to rely on.
Then look at existing [examples](https://status.im/extensions/examples.html) to get some inspiration and basis.
Finally use the [playground](https://status.im/extensions/play.html) to create and publish your extension.

The general development workflow consists of:

* hack your extension in the playground
* once you are satisfied (and no errors are left), click `publish`
* scan the newly added QR code from status
* test your extension

Repeat this flow until you are happy with your extension! It can then be shared using the full playground URL (including your extension hash).

 _DISCLAIMER_ Note that currently there are no debugging facility. Extensions have to be manually tested on a real device.