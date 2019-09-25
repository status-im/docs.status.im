---
id: introduction
partial: first_page
title: Technical Documentation
---

# Technical Documentation

Welcome to our documentation pages! We know it's the most important thing for growing our distributed ecosystem...

Status is an open source community of people committed to building better, decentralised tools for web3, and making sure that everyone across the world can access these tools directly from their pockets.

> Writing "non-technical" documentation is a little besides the point, because our culture is _technical_. [Developer discussions](https://www.youtube.com/playlist?list=PLbrz7IuP1hrjyCQqEpkpho41JpaFF3czG), [tutorials](#), and [Town Halls](https://www.youtube.com/playlist?list=PLbrz7IuP1hrgu-NlZEaxatGS5slTkhZ0N) are an essential part of our community, and should not be obscured or downplayed. We really want to build a better web, and we are doing it ourselves with skills we are teaching each other. This fact should be celebrated! Discussions about technical matters can be liberating and self-empowering; seriously, it's through the slow accumulation of technical knowledge and skills that we can become excited about the future again.

[Status the app](../about/) is how we implement in practical reality our vision of a more open, accessible and equitable internet for everyone: a brand new place where you can 

1. **Say** what's on your mind without fear of censorship.
2. **Play** with a new world of decentralised applications, creating all kinds of new value.
3. **Pay** whom you want, how you want, with no delays or middlemen.
4. **Stay** for the community of people committed to direct and private communication without intermediaries and the better world that vision implies.

If "peer-to-peer electronic payment systems" are really going to change the ways we interact and organise as a society, then we need to make sure that as many people can take part in these networks as possible. As importantly, the tools they have ready access to must support web3 without making compromises that might keep the playing fields permanently skewed.

People everywhere need to be able to connect, transact, explore, and create value with as much ease and freedom as bankers on Wall Street. It's as simple as that, really.

# Building For Mobile Is An Adventure

We give you that broad introduction to our goals here in order to prepare you for some of the rough edges you might run into when exploring web3 and the tooling that currently exists...

Our code lives in two main repos: [status-react](https://github.com/status-im/status-react) and [status-go](https://github.com/status-im/status-go). 

Status-react is where most of what might traditionally be called the "frontend" logic sits (everything to do with UI components and interactions, chats, views etc.) and status-go is where all the heavier blockchain logic sits. Status-go can be compiled as a stand alone library, and gets included as a static dependency in status-react at build time.

Status-react is actually written in Clojure, which is a Lisp-like language that can be compiled down to React Native, so that we only have to maintain one codebase for Android, iOS and our desktop app.

# Why Clojure?

Well, it's one of the most performant frontend frameworks going, with the [fewest lines of code](https://medium.freecodecamp.org/a-real-world-comparison-of-front-end-frameworks-with-benchmarks-2018-update-e5760fb4a962). However, a lot of that is lost in the compilation down to React Native, so what are our real motivations?

With Clojure you get a complete separation of functions and data. This means we can do amazing things in Status extensions that allow developers a lot of access to different parts of the data that now lives client side in decentralized networks, without compromising on the security of our users. And this is just the tip of the iceberg. 

We can imagine making every single component in the app just some data living at some content-addressed store in a distributed file system like Swarm, and then using the appropriate functions to compile a service Just In Time on your mobile device that allows you to do what you need to. Check out this [tech talk](https://www.youtube.com/watch?v=VYWujJBAb80&index=9&list=PLbrz7IuP1hrgDI595BXQGAXKvoexj8JCY) or read more in [these docs](intro_dapps.html).

So, while we realise that we lose a lot of potential contributors to the core app by making such a choice, the developers we do attract tend to think about the world in similar ways to us. They don't mind taking on really ambitious projects, but they do so with an approach to complex problems that is uniquely effective.

![Lisp](../img/lisp.jpg)

Building on any decentralized network, in any language, requires something of a change in mindset. In fact, the Clojure docs are split up into:

1. **The Forest of Tooling**
2. **The Mountain of Language**
3. **The Cave of Artifacts**
4. **The Cloud Castle of Mindset**

Status developers love this kind of thing, especially the Cloud Castle of Mindset, because building truly decentralised applications is really - first and foremost - about approaching the problems you face in fundamentally different ways. 

# What Do I Need To Learn?

If you want to contribute to the Status core app, then yes, it's probably a good idea to at least [start with Clojure](https://www.braveclojure.com/introduction/).

However, if you want to build awesome and amazing DApps, there is absolutely no need for all that. Just use [Embark](https://embark.status.im), plugin to the Status [JS API](/developer_tools/) and perhaps even [extend your DApp](/extensions/) to watch the magic happen from people's pockets all around the world.

Building great DApps that live up to high standards of security, censorship-resistance, and smooth user experience is absolutely vital to creating a thriving decentralised economy.

We love developers who build great DApps as much as we love Clojurians. In Status, there really is space for everyone.
