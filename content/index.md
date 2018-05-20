---
weight: 10
title: API Introduction
---

# Introduction

<p style='color:red;'>DOCUMENTATION STILL WORK IN PROGRESS</p>

Welcome to the Status API! Tread carefully, for you tread on the dreams of a better web.

Status allows users to interact with a wide array of Decentralized Applications (DApps) using the same intuitive chat interface (it also does a bunch of other things, but we'll focus on this aspect for now). In the near future, Status users will be able to have group chats where most of the participants are DApp chatbots. All DApp developers will benefit from this synergy, because a common chat interface for multiple DApps makes using your specific DApp more convenient, and effectively makes your DApp more powerful by giving it access to potentially far wider and more powerful network effects.

In this guide, we’ll explore how you can use the Status API to develop your DApp and create custom commands for your users that will work in a beautifully-intuitive, mobile context. As a result of developing on Status, you’ll have a DApp that your users can access on MetaMask, Mist, and Status. It's really worth emphasising that using Status brings with it access to mobile users with native mobile commands. With little extra developer time invested, you’ll gain a mobile DApp.

# Quickstart

If you already have a DApp with a web interface, then this will be the quickest Quickstart ever (trademark pending). Simply open Status, navigate to Console, hit the `@browse` command and type in the url where your DApp is running.

Voila! Users in Status can already see your DApp and interact with it (on the Ropsten Test Network). Make some mobile optimizations of your own and you're away. That is the power of decentralized, web3 technologies. Awesome, right?

OK, but what if `(a)` I don't have a DApp but want to learn how to build one on Status, or `(b)` I want to use this awesome API to make the most of an awesome, native mobile UX, or `(c)` I know what I'm doing and want to create fully decentralized, chatbot functionality for my DApp?

# Examples

At Status, we eat our own dogfood! All commands within Status are written with our API, take a look at the [status-react/resources/js/bots](https://github.com/status-im/status-react/tree/develop/resources/js/bots) directory for examples.