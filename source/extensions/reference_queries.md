---
id: reference_queries
title: Extension Reference - Queries
---

# Queries in Extensions

A query is defined by a name and an optional map of arguments.

# Queries

| Symbol             | Arguments               |
| -------------      | -------------           |
| store/get          | key :string             |
| wallet/balance     | token :string
| wallet/token          | token :string, amount? :number, amount-in-wei? :number             |
| wallet/tokens          | filter? :vector, visible? :boolean            |
| wallet/collectibles          | token :string, symbol :string            |

Example usage:

```clojure
(let [{name :name} [store/get {:key "some-key"}]]
  [text name])
```
