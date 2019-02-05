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
| selection-screen   | items :vector, on-select :event, render :view, title :string, extractor-key :keyword  |
| log                | value :string              |
| arithmetic         | values :vector, operatation {:one-of #{:plus :minus :times :divide}}, on-result :event  |
| json/parse         | value :string, on-result :event |
| json/stringify     | value :string, on-result :event |
| store/put          | key :string, value :string |
| store/append       | key :string, value :any |
| store/clear        | key :string               |
| store/clear-all    | n/a
| store/put          | key :string, value :any |
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
| ipfs/cat          | hash :string, on-success :event, on-failure? :event  |
| ipfs/add          | value :string, on-success  :event, on-failure? :event  |
| ethereum/transaction-receipt  | value :string, on-success :event, on-failure? :event  |
| ethereum/await-transaction-receipt  | value :string, interval :number, on-success :event, on-failure? :event  |
| ethereum/sign     | message? :string, data? :string, on-success :event, on-failure? :event  |
| ethereum/create-address | on-result :event  |
| ethereum/send-transaction          | to :string, gas? :string, gas-price? :string, value? :string, method? :string, params? :vector, nonce? :string, on-success  :event, on-failure? :event |
| ethereum/call          | to :string, method :string, params? :vector, outputs? :vector, on-success  :event, on-failure? :event |
| ethereum/logs          | from? :string, to? :string, address? :vector, topics? :vector, block-hash? :string, on-success  :event, on-failure? :event |
| ethereum/create-filter | type {:one-of #{:filter :block :pending-transaction}}, from? :string, to? :string, address? :vector, topics? :vector, block-hash? :string, on-success :event, on-failure? :event  |
| ethereum/logs-changes  | id :string  |
| ethereum/cancel-filter | ethereum/cancel-filter  |
| ethereum.ens/resolve          | name :string, on-success  :event, on-failure? :event  |
| ethereum.erc20/total-supply | contract :string,  on-success :event, on-failure? :event  |
| ethereum.erc20/balance-of | contract :string, token-owner :string, on-success :event, on-failure? :event  |
| ethereum.erc20/transfer | contract :string, to :string, value :number, on-success :event, on-failure? :event  |
| ethereum.erc20/transfer-from | contract :string, to :string, from :string, value :number, on-success :event, on-failure? :event  |
| ethereum.erc20/approve | contract :string, spender :string, value :number, on-success :event, on-failure? :event  |
| ethereum.erc20/allowance | contract :string, token-owner :string, spender :string, on-success :event, on-failure? :event  |
| ethereum.erc721/owner-of | contract :string, token-id :string, on-success :event, on-failure? :event  |
| ethereum.erc721/is-approved-for-all | contract :string, owner :string, operator :string, on-success :event, on-failure? :event  |
| ethereum.erc721/get-approved | contract :string, token-id :string, on-success :event, on-failure? :event  |
| ethereum.erc721/set-approval-for-all | contract :string, operator :string, approved :boolean, on-success :event, on-failure? :event  |
| ethereum.erc721/safe-transfer-from | contract :string, :from :string, to :string, token-id :string, data? :string, on-success :event, on-failure? :event  |

Example usage:

```clojure
[button {:on-click [store/put]}]
```