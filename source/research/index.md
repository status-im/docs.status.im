---
id: index
title: Research at Status
description: Find our research topics and basic outlines.
---

# Research Topics  

## Do You Want to Know a Secret?

Our work began with Whisper, which is not your typical communications system. However, we now are also actively implementing [Nimbus (an Ethereum 2.0 Client)](https://nimbus.team/), [Ultra Light Clients](./ulc_in_details.html), and a number of other things which you can also follow on our [research blog](https://our.status.im/tag/research).

But, for now, let's stick with Whisper:

1. It is not designed to replace or substitute TCP/IP, UDP, HTTP or any other traditional protocols. 
2. It is not designed to provide a connection oriented system, nor for simply delivering data between a pair of specific network endpoints. 
3. It is not designed to maximise bandwidth or minimise latency (though as with any transmission system, these are concerns).

Whisper is designed expressly for a [new paradigm](https://our.status.im/do-you-want-to-know-a-secret/) of application development. The design goals include: 
1. Easy and efficient multi-casting and broadcasting; 
2. Low-level partially-asynchronous communications; and 
3. Low-value traffic reduction or retardation. 

Whisper is designed to be a building block in next generation ÐApps which require large-scale many-to-many data-discovery, signal negotiation, and transmissions with reasonable assurance of privacy for users.

In short, Whisper is a peer-to-peer, multicast, end-to-end encrypted, dark gossip protocol we use to communicate securely.

## Basic Outline

1. **`peer-to-peer`** refers to the fact that Whisper uses Ethereum's [ÐΞVp2p wire protocol](https://github.com/ethereum/devp2p/blob/master/devp2p.md) to gossip messages around the network.
    
    **a.** ÐΞVp2p is an application-layer networking protocol for communication among nodes in a distributed network.
    **b.** ÐΞVp2p handles negotiation of supported sub-protocols on both sides and carries their messages over a single connection.

2. **`multicast`** means that, when I want to send a message to Bob, I actually broadcast that message to basically the whole network, though it is encrypted with the intended recipient's public key, or the #topic of the public chat for which it is intended. The use of public-private key pairs is why Whisper is sometimes called an "identity based messaging system".

    **a.** This requires setting a Proof-of-Work that is unique to Whisper, in order to prevent DoS attacks on the network. 
    **b.** Currently, Status sets a lower `PoW` value for Whisper messages than other clients default to, as higher `PoW` uses too much battery and compute power for most mobile phones. This is an active area of our research.
    **c.** Each message gets sent with a Time-to-Live (`ttl`), and - even when you receive a message intended for you - you re-encrypt it and carry on broadcasting it until the `ttl` has expired to ensure that there is plausible deniability for recipients (a concept that has been used before, for example in some [filesharing networks](https://en.wikipedia.org/wiki/Plausible_deniability#Freenet_file_sharing)). 

3. **`end-to-end encrypted`** refers to the fact that Whisper uses it's own public-private key pairs to encrypt messages. It supports both symmetric and asymmetric encryption.

4. **`dark`** means that, in certain modes of operation, messages/packets cannot be tracked/inspected and do not leak metadata. Because clients rebroadcast even messages intended for them until the `ttl` is up, among other tactics, it is very difficult to identify unique senders and receivers.

In the next article, we'll discuss Whisper's key features, the actual technical specification, and look at it both through the lens of datagram messaging systems (like UDP) and [Distributed Hash Tables](https://en.wikipedia.org/wiki/Distributed_hash_table).
