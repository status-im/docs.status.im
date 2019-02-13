---
id: syntax
title: Extensions Syntax
---

# Speak The Language

Extensions are implemented using the EDN format. EDN is similar to JSON, but it is extensible and has additional data types.

## EDN syntax

EDN extends JSON by introducing syntax for extra data structures. Those can be leveraged to combine primitives in an elegant way.

The main elements of this syntax are:

* Maps     `{}`
* Vectors  `[]`
* Symbols  `symbol`, with namespace: `namespace/symbol`
* Keywords `:keyword`

In practice:

```clojure
{hooks/commands.id
 {:description "Some string"
  :on-send     [event {:keyword "value"}]}
```

## Hook syntax

Each [hook type](https://status.im/extensions/extension_types.html) requires specific details to be mapped and declared according to the hook's specifications. 

To learn about the available hooks and their specifications, see [extension types](https://status.im/extensions/extension_types.html).

This map is associated to a unique identifier, which follows the hook's root identifier.

For example:

```clojure
{hooks/command.example-command
 {:description "Some description"
  ...}}
```

`hooks/command` is the root identifier for any chat command extension.

`.example-command` is the unique identifier for this particular command and extension. 

The unique ID should be specific to a DApp or company. A user may only have one instance of a unique ID installed. 

If the unique ID is _not_ unique, it will not be operable for some users.

## View syntax

Views are used to define the UI components of an extension. 

The syntax follows the [Hiccup format](https://github.com/weavejester/hiccup/wiki/Syntax)) and is semantically similar to HTML. 

It makes it possible to declare UI in EDN as a tree of components.

```clojure
[view
 [text "Hello"]
 [text {:style {:color "red"}} "World"]]
```

See the list of available [view components](https://status.im/extensions/reference_views.html).

## Blocks

[Hiccup syntax](https://github.com/weavejester/hiccup/wiki/Syntax) is extended to provide templating features.

### let blocks

The `let block` allows local variables to be used as `symbols` in a Hiccup tree.

```
(let [world "World"]
  [view
   [text "Hello"]
   [text world]])
```

Views can access arguments input by the user. These will be injected by the `hook` using a `properties` symbol.

```
(let [world properties]
  [view
   [text "Hello"]
   [text world]])
```

A destructuring syntax makes it possible to select a subset of data from a complex map, e.g. one provided by the `properties` symbol.

```
(let [{{name :name} :value} {:value {:name "John"}}]
  [view
   [text "Hello"]
   [text name]])
```

### if/when blocks

`if blocks` allow view trees to be rendered _conditionally_ based on the value of a variable.

```clojure
(let [some-cond true]
  (if some-cond
    [text "True"]
    [text "False"]))
```

`when blocks` make it possible to render multiple view components _when_ a variable is true.

```clojure
(let [some-cond true]
  (when some-cond
    [text "One"]
    [text "Two"]
    [text "Three"]))
```

### for blocks

`for blocks` allow multiple view components to be generated based on a vector variable.

```clojure
[view
 (let [some-vector ["John" "Bob"]]
  (for [name some-vector]
   [text name]
   [text name]
   [text name]))]
```

## Query syntax

Queries allow a view to access data exposed by Status. 

Any change to the data accessed by a query will be reflected instantly in the UI. The user-facing view renders dynamically.

A query must be defined in a `let block` using the following syntax: `[name arguments]`, where `name` is a symbol pointing to an existing query, and `arguments` is an optional map of arguments.

```clojure
(let [name [store/get {:key "name"}]]
  [text name])
```

## Event syntax

Events allow Status to interact with external services. 

This is the only way for an extension to interact with the external world and also modify the local state. 

Triggering an event that modifies the local state may in turn re-render the UI if matching queries exist.

```clojure
[button {:on-click [store/put {:key "name" :value {:key "value"}}]}
 "Click me !"]
```

### Local events

Local events define `let blocks` that can destructure arguments, allowing a developer to access relevant information.

```clojure
(let [{name :name} properties]
  [button {:on-click [store/put {:key "name" :value {:key name}}]}
   "Click me !"])
```