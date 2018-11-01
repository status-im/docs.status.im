---
title: Extensions Block
id: concept_block
---

# Extensions Block

## Let block

Let blocks provide lexical scope to all nested elements.
Associated bindings are key value pairs, with key either symbol or destructuring patterns.
Values can be primitive types or references to queries.

```clojure
(let [a 1
      {name :name} [status.user]]
  [view {}
   [text {}
    name]])
```

## Destructuring

### Sequential data structure

Extract seq elements by index
Elements can be ignored with `_`
`:as symbol` denotes the whole sequence

#### Examples

```clojure
[[a _ c :as all] [1 2 3 4 5]]
;; a = 1
;; c = 3
;; all = [1 2 3 4 5]
```

### Associative data structure

Extract map values by keys `{a :a}`
Optional values via `[a 5]`
No namespaced keyword support, no short syntax

#### Examples

```clojure
[{a :a a :b [c 4] :c :as all} {:a 1 :b 2 :d 3}]
;; a = 1
;; b = 2
;; c = 4
;; all = {:a 1 :b 2 :d 3}
```

#### Nesting

Both structure type destructuring can be combined 

```clojure
[{[a1 _ a3] :a {d :d #{f 7} :f [[_ g2] 8}] :b [_ e2] :e :all all}
 {:a [1 2 3] :b {:d 4 :e [5 6] :g [9 10]}}]
;; a1 = 1
;; a3 = 3
;; d = 4
;; e2 = 5
;; f = 7
;; g2 = 10
;; all = {:a [1 2 3] :b {:d 4 :e [5 6] :g [9 10]}}
```
