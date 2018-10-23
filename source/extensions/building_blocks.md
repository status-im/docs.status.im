# Hooks

The only hook available currently is the [chat command](chat_command) hook.

# Components

| Symbol             | Properties              |
| -------------      | -------------           |
| view               | style                   |
| text               | style                   |
| touchable-opacity  | style, on-press :event  |
| image              | style, uri :string      |
| input              | style, on-press :event, placeholder :string  |
| button             | style, on-click :event  |
| link               | style, uri :string  |
| checkbox           | style, on-change :event, checked: boolean  |

# Events

| Symbol             | Arguments                  |
| -------------      | -------------              |
| alert              | value :string              |
| log                | value :string              |
| store/put          | key :string, value :string |
| store/append       | key :string, value :string |
| store/clear        | key :string,               |
| store/put          | key :string, value :string |
| http/get           | url :string, timeout? :string, on-success :event, on-failure? :event |
| http/post          | url :string, body :string, timeout? :string, on-success :event, on-failure? :event |
| ipfs/cat          | hash :string, on-success :event, on-failure? :event |
| ethereum/send-transaction          | to :string, gas? :string, gas-price? :string, value? :string, method? :string, params? :vector, nonce? :string, on-result? :event |
| ethereum/call          | to :string, method? :string, params? :vector, on-result? :event |

# Queries

| Symbol             | Arguments               |
| -------------      | -------------           |
| store/get          | key :string             |