---
id: reference_events
title: Extension Reference - Events
---

# Events in Extensions

An event is defined by a name and an optional map of arguments.

# Events

| Symbol             | Arguments                  |
| -------------      | -------------              |
| alert              | value :string              |
| log                | value :string              |
| json/parse          | value :string, on-result :event |
| json/stringify          | value :string, on-result :event |
| store/put          | key :string, value :string |
| store/append       | key :string, value :string |
| store/clear        | key :string,               |
| store/put          | key :string, value :string |
| store/puts         | value :vector |
| chat.command/set-parameter         | value :any |
| chat.command/set-parameter-with-custom-params         | value :string, params :map |
| chat.command/set-custom-parameter         | key :keyword, value :any |
| chat.command/send-plaintext-message         | value :string |
| chat.command/send-message         | params :map |
| schedule/start         | interval :number, on-created :event, on-result :event |
| schedule/cancel         | value :number |
| http/get           | url :string, timeout? :string, on-success :event, on-failure? :event |
| http/post          | url :string, body :string, timeout? :string, on-success :event, on-failure? :event |
| ipfs/cat          | hash :string, on-success :event, on-failure? :event |
| ethereum/send-transaction          | to :string, gas? :string, gas-price? :string, value? :string, method? :string, params? :vector, nonce? :string, on-result? :event |
| ethereum/call          | to :string, method? :string, params? :vector, on-result? :event |
| ethereum/logs          | fromBlock? :string, toBlock? :string, address? :vector, topics? :vector, blockhash? :string, on-result  :event |
| ethereum/resolve-ens          | name :string, on-result :event |

Example usage:

```clojure
[button {:on-click [store/put]}]
```
