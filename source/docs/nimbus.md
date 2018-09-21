---
id: nimbus
title: Nimbus
---


## An Ethereum 2.0 Sharding Client 
Draft 2018-05-22


## OVERVIEW

Nimbus aims to be a [sharding](https://github.com/ethereum/wiki/wiki/Sharding-FAQ) client implementation for the Ethereum Blockchain Application Platform. Because the largest deployment of Ethereum will potentially be on embedded systems, Nimbus will be designed to perform well on IoT and personal mobile devices, including older smartphones with resource-restricted hardware. The extensible, configurable, and modular design of Nimbus will make it production ready for Web 3.0 and will ensure that it can be supported and maintained across all goals of Ethereum 2.0.


## GOALS


1.  Create an Ethereum implementation suitable for resource-restricted devices.
1.  Create an implementation team for the [Applied Research Objectives](https://hackmd.io/s/HkLkj55yb#objectives-in-applied-research) of [Ethereum Research](http://ethereumresearch.org/) (aka Ethereum Asia Pacific Limited), with focus on the following:
    1.  Proof of Stake (PoS)
    1.  Sharding
    1.  Stateless Clients
    1.  LES2
    1.  eWASM
1.  Close the gap between research modeling and production.
1.  Pledge to participate in, help implement, and conform to the [Ethereum Improvement Proposal](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md).
1.  Implement permissive licensing.
1.  Focus on production-ready [Web 3.0](https://medium.com/@matteozago/why-the-web-3-0-matters-and-you-should-know-about-it-a5851d63c949) Stack ([Whisper](https://github.com/ethereum/wiki/wiki/Whisper), [PSS](https://github.com/nolash/psstalk/blob/master/README.md), and [Swarm](https://swarm-guide.readthedocs.io/en/latest/introduction.html)) and its ongoing research and development.
1.  Focus on marketing and promotion to address community concerns on scalability and to bolster Ethereum's dominant mindshare.


## REQUIREMENTS

[Nim](https://nim-lang.org/) is an efficient, general-purpose systems programming language with a Python-like syntax that compiles to C. Nim will allow us to implement Ethereum rapidly and to take advantage of the mature C-language tooling: in compilation of machine code, and in the analysis of static code. 

With Ethereum research currently modeled in Python, the end result of implementing in Nim should be code that:

1.  Enables us to easily bring research into production
1.  Has a high degree of reasonability for researchers
1.  Is performant in production

The core contributors and Nim community have been very supportive and enthusiastic for the project.


## Development on Embedded Systems

We believe that the largest successful deployment of Ethereum will reside on embedded systems: IoT devices and mobile personal devices, such as smartphones. Although Nimbus will support archival nodes, its first implementation will be as a light client, with focus on Proof of Stake and sharding. 

Existing implementations of Ethereum have focused on desktop computers and servers. These implementations have played a major role in the initial success of Ethereum, and they are suitable for full and archival nodes. However, their deployment onto embedded systems has been an afterthought. 

In addition, throughout the development of Status, we have found that the dominant Ethereum implementations, Geth and Parity, are unsuitable for our target platform unless they are profiled and optimised (in progress).

During the deployment of Status among 40,000 alpha testers, we found that a significant portion (23.6%) of users were still running old mobile devices. In addition, recently discovered [Spectre vulnerabilities](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)) have led to an increase in the demand for open processors. For these reasons, we propose a self-imposed constraint and a requirement that Status perform well on the following:


1.  2014 [SoC](https://en.wikipedia.org/wiki/System_on_a_chip) architectures, such as the [Cortex-A53](https://developer.arm.com/products/processors/cortex-a/cortex-a53) (Samsung Note 4 & [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)) and the Apple A8 (iPhone 6)
1.  [MIPS](https://en.wikipedia.org/wiki/MIPS_architecture)-based architectures, such as the [Onion Omega2](https://onion.io/omega2/)
1.  Open-source processors, such as [RISC-V](https://en.wikipedia.org/wiki/RISC-V)

When the 2020 scalability goal is fully realised, this constraint will help ensure that Ethereum runs performantly on resource-restricted hardware that is at least 6 years old.

## Extensible, Configurable, and Modular Design

The application architecture should have modular abstractions for the following:

1.  Networking layer
1.  Sub-protocols
1.  Consensus
1.  Privacy
1.  Database
1.  Virtual Machine

In addition, the implementation must pass the [common tests for all Ethereum implementations](https://github.com/ethereum/tests).

## Commitment to Ethereum Improvement Proposals (EIP)

Nimbus is committed to open standards and to maintaining consensus with other Ethereum-compliant implementations. The development of Nimbus and the changes in its protocols will follow [the EIP process](https://github.com/ethereum/EIPs/).

## User Experience

Access to shards and mainchain state should be fast and responsive, the application binary should be lightweight in terms of the resources used, and the client should be dependable and robust against crashes.

## Licensing: MIT, Apache v2.0

We propose that Nimbus be licensed under Apache 2.0 and MIT. A permissive licensing structure with patent protection would 

1.  Ensure the compatibility with GPL 2.0 and LGPL 2.0
1.  Extend the reach of the Ethereum platform
1.  Foster the highest degree of adoption by governments and enterprise

One unsolved hurdle faced by Status is the [LGPLv3](https://opensource.org/licenses/LGPL-3.0) license, whose requirement for runtime linking is incompatible with major mobile app distribution channels, such as the App Store of Apple Inc.

Numerous requests for a static-linking exception have gone unanswered. This has blocked the deployment of any legally sound, full Ethereum client on popular channels for distribution of mobile devices. LGPL also prevents the adoption of Ethereum on closed hardware platforms, such as XBox. Still, we remain optimistic this issue will be rectified.

## Biweekly Development Reports, Technical Writing, and Promotion

In addition to the implementation, Nimbus will have a biweekly process for reporting development-related updates. A technical writer will document implementation efforts and translate ongoing research discussions into articles easily understood by the community.

Within the community at large, we will promote Ethereum as the leader of scalable public blockchains.

## Bounty-Based Development

To entice the community to accelerate the development, we will attach bounties to and **[publish](https://openbounty.status.im/app#/) **the tasks that can be self-contained and defined clearly.

## TEAM

In addition to a dedicated Nimbus team, Status as an organization will support development through our expertise in smart contracts, Ethereum and mobile development, and marketing and user experience research.

### Alex Mandel

Alex is a technical communicator with extensive experience in IT and biotechnology. He has honed his skills at several leading IT companies whose success is intimately tied to the quality of their documentation. Alex's passion is to present complex ideas with clarity, conciseness, and precision of the kind that inspires action. His interests include emerging, potentially disruptive technologies; he can't wait to see blockchain make the world a better place.

### Eugene Kabanov

Eugene has deep background and interest in systems programming, reverse engineering, development of high-load and high-performance networking services, and information security. He joined Nim community 3 years ago and has contributed to Nim networking, threading, and multiprocessing.

### [Jacek Sieka](https://www.linkedin.com/in/sieka/) 

With a keen interest and background in peer-to-peer applications and compilers, Jacek joined Status as Head of Research, coming most recently from the high-frequency trading world. Fun hobby projects from the past include DC++ (a file sharing app), nlvm (an llvm-based Nim compiler) and more!

### [Mamy Ratsimbazafy](https://www.linkedin.com/in/mamyratsimbazafy)

Mamy joined Status as a Nim developer in the research team. After a career in leading American and French banks and non-profits, he decided that tech, blockchain and AI will eat the world. On the side, instead of mining he is teaching deep learning tricks to his GPU.

### Ryan Lipscombe

Fascinated by the transformative potential of blockchain and distributed systems, Ryan joined Status research as a Nim developer. His career spans from data science to embedded systems and has been part of the Nim community since 2015, working on database components and virtual machines for evolutionary systems.


### Yuriy Glukhov

Yuriy has deep passion for new technologies and keen interest in many areas of IT. He was one of the first CTOs to successfully use Nim in a commercial project.


### [Zahary Karadjov](https://www.linkedin.com/in/zahary/)

Zahary is member of the core compiler team of the Nim programming language. He joined the project 5 years ago, hoping that one day Nim will surpass C++ in usage and popularity. His career started as a game engine developer, where he learned how to push the modern hardware to its limits, but eventually he went on to become the CTO of a company shipping an IoT device, a SaaS platform for web publishers and even a defunct Chromium fork.


## MILESTONES

Timelines are approximate and affected by research, implementation considerations, and revisions made while the team produces a detailed implementation timeline.


## Formation of the Team, and Detailed Project Implementation Timeline


### January - February 2018


### Completed:

1.  Form the initial team
1.  Define the project's scope, architecture, and implementation timelines

### Goals:


1.  Hire core contributors:
    1.  Five (5) full-time core contributors
    1.  Up to five (5) part-time core contributors
    1.  One (1) Technical Program Manager
    1.  One (1) Technical Writer
    1.  Up to ten (10) full-time core contributors by 2019
1.  Create a detailed timeline for implementing the project as a deliverable


## Compatibility with Ethereum 1.0


### January - November 2018

As an initial goal, we will focus on implementing all components required for interoperability with the Ethereum ecosystem. We will publish these components as independently reusable modules and libraries. 

However, before starting the implementation in Nim, we will develop an understanding of the existing implementations of Ethereum: [Go Ethereum](https://github.com/ethereum/go-ethereum/), [Pyethereum](https://github.com/ethereum/pyethereum), [Py-EVM](https://github.com/ethereum/py-evm), and [Parity](https://github.com/paritytech/parity).

The code will consist of independently reusable libraries that have the same permissive license as that of Nimbus itself:



1.  [RLP encoding and decoding](https://github.com/status-im/nim-rlp)
1.  [Handling of the state database and users' keyfiles](https://github.com/status-im/nim-eth-keyfile/blob/master/README.md)
1.  Connecting to the Ethereum network
1.  Ethereum Patricia Trees
1.  [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md#introduction) sub-protocols
1.  Ethereum [Ethash](https://github.com/ethereum/wiki/wiki/Ethash) function
1.  Implementation of EVM


### Goals:

1.  Nimbus is able to
    1.  Sync with the latest blockchain, from scratch
    1.  Accurately execute the entire transaction history
1.  The team is familiar with all codebases used to implement Ethereum.
1.  The team understands the main themes from [ethresear.ch](https://ethresear.ch/) and actively participates in EIPs.


## Sharding Phase 1


### July - November 2018

While implementing compatibility with Ethereum 1.0, we will gain early experience with the complete setup of sharding. As a result:


1.  The client will implement the core features necessary for sharding Phase 1.
1.  The team will actively participate in sharding-related EIPs.


### Goal:

The architecture of Nimbus supports sharding nodes.


## Auditing of Beta and Security


### November 2018 - March 2019

An independent security partner will continuously perform a security audit on the Nimbus codebase. We will also adopt frequent reviews of code, testing with automated fuzzing frameworks, and other practices that enhance security. In addition, we will develop a Nim-optimized fuzzing framework and will release it for use by the community at large.

### Goal:

Deliver a security-audited, production-ready client.

## Implementation of Whisper and PSS

### July - November 2018

We will set and advertise the bounties as soon as the P2P layer gets implemented. The core team will start working on this in July, unless already completed.

### Goals:

1.  Make Nimbus the leading platform for conducting research into the scalability aspects of Whisper and PSS. We consider this a key requirement for implementing a fully decentralised Status messaging platform within the Ethereum network.
1.  Deliver easy-to-use APIs for conducting large-scale and small-scale experiments within the network.

## Support for LES

### July - November 2018

We will optimize the architecture of Nimbus for implementing the [LES protocol](https://github.com/ethereum/wiki/wiki/Light-client-protocol). We will also optimize all internal state-handling operations such that they work efficiently and asynchronously. This will enable on-demand fetching of data from the network. This will also ensure that Nimbus runs with a high degree of concurrency and that the client UI is responsive.

### Goals:

1.  Enable a Light Mode switch in Nimbus.
1.  Successfully operate Nimbus in a mobile environment, without relying on a proxy service.

## Sharding Phase 2

### November 2018 - July 2019

We will focus on achieving compatibility with all other clients. In addition, we will implement an [eWASM](https://github.com/ewasm/design/blob/master/README.md) runtime and will add Nim as one of the languages that can target the new VM.

### Goals:

Implement the following in Nim:

1.  CLI tools and APIs for running Phase 2 nodes and for interacting with the Validator Manager Contract (VMC)
1.  The development tools that will target the eWASM runtime environment

## Casper Implementation

### December 2018 - February 2019

The team will closely follow the development of [Casper](https://blockgeeks.com/guides/ethereum-casper/) and will try to achieve and maintain compatibility with the existing Casper deployments.

## Implementation of Swarm

### January - July 2019 

We will set and advertise the bounties as soon as the P2P layer gets implemented. The core team will start working on this in January, unless already completed.

### Goals:

Implement the following:

1.  Ability to embed Nimbus into applications that deliver the complete Web 3.0 experience
1.  Support for the [Ethereum Name Service](https://ens.domains/)
1.  Support for a virtual file-system interface for accessing web content published on Swarm
1.  Reusable APIs for publishing and obtaining content from Swarm

## Sharding Phase 3

### March - August 2019

We will leverage our LES-optimized architecture to deliver a fully stateless client optimized for mobile devices.

### Goals:

Implement support for the following:

1.  Always-on operations on mobile devices, without disrupting the battery life or inducing significant bandwidth charges
1.  Running stateless executor nodes in deployments of headless servers

## Ongoing Improvements in Sharding

### August - December 2019

### Goals:

1.  Become one of the leading production-ready sharding implementations in the Ethereum ecosystem.
1.  Take active part in the effort to specify the new programming models required for cross-shard interactions.
1.  Provide an ongoing research into the applicability and performance characteristics of all super-quadratic sharding designs in a mobile environment.


# ETYMOLOGY

Nimbus, a reference to:

*   A different kind of "dark cloud" computing
*   Spiritual symbolism of sanctity and holiness
*   Nim, the language it will be written in
*   A Bus in computing architecture


# Ideas Considered for Implementation

1.  Create [devp2p](https://github.com/ethereum/wiki/wiki/%C3%90%CE%9EVp2p-Wire-Protocol) and an abstraction to allow for [libp2p](https://github.com/Agorise/c-libp2p), [Node Discovery](https://github.com/ethereum/wiki/wiki/Node-discovery-protocol), [RLP encoding](https://github.com/ethereum/wiki/wiki/RLP), [Modified Patricia Merkle Tree](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/), [bigint's](https://github.com/def-/nim-bigints), [keccak256](https://github.com/ethereum/eth-hash), and [secp256k1](https://en.bitcoin.it/wiki/Secp256k1).
1.  Create an abstraction that would allow sub-protocols: ETH, [SHH](https://gist.github.com/gluk256/9812e59ed0481050350a11308ada4096), [PSS](https://gist.github.com/zelig/d52dab6a4509125f842bbd0dce1e9440), [Swarm](https://github.com/ethersphere/swarm), [LES](https://github.com/ethereum/wiki/wiki/Light-client-protocol), [Stateless Clients](https://nordicapis.com/defining-stateful-vs-stateless-web-services/), Sharding, [Plasma](https://plasma.io/), [State Channels](https://blog.stephantual.com/what-are-state-channels-32a81f7accab). For now, we can ignore all but LES and Sharding.
1.  DB: Most implementations of Ethereum use [LevelDB](https://github.com/google/leveldb). Parity has a DB abstraction and uses [HashDB](https://github.com/NPS-DEEP/hashdb/wiki) and [RocksDB](https://rocksdb.org/docs/getting-started.html).
1.  RocksDB is an interesting choice, because it solves the issues that have troubled leveldb. Rocksdb also has a [light version](https://github.com/facebook/rocksdb/blob/master/ROCKSDB_LITE.md) for mobile usage; it's in C++, which would be an issue only if we go for pure C.
1.  [EVM](https://github.com/pirapira/awesome-ethereum-virtual-machine): basic VM, [eWASM](https://github.com/ewasm/design) ([Hera](https://github.com/ewasm/hera) is also in C++)
1.  IPC/RPC abstraction, [external API methods](https://github.com/ethereum/wiki/wiki/JSON-RPC) that can be consumed by application bindings: react-native module, IPC, RPC HTTP server, or web sockets
1.  Encryption library is a little unclear. [Libgcrypt](https://www.gnupg.org/software/libgcrypt/index.html) has everything we need but might be problematic from the standpoint of LGPL licensing. If we have an abstraction for Libgcrypt, we could use it now and swap it out later for something more permissive.
1.  Alternatively, we could roll out our own library. However, implementing our own encryption would not be a great idea, and our version would have to be audited and tested. Suggestions are welcome.
1.  Monitor [ethereum/py-evm](https://github.com/ethereum/py-evm/tree/sharding). Connect with Chang-Wu Chen, Hsiao-Wei Wang, and anyone else working on sharding.


# Resources



1.  [Awesome Ethereum Virtual Machine](https://github.com/pirapira/awesome-ethereum-virtual-machine)
1.  [Detailed introduction to the sharding proposal](https://github.com/ethereum/sharding/blob/develop/docs/doc.md)
1.  [Sharding FAQ](https://github.com/ethereum/wiki/wiki/Sharding-FAQ)
1.  [Ethereum 2.0: A presentation by Vitalik Buterin at BeyondBlock Taipei 2017](https://www.youtube.com/watch?v=9RtSod8EXn4&feature=youtu.be&t=11493)
1.  [The Stateless Client Concept](https://ethresear.ch/t/the-stateless-client-concept/172)
1.  [A Modest Proposal for Ethereum 2.0: A presentation by Vitalik Buterin at devcon three](https://youtu.be/hAhUfCjjkXc)
1.  [Python Implementation of the EVM](https://github.com/ethereum/py-evm/blob/master/README.md)
1.  [Discussion about sharding](https://ethresear.ch/c/sharding)
1.  [Discussion on Casper, scalability, abstraction and other low-level protocol research topics](https://gitter.im/ethereum/research)
1.  [ethereum/py-evm](https://gitter.im/ethereum/py-evm)
1.  [Ethereum Sharding: Overview and Finality](https://medium.com/@icebearhww/ethereum-sharding-and-finality-65248951f649)
1.  [Sharding - Mind Map](https://www.mindomo.com/mindmap/sharding-d7cf8b6dee714d01a77388cb5d9d2a01)
1.  [On Settlement Finality](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)
1.  [Casper contract and full POS](https://ethresear.ch/t/casper-contract-and-full-pos/136/2)
1.  [Ethereum Casper 101](http://notes.eth.sg/MYEwhswJwMzAtADgCwEYBM9kAYBGJ4wBTETKdGZdXAVmRvUQDYg=?view#)
1.  [ethersphere/swarm, Light mode of operation](https://github.com/ethersphere/swarm/wiki/Light-mode-of-operation)
