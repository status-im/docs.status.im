---
id: tutorial_wallet_settings
title: Extensions Tutorial - Wallet Settings
---

This tutorial will go step by step through the creation and deployment of a [wallets setting](wallet_settings.html) allowing to interact with a smart contract.

# Add meta data

First step is to create the skeleton extension with some relevant metadata:

```clojure
{meta
 {:name          "Hello wallet settings"
  :description   ""
  :documentation ""}}
```

# Define entry point

In this tutorial a wallet settings is created: it's specific id is `hello` and the generic hook type for wallet settings is `wallet.settings`.

# Label

```clojure
{hooks/wallet.settings.hello
 {...
  :label "Settings label"}}
```

# on-click

When clicked, the wallet settings will execute .

```clojure
{hooks/wallet.settings.hello
 {...
  :on-click [load-rates]}}
```

# view

```clojure
{views/view
 [text "Hello"]
  
 hooks/chat.command.dtwitter
 {...
  :view [view]}}
```

# Full extension code

```clojure
{meta {:name          "DTwitter"
       :description   "Access DTwitter posts"
       :documentation "Commands to interract with DTwitter."}
 
 views/settings-view
 []

 events/preload
 (let [{{id :id} :params} properties]
   )
 
 hooks/wallet.settings
 {:label    "Hello"
  :view     [settings-view]
  :on-click [preload]}}
```