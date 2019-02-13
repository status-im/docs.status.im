---
id: tutorial_wallet_settings
title: Extensions Tutorial - Wallet Settings
layout: tutorials
---
This tutorial will walk you through the creation and deployment of a new [wallet setting](wallet_settings.html).

# Add meta data

First step is to create the skeleton extension with some relevant metadata:

```
{meta
 {:name          "Hello wallet settings"
  :description   ""
  :documentation ""}}
```

# Define entry point

In this tutorial a wallet settings is created: it's specific id is `hello` and the generic hook type for wallet settings is `wallet.settings`.

# Label

```
{hooks/wallet.settings.hello
 {...
  :label "Settings label"}}
```

# on-click

When clicked, the optional wallet settings `on-click` event will be executed.

```
{hooks/wallet.settings.hello
 {...
  :on-click [load-rates]}}
```

# view

```
{views/view
 [text "Hello"]
  
 hooks/chat.command.dtwitter
 {...
  :view [view]}}
```

# Full extension code

```
{meta {:name          "Hello"
       :description   ""
       :documentation ""}
 
 views/settings-view
 []

 events/preload
 (let [{{id :id} :params} properties]
   )
 
 hooks/wallet.settings
 {:label   "Hello"
  :view    [settings-view]
  :on-open [preload]}}
```
