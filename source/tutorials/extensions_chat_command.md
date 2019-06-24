---
id: extensions_chat_command
title: Extensions Tutorial - Chat Command
---

# Extensions Tutorial - Chat Command

This tutorial will go step by step through the creation and deployment of a [chat command](../extensions/extension_types.html) allowing to interact with a smart contract.

# Add meta data

First step is to create the skeleton extension with some relevant metadata:

```clojure
{meta
 {:name          "DTwitter"
  :description   "Vote for DTwitts"
  :documentation ""}}
```

# Define entry point

In this tutorial a chat command is created: it's specific id is `dtwitter` and the generic hook type for a chat command is `chat.command`.

# Scope

This chat command will be available for `personal-chats`.

```clojure
{hooks/chat.command.dtwitter
 {...
  :scope #{:personal-chats}} ;; Could be #{:personal-chats :group-chats}
```

# Parameters

The DTwitter chat command has 1 required parameters: the post id, of type text.

```clojure
{hooks/chat.command.dtwitter
 {...
  :parameters    [{:id          :id
                   :type        :text
                   :placeholder "Vote id"}]}}
```

# on-send

When executed, the chat command will load the DTwitt details from the contract then IPFS. Those details will be stored in the extension local store.

```clojure
:on-send       [load-dtwitt]
```

The `posts(uint256)` method is called to retrieve the post details. The encapsulated IPFS hash is then used to retrieve the post content.

```
events/put-dtwitt
(let [{result :result} properties]
  [store/put {:key "dtwitt" :value result}])
events/load-dtwitt
(let [{{id :id} :params} properties]
  [ethereum/call {:to "0x255ee755f4b88350ec6ddea5d193b11634dc7b95" :method "posts(uint256)" :params [id] :on-result [put-dtwitt]}])
```
Here, we're calling a contract at a specfic address on Ethereum, targeting a specific method, to which we pass the `id` as a param and then we specify what we expect to happen on the result, which is the `put-dtwitt` event.

# Previews 

Our short preview definition is a simple text element:

```
 (let [{{{id :id} :params} :content} properties]
  [text "Vote for ${id}"])
```

Our preview definition displays some details about a dtwitt and allows to upvote it via a button:

```
 (let [{{params :params} :content
        outgoing :outgoing timestamp-str :timestamp-str} properties
       {description :description} [store/get {:key "dtwitt"}]]
   [view {:style {:flex-direction :column
                  :align-items    :flex-start}}
    [text description]
    [button {:on-click [vote-dtwitt]}
     "Upvote"]])
```

# Full extension code

```
{meta {:name          "DTwitter"
       :description   "Access DTwitter posts"
       :documentation "Commands to interract with DTwitter."}

 events/vote-dtwitt
 (let [{id :id} properties]
   [ethereum/send-transaction {:to "0x255ee755f4b88350ec6ddea5d193b11634dc7b95" :method "vote(uint256,uint8)" :params [id 1]}])
 
 views/preview
 (let [{{params :params} :content
        outgoing :outgoing timestamp-str :timestamp-str} properties
       {description :description} [store/get {:key "dtwitt"}]]
   [view {:style {:flex-direction :column
                  :align-items    :flex-start}}
    [text description]
    [button {:on-click [vote-dtwitt]}
     "Upvote"]])

 views/short-preview
 (let [{{{id :id} :params} :content} properties]
  [text "Vote for ${id}"])
 
 events/put-dtwitt
 (let [{result :result} properties]
   [store/put {:key "dtwitt" :value result}])
 
 events/load-dtwitt
 (let [{{id :id} :params} properties]
   [ethereum/call {:to "0x255ee755f4b88350ec6ddea5d193b11634dc7b95" :method "posts(uint256)" :params [id] :on-result [put-dtwitt]}])
 
 hooks/chat.command.dtwitter
 {:description   "DTwitter vote"
  :scope         #{:personal-chats}
  :preview       [preview]
  :short-preview [short-preview]
  :on-send       [load-dtwitt]
  :parameters    [{:id          :vote-id
                   :type        :text
                   :placeholder "Vote id"}]}}
```
