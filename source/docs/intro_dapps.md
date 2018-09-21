---
id: intro_dapps
title: DApps in Status
---

## Status Extensions

We are working hard to make sure our next iteration of 3rd party developer tools gets shipped soon. Lightweight, they provide native feeling and have access to the full ethereum decentralized experience, augmented by the Status app's unique features.

### Goals
Status is investing lots of energy to make decentralized primitives available on mobile platforms. Let’s allow ethereum developers to leverage Status' first class features and UX so that they can focus on what they do best: innovate. Open and free, Status is now extensible too. 

### Specifically we want:

1. To make Status awesome for end users who want to easily use mini DApps
2. To make Status an appealing way for ethereum devs to extend their work on mobile 
3. High usage
4. Extensions are not applications. They alleviate users from the heavy cost of installing through an appstore.
5. A typical scenario consists of a user scanning a QR code using its native mobile camera and being redirect to Status augmented by the extension (after being granted necessary permissions). It can then disappear right after usage or persist depending on user preference. #nofriction

### Design principles
When it comes to openness and data control, Status sets the bar the highest. To that end the following points will guide our decisions:

1. Secure and aware of privacy
2. Simple build model and no friction to publish
3. Decentralized, controlled by end users
4. Open - access to Status and ethereum features
5. Smooth on all platforms
6. Reusable

### How open?
Status is inherently malleable. It is Status’ responsibility to choose carefully what is available to extensions and how it can be extended.

Openness is fundamental to Status. It is based on three pillars: data access, API and extension points.

There is a delicate balance between providing the access needed to create awesome DApps while ensuring strong data control for users. To that end, a new security model that emphasizes data destination will be considered (in p2p world, the knowledge of what you send and who you send it to is fundamental). 

### Data access
Data in status in kept is kept in a single, tree-based entity. Extensions will rely on a query mechanism for accessing subset of this data. Depending on the security granted, extensions might have access to most of the data manipulated by status.

Specifically those data will be available:
1. Local profile / wallet details
2. Contacts details
3. Local ethereum state

### API
APIs are the building blocks used by 3rd party developers. Status offers a set of high-level components alleviating developers from the traditional pains of mobile UI development. 

1. Ethereum interactions (transactions, contract creation and calls)
2. Swarm / IPFS primitives
3. Status specific features (modify profile, contacts access, manipulate wallet)

Also available are the high-level UI components loosely based on the ReactNative model. Those components are the same as the ones used by Status and focus on performance, great UX and ease of use.

### Extension points
Extensions are only as useful as the extensions points are relevant. As a developer, you will be constrained by what can be extended. There is a balance to be found between extensibility and Status identity.

At first we will allow the following features to be extended:
1. Display of chat messages
2. Types of commands 
3. Types of chat 
4. Display of the wallet’s asset details

We will refine these extension points according to the feedback we receive.