# Chat command hook

A `chat command` hook requires the following properties to be set:

* `description`
* `scope`
* `preview` and `short-preview`
* `parameters`
* optionally `on-send` and `on-receive`

## Scope

Scope can be any combination of:

* personal-chats
* group-chats (not currently functioning; will be implemented)
* public-chats

Here we will demonstrate `personal-chats`.

```clojure
{hooks/commands.collectible
 {...
  :scope #{:personal-chats}} ;; Could be #{:personal-chats :public-chats}
```

## Previews 

`Previews` are used to display the result of a command execution in a chat. 

`Short previews` will be displayed as last message in the chat item of the Home tab of Status.

Previews receive data from status encapsulating the parameters provided by the end user and some relevant contextual information.

Short previews will get injected payload of the following form:

```clojure
{:message-id 0x..., 
 :content {:command-path [dtwitter #{:personal-chats}]
           :params {:symbol 0}}
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

Previews will get injected payload of the following form:

```clojure
{:incoming-group false
 :message-id 0x..
 :last? true
 :current-public-key 0x...
 :content {:command-path [dtwitter #{:personal-chats}]
           :params {:symbol 0}}
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

## Parameters

A parameter is identified by its `id` and must define a `type` and a `placeholder` (any string).
In this tutorial `:text` and `:number` will be used.
`suggestions` can be optionally provided and must point to a `view`. 

```clojure
{hooks/commands.collectible
 {...
  :parameters    [{:id          :symbol
                   :type        :text
                   :placeholder "Parameter"
                   :suggestions status/asset-selector}]}}
```

## on-send and on-receive

`on-send` and `on-receive` allow to fire events when a command message will respectively be sent or received.

Both will get injected payload of the following form:

```clojure
{:chat-id 0x...     
 :content-type command
 :content {:command-path [dtwitter #{:personal-chats}]
           :params {:symbol 0}}}
```

# Chat command hello world


```clojure
{meta
 {:name          "Hello world"
  :description   ""
  :documentation ""}

 views/preview
 [text "This is a preview"]

 views/short-preview
 [text "This is a short preview"]

hooks/commands.collectible
{:description   "Hello world command"
 :scope         #{:personal-chats}
 :preview       preview
 :short-preview short-preview
 :on-send       [alert {:value "Command executed!"}]
 :parameters   
 [{:id          :symbol
   :type        :text
   :placeholder "First argument"}]}}
```
