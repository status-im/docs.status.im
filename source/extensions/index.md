---
id: index
title: Status Extensions
---

# Status Extensions

 _DISCLAIMER_ Extensions are alpha quality and offered for the brave to play with. Feedback is always encouraged, reach us on #status-core-dapps public channel.

## What are extensions?

Extensions are a tool for developers to integrate DApp functionality with Status in a native way.

With the [building blocks](https://status.im/extensions/key_concepts.html) provided, a developer can re-use Status features for their own purposes. 

### Not a language

Extensions are not a programming language—they contain no traditional logic.

The best analogy is HTML: declarative, extensions offer a template for presenting  information to a user.

### Data-based

Extensions are purely data-based and are defined using the [EDN format](https://github.com/edn-format/edn).

Similar to JSON, _edn is a system for the conveyence of values_. It provides a syntax for creating "logic" and utilizing information in this declarative template. 

This data format enables Status to dynamically inspect an extension and its requirements before installation by the user. 

### Platform agnostic

Because they are data-based, extensions can be easily consumed by any program. 

Without any special effort by the developer, they run on both mobile and desktop.

### Decentralized and Permissionless

Once deployed to a storage system like [IPFS](https://ipfs.io/), an extension can be accessed by anyone, anywhere.

Status does not whitelist particular extensions, nor does it limit their creation or distribution in any way.


### Determined by Status

Although extensions are permissionless in nature and allow developers freedom to customize Status features, the available feature set is limited.

Status determines potential [extension points](https://status.im/extensions/extension_types.html) via hooks, and these hooks provide a sandbox for developers to work within.


### Private and Secure

Before a user installs an extension, Status will present information about the data and permissions requested by the developer.

If an extension requires permission to access a user's data—e.g. contact code or wallet address—it can execute an event(link) to request from the user.

Users maintain complete control over their data and are able to revoke permissions at any time.



