---
id: dark_routing
title: Whisper - Dark Routing
---

# Whisper Dark Routing

## Some Routes Can't Be Discovered Without Getting Lost

To understand information leakage, it is important to distinguish between mere encryption, and `darkness`. Many protocols, both p2p and more traditional client/server models, provide a level of encryption. However, even with encrypted communications, well-funded attackers are still able to compromise your privacy. 

Bulk metadata collection has become [the new battleground](https://www.youtube.com/watch?v=UdQiz0Vavmc), over which institutions like the NSA may even kill. 

In the case of a simple client/server model, metadata betrays with which hosts one communicates. With decentralised communications systems, e.g. a basic non-routed but encrypted VoIP call or Telehash communication, a network packet-sniffing attacker may not be able to determine the specific content of a transmission, but with the help of ISP IP address logs they would be able to determine with whom one communicated, when, and how often. For certain types of applications in various jurisdictions, this is enough to be a concerning lack of privacy.

Even with encryption and packet forwarding through a third relay node, there is still ample room for a determined bulk transmissions-collector to execute statistical attacks on timing and bandwidth, effectively using their knowledge of certain network invariants and the fact that only a finite amount of actors are involved (i.e. that nodes tend to forward messages between the same two peers with minimal latency and that there aren't all that many pairs of nodes that are trying to communicate via the same relay).

If you've read the previous articles, you'll notice that Whisper is designed to overcome some of the above shortcomings AND be configurable to the end user, who ought to able to specify what sort of `battery life + mobile data charges` VS `privacy and possible metadata leakage` trade-offs they are willing to make. This requires a combination of great code, education, and a deep focus on User Experience Research.

## Working in the Dark

Distributed systems must make a trade off between the efficiency of deterministic routing and `darkness` (i.e. routing privacy). This is why user-configurability matters: the people who use the technology ought to be the ones deciding between routing privacy and efficiency, and ought to be able to do so in a granular and editable way.

At its most `dark`, Whisper nodes are entirely reactive - they receive and record pieces of data and forward them trying to maximise the utility of information transmission to the peers.

However, Whisper is also designed to be able to route probabilistically using two methods, both giving away minimal routing information and both being exceptionally resilient to statistical attacks from large-scale metadata collection.

The first builds on the functionality of `ÐΞVp2p`, which provides the ability to rate peers. Over time, we can probabilistically alter (or steer) the set of peers to those which tend to deliver useful (on-topic, timely, required for ones ÐApps to function) information. Ultimately, as the network evolves and the peer-set is steered, the number of hops between this peer and any others that tend to be good conduits of useful information (be they the emitters or simply the well-positioned hubs) will tend to 0.

Peer steering also provides the incentive for nodes to provide useful information. The fear of being identified as an under-performing peer and thus being rotated out in favour of other nodes gives all nodes incentive to cooperate and share the most useful information. `Useful`, in this case, means provably difficult to author (use of a proof-of-work function helps here); a low time-to-live; and well-corresponding to any provided information on what might be interesting to your peers.

The second is more dynamic. Nodes are informed by their ÐApps or users as to what sort of topics are interesting. Nodes are then allowed to advertise to each peer describing these topics. Topics may be derived, using masks or Bloom filters, so as to reduce the amount of information leaked and make passive statistical attacks arbitrarily difficult to execute. The determination of the amount of information to give to peers is both made through an explicit setting from the user and through topic/traffic modelling: 

> "Given the information coming from this peer and my models of information distribution made from total traffic, am I receiving the amount of useful valuable information that I would expect to receive? If so, narrowing it down with additional description information to the peer may be warranted."

These settings can even be configured per-peer (more trusted/longer-lasting peers may be afforded greater amounts of information), and per-ÐApp (those ÐApps that may be more sensitive could be afforded less advertising than others). We can also make use of proof-of-work algorithms to minimise the chances of both DoS attacks and `everything-but attacks` (where a peer is flooded with almost-useful information prompting it to give away more about its true requirements than it would do otherwise).

Through combining and reducing the Blooms/masks, weaker Nth-level information can be provided to peers about their peers' interests, forming a probabilistic topic-reception vortex around nodes, the "topic-space" gravity-well getting weaker and less certain the farther away it is (in network hops) from any interested peers.

Status used an initial, rather naive implementation of this for our [Discovery protocol](https://docs.google.com/document/d/1MQRcv1BmMSl08by7VLGaQArXV-z467PtkwyRpVs7Ok8/edit), which is sure to be resurrected soon as part of the way we curate ÐApps and do decentralised search in general.
