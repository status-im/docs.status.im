# Extension types

Extension types are determined by the available [hooks](https://dev-docs.status.im/extensions/concept_hook.html).

The first hook supported by Status is the chat command.



### Chat Commands

#### Identifiers

The root identifier for any chat command is `hooks/commands`. Use this to build a chat command extension.

Each extension also requires a unique identifier, e.g. `hooks/commands.collectible`.

In the case of a chat command, the unique identifier is what a user is required to type (e.g. `/collectible`) in order to execute a command within a chat.

This unique ID must be _unique from all other command IDs_. It is recommended to use the DApp or company's name in the ID to ensure this.

#### Properties

Once declared, a chat command requires the following properties to be mapped:

- Scope
- Description
- Preview
- Short preview
- Parameters
- _Optional_: `on-send` and `on-receive`

This is declared like so:

```
hooks/command.collectible
{:description    "Send collectible"
:scope            #{:personal-chats}
:preview          [collectible-preview]
:short-preview    [collectible-short-preview]
:on-send          [send-collectible]
:parameters       [{:id            :id
                    :type          :text
                    :placeholder   "Collectible name"}]}
```

##### Scope

A chat command can be executed within any combination of the following scopes:

- `personal-chat`: a 1-1 chat between users
- `group-chats`: a private chat between multiple users
- `public-chats`: a public chat open to any user

##### Description

The description is a short phrase exposed in the interface after the unique identifier, e.g. `Send collectible`.

A user sees: 

```
/collectible Send collectible
```

##### Preview

The preview is a `view` that a user sees as the result of a command's execution within a chat. It is declared with `views/[name-of-my-preview]`.

A developer can customize previews using the syntax described for defining a view.

Previews also come with an injected payload, accessible via a `properties` symbol:

```
{:incoming-group false
 :message-id 0x..
 :last? true
 :current-public-key 0x...
 :content {:command-path [collectible #{:personal-chats}]
           :params {:collectible-id    "CK"}}
 :display-photo? false
 :last-in-group? true
 :datemark today
 :show? true
 :message-type :user-message
 :clock-value 154020773584601
 :user-statuses {0x... {:chat-id ..., :message-id 0x..., :whisper-identity 0x..., :status :sending}}
 :first-in-group? true,
 :from 0x...
 :timestamp-str 1:28 PM
 :group-chat false
 :chat-id 0x...
 :content-type command
 :modal? false
 :last-outgoing? true
 :appearing? true
 :timestamp 1540207735840
 :display-username? false
 :outgoing true}
 ```


##### Short preview

The short preview is a `view` that a user sees on the chat screen when the last message in a given item is a chat command. It is declared with `views/[name-of-my-short-preview]`.

A developer can customize short previews using the syntax described for defining a view.

Short previews also come with an injected payload, accessible via a `properties` symbol:

```
{:message-id 0x..., 
 :content {:command-path [collectible #{:personal-chats}]
           :params {:collectible-id    "CK"}}
 :show? true
 :message-type :user-message
 :clock-value 154020622416101
 :from 0x...
 :chat-id 0x...
 :content-type command
 :appearing? true
 :timestamp 1540206224139
 :outgoing true}
 ```

##### Parameters

Parameters prompt the user to make selections or input data.

They are identified by an `id` and must define an input `type` as well as some `placeholder` text for the user.

They can optionally include `suggestions` to cue the user with additional UI components.

Declare parameters like this:

```
:parameters   [{:id            :collectible-id
                :type          :text
                :suggestions   [user-collectibles]
                :placeholder   "Collectible name"}]
```

This example allows a user to select between their various collectibles, either by typing in the "Collectible name" or using the UI's suggestions.

##### on-send and on-receive

`on-send` and `on-receive` allow a command to fire events when a message is sent or received.

In the collectible example, `on-send` creates a transaction to move the collectible from user A's wallet to user B's wallet.

`on-send` and `on-receive` both come with the injected payload:

```
{:chat-id 0x...     
 :content-type command
 :content {:command-path [collectible #{:personal-chats}]
           :params {:collectible-id    "CK"}}}
```