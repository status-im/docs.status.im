---
id: extension_types
title: Extension Types
---

Extension types are determined by the available hooks.

The first hooks supported by Status are `chat command` and `wallet settings`.

# Chat Command

## Identifiers

The root identifier for any chat command is `hooks/chat.command`. Use this to build a chat command extension.

Each extension also requires a unique identifier, e.g. `hooks/chat.command.collectible`.

In the case of a chat command, the unique identifier is what a user is required to type (e.g. `/collectible`) in order to execute a command within a chat.

This unique ID must be _unique from all other command IDs_. It is recommended to use the DApp or company's name in the ID to ensure this.

## Properties

Once declared, a chat command requires the following properties to be mapped:

- Scope
- Description
- Preview
- Short preview
- Parameters
- _Optional_: `on-send`, `on-send-sync` and `on-receive`

This is declared like so:

```
hooks/chat.command.collectible
{:description   "Send collectible"
 :scope         #{:personal-chats}
 :preview       [collectible-preview]
 :short-preview [collectible-short-preview]
 :on-send       [send-collectible]
 :parameters
 [{:id          :id
   :type        :text
   :placeholder "Collectible name"}]}
```

## Scope

A chat command can be executed within any combination of the following scopes:

- `personal-chat`: a 1-1 chat between users
- `group-chats`: a private chat between multiple users
- `public-chats`: a public chat open to any user

## Description

The description is a short phrase exposed in the interface after the unique identifier, e.g. `Send collectible`.

A user sees: 

```
/collectible Send collectible
```

## Preview

The preview is a `view` that a user sees as the result of a command's execution within a chat. It is declared with `views/[name-of-my-preview]`.

A developer can customize previews using the syntax described for defining a view.

Previews also come with an injected payload, accessible via a `properties` symbol:

```
{:incoming-group     false
 :message-id         "0x.."
 :last?              true
 :current-public-key "0x..."
 :content
 {:command-path [collectible #{:personal-chats}]
  :params       {:collectible-id "CK"}}
 :display-photo?     false
 :last-in-group?     true
 :datemark           "today"
 :show?              true
 :message-type       :user-message
 :clock-value        154020773584601
 :user-statuses      {0x... {:chat-id ..., :message-id 0x..., :whisper-identity 0x..., :status :sending}}
 :first-in-group?    true
 :from               "0x..."
 :timestamp-str      "1:28 PM"
 :group-chat         false
 :chat-id            "0x..."
 :content-type       "command"
 :modal?             false
 :last-outgoing?     true
 :appearing?         true
 :timestamp          1540207735840
 :display-username?  false
 :outgoing           true}
```

 Depending on the chat type the payload also contains `contact` details:

```
{:contact  ""   ;; in 1-1 chats
 :contacts [""] ;; in private group chats
 ...}
```

## Short preview

The short preview is a `view` that a user sees on the chat screen when the last message in a given item is a chat command. It is declared with `views/[name-of-my-short-preview]`.

A developer can customize short previews using the syntax described for defining a view.

Short previews also come with an injected payload, accessible via a `properties` symbol:

```
{:message-id   "0x..." 
 :content
 {:command-path [collectible #{:personal-chats}]
  :params      {:collectible-id "CK"}}
 :show?        true
 :message-type :user-message
 :clock-value  154020622416101
 :from         "0x..."
 :chat-id      "0x..."
 :content-type "command"
 :appearing?   true
 :timestamp    1540206224139
 :outgoing     true}
```

 Depending on the chat type the payload also contains `contact` details:

```
{:contact  ""   ;; in 1-1 chats
 :contacts [""] ;; in private group chats
 ...}
```

## Parameters

Parameters prompt the user to make selections or input data.

They are identified by an `id` and must define an input `type` as well as some `placeholder` text for the user.

They can optionally include `suggestions` to cue the user with additional UI components.

Declare parameters like this:

```
:parameters
[{:id          :collectible-id
  :type        :text
  :placeholder "Collectible name"}]
```

This example allows a user to select between their various collectibles, either by typing in the "Collectible name" or using the UI's suggestions.

Type can be one of `:text`, `:phone`, `:password` or `:number`. The keyboard layout will be modified to reflect this value.

### Suggestions

A parameter can optionally include `suggestions` to cue the user with additional UI components.

```
:parameters
[{:id          :collectible-id
  :type        :text
  :suggestions [user-collectibles]
  :placeholder "Collectible name"}]
```

This example allows a user to select between their various collectibles, either by typing in the "Collectible name" or using the UI's suggestions.

To set the parameter value from a suggestion view, the `chat.command/set-parameter` event must be used. `chat.command/set-custom-parameter` can also be used to add extra parameters that will be accessible to all command messages recipients.

```
views/user-collectibles
[view
 [button {:on-click [chat.command/set-parameter {:value "value"}]}
  "Set parameter value"]
 [button {:on-click [chat.command/set-custom-parameter {:key :extra :value "value"}]}
  "Set custom parameter value"]]
```

## on-send and on-receive

`on-send` and `on-receive` allow a command to fire events when a message is sent or received.

In the collectible example, `on-send` creates a transaction to move the collectible from user A's wallet to user B's wallet.

`on-send` and `on-receive` both come with the injected payload:

```
{:chat-id      "0x..."
 :content-type "command"
 :content
 {:command-path [collectible #{:personal-chats}]
  :params       {:collectible-id "CK"}}}
```

## on-send-sync

`on-send-sync` allows a extension developer to programmatically control when the chat message will be sent. It is not automatically sent when the user hits the `send` button.
To send a message, use the `chat.command/send-message` or `chat.command/send-plain-text-message` events.

```
events/on-send-sync
(let [{{{title :title text :text} :params} :content} properties]
  [chat.command/send-plain-text-message {:value "*${title}*\n${text}\nhttps://people-ops.status.im/status-principles/"}])
```

Note that `on-send` is then ignored. Messages views still rely on `preview` and `short-preview`.

# Wallet settings

Wallet settings hook allow you to plug extra panels in the wallet. Those will be accessible via the wallet settings menu.

To implement a wallet settings you will need to provide the following properties:

* `label` the name that will be displayed in the wallet settings menu
* `view` the view that will be displayed fullscreen
* `on-open` an event triggered when the view is about to be opened
* `on-close` an event triggered when the view is about to be closed

```
views/view
[text "Hello"]
 
hooks/wallet.settings.hello
{:label    "Test wallet settings"
 :view     [view]
 :on-open  [open]
 :on-close [close]}
```

You can find a simple example [here](https://status-im.github.io/pluto/try.html?hash=QmYnUj7v3UiP6X1YfRuhea5mXpjTGG1KKnCwFS4TKzKTpD)
