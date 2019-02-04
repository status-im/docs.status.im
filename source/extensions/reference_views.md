---
id: reference_views
title: Extension Reference - Views
---

# Views in Extensions

A view is composed of a set of nested components. A component is defined by a name and an optional map of properties.

# Components

| Symbol             | Properties              |
| -------------      | -------------           |
| view               | style                   |
| scroll-view        | style, keyboard-should-persist-taps :keyword, content-container-style :map  |
| keyboard-avoiding-view | style               |
| text               | style                   |
| touchable-opacity  | style, on-press :event  |
| icon              | style, key :keyword, color :keyword      |
| image              | style, uri :string      |
| input              | style, on-press :event, placeholder :string  |
| button             | style, on-click :event  |
| link               | style, uri :string  |
| list               | style, data :vector, item-view :view, key? :keyword  |
| checkbox           | style, on-change :event, checked :boolean  |
| activity-indicator           | style, animating :boolean, color: string, size :keyword  |
| picker           | style, on-change :event, selected :string, enabled :boolean, data :vector  |
| nft-token-viewer   | style, token :string    |
| transaction-status | style, outgoing :string, tx-hash :string  |

Example usage:

```clojure
[view {:style {:background-color "red"}}
  [checkbox {:checked true}]]
```
