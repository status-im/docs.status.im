---
id: extensions_tutorial_chat_command
title: Extension chat command tutorial
---

# Write a chat command

One of the main use case for extensions is to add new chat commands. This tutorial will go step by step through the creation and deployment of a chat command allowing to send NFTs.

## Add meta data

First step is to create the skeleton extension with some relevant metadata:

```clojure
{meta {:name          "My command name"
       :description   "My command description"
       :documentation "Some more details can go there"}}
```

Metadata will be displayed to the end user before installing an extension.

## Define hook entry point (chat command)

Hooks identify what part of status will be extended. Each hook has a unique identifier and a set of key/value elements specific to this hook.
An extension can implement several hooks.

In this tutorial a chat command is created: it's specific id is `collectible` and the generic hook type for a chat command is `commands`.

A `command` hook requires the following properties to be set:

* scope
* preview and short-preview
* parameters

### Scope

Scope can be any combination of:

* personal-chats
* group-chats
* public-chats

Here we will demonstrate `personal-chats`.

```clojure
{hooks/commands.collectible
 {...
  :scope #{:personal-chats}} ;; Could be #{:personal-chats :group-chats}
```

### Previews 

`Previews` are used to display the result of a command execution in a chat. 

`Short previews` will be displayed as last message in the chat item of the Home tab of Status.

Both previews must point to definition of UI in [Hiccup syntax](https://github.com/weavejester/hiccup/wiki/Syntax) using a combination of views, queries and events supported by status host.

More details can be found [here](https://status-im.github.io/pluto/docs/concepts/Anatomy.html).

Previews receive data from status encapsulating the parameters provided by the end user and some relevant contextual information. Those can be accessed in a view using the `properties` reference.

Our short preview definition:

```clojure
{views/short-preview
 (let [{{{symbol :symbol} :params} :content outgoing :outgoing} properties]
   [view {:flex-direction :row
          :align-items    :flex-start}
     [text (if outgoing "Sent " "Received ")]
     [text symbol]])}
```

`properties` data is accessed using [destructuring](https://status-im.github.io/pluto/docs/concepts/View.html#destructuring).
`text` and `view` are view elements available for all hosts.
`if` is a block providing conditional logic.

Our preview definition:

```clojure
{views/preview
 (let [{{{symbol :symbol token :token tx-hash :tx-hash} :params} :content outgoing :outgoing timestamp-str :timestamp-str} properties
        collectible-token [get-collectible-token {:symbol symbol :token token}]
    [view {:flex-direction :column
           :align-items    :flex-start}
    [status/nft-token collectible-token]
    [view {:color          (if outgoing "#707caf" "#939ba1")
           :margin-top     6
           :font-size      12
           :flex-direction :row}
    [text "Sent at "]
    [text timestamp-str]]
    [status/send-status {:tx-hash tx-hash :outgoing outgoing}]])}
```

`status/nft-token` and `status/send-status` are view element specific to status.
`[status/get-collectible-token {:symbol symbol :token token}]` is a query giving access to details for a specific collectible.

### Parameters

The NFT chat command has 2 required parameters: the NFT type and the specific NFT you want to exchange.
Both will use Status UI components to provide a nice visual selection experience.

A parameter is identified by its `id` and must define a `type` and a `placeholder` (any string).
In this tutorial `:text` and `:number` will be used.
`suggestions` can be optionally provided and must point to a `view`. 

```clojure
{hooks/commands.collectible
 {...
  :parameters    [{:id          :symbol
                   :type        :text
                   :placeholder "Collectible symbol"
                   :suggestions status/asset-selector}
                  {:id          :token
                   :type        :number
                   :placeholder "Collectible token"
                   :suggestions status/token-selector}]}}
```

## Deploy

Extensions are identified by a URI and can be loaded in status via a universal link.

Currently only GitHub gist is supported as provider.

A universal link pointing to an extension would then look like: `https://get.status.im/extension/gist@janherich/92747e730b2e115bcbe145114d024e66`

## Use

The simplest option is to scan a QR code pointing to your extension. You can also navigate to status user profile and open the `Extensions` item in the `Advanced` section.
This option is only available in developer mode.

![alt-text](assets/extensions/profile.jpg)

![alt-text](assets/extensions/add.jpg)

Once loaded, details about an extension are available.

![alt-text](assets/extensions/install.jpg)

An extension can then be installed. Once installed all hooks are `active`.

Any extension can then be `deactivated` or re-`activated`. Associated hooks will then be removed/added from Status.

![alt-text](assets/extensions/list.jpg)

You can now use your new extension from within a 1-1 chat.

![alt-text](assets/extensions/collectible-type.jpg)

![alt-text](assets/extensions/collectible-token.jpg)

![alt-text](assets/extensions/collectible-preview.jpg)

## Full extension code


```clojure
{meta {:name          "Collectibles"
       :description   "Demonstration of collectible command"
       :documentation "Some nice documentation"}

 views/preview
 (let [{{{symbol :symbol token :token tx-hash :tx-hash} :params} :content outgoing :outgoing timestamp-str :timestamp-str} properties
        collectible-token [get-collectible-token {:symbol symbol :token token}]
    [view {:flex-direction :column
           :align-items    :flex-start}
    [status/nft-token collectible-token]
    [view {:color          (if outgoing "#707caf" "#939ba1")
           :margin-top     6
           :font-size      12
           :flex-direction :row}
    [text "Sent at "]
    [text timestamp-str]]
    [status/send-status {:tx-hash tx-hash :outgoing outgoing}]])

 views/short-preview
 (let [{{{symbol :symbol} :params} :content outgoing :outgoing} properties]
   [view {:flex-direction :row
          :align-items    :flex-start}
     [text (if outgoing "Sent " "Received ")]
     [text symbol]])

hooks/commands.collectible
{:scope         #{:personal-chats}
 :preview       preview
 :short-preview short-preview
 :parameters    [{:id          :symbol
                  :type        :text
                  :placeholder "Collectible symbol"
                  :suggestions status/asset-selector}
                 {:id          :token
                  :type        :number
                  :placeholder "Collectible token"
                  :suggestions status/token-selector}]}}
```
