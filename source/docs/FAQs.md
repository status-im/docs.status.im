---
id: faqs
title: Frequently Asked Questions
---

## Why a Messenger?
When looking at how to achieve mass adoption for a client, we looked at how people interact with their devices. For instance, as of 2014 more time is spent on mobile devices compared with desktop PCs. Moreover, a third of that total time is spent within instant messaging applications. Amongst mobile apps, instant messengers have the highest retention rates. Once installed they become sticky and typically users won't uninstall immediately. Therefore, for mass adoption an instant messenger simply makes senses. Once network effects come into play and user's friends also begin to utilise the app the average user lifetime skyrockets. When you start thinking about this as a user base and how to connect that with Ethereum, things like payments and applications built atop of Ethereum and integrated into a conversational interface begin to seem like a clear path forward.

Ultimately what we're building is a hybrid browser and messenger, this allows us to have the best chance at casting the widest net which permits us to focus on user acquisition, staying agnostic and as close as possible to the principles that Ethereum embodies.

## Does Status support DApps that have their own web page ?
Yes, we absolutely support DApps on their own webpage and are striving for SWARM support also. Chances are, if a DApp works in Mist or MetaMask it is likely to work in Status!

If your web-based DApp renders on mobile, use the big "+" button on the homepage, navigate to the DApps page type in the web URL where your DApp is being hosted. You can also debug any issues by using Chrome dev tools very easily.

## Where are my messages in the app stored? Are they on chain?
Messages in the Status app are stored on your phone and an offline inbox server but all messages are fully encrypted. Messages go over Whisper (shh) which is a dark routed gossip protocol that is a part of the Ethereum stack. This means the messages are being passed over devp2p (the transport layer for the whole of Ethereum), but are not going through the EVM, i.e. they are not "on the blockchain" and don't cost anything to send.

## Do I have to run go-ethereum myself or on server?
Status includes go-ethereum and connects directly to the Ethereum network. All you need to do is run the Status app!

We are working on both the Light Ethereum Service (LES) and a new branch called the Ultra Light Client (ULC). You can find this work in our Codebase and we are absolutely committed to getting light nodes working on resource restricted devices.

## When did you start coding and how you are funded?
Status is largely self-funded. We've been working on it since prior to Devcon1 in 2015, and we were awarded a Devgrant to port EthereumJ to Android prior to that.

EthereumJ has different goals, its developers intended for server use and had no interest in supporting the light client protocol. Another large factor is we wanted largely a single codebase for multiple platforms, we had Java running on iOS and Android, and we wanted to unify the GUI but the means to do that (JavaFX) is really not suited to mobile devices.

Our current approach allows us to get bleeding edge tech and stability of geth whilst maintaining a single codebase.

## I would like to contribute to the project, where would you suggest I start?
Best place to start is by [downloading Status itself](https://status-im.github.io/nightly/) and playing with it. You can install our Android nightly builds from here, or join us in [chat.status.im](https://chat.status.im) to ask for access to our iOS builds through TestFlight.

If you're a DApp developer, head over to those [docs](intro_dapps.md). If you are a mobile developer yourself and love functional languages, then build Status [yourself](build_status.md) and start submitting those PRs.

For non-technical community members, just download the app, write about, talk about, do podcast with you friends, take a video of your experiences with it and share it widely. When it is possible, encourage people to run Status mailservers and other parts of the infrastructure (while earning SNT) so that we can build together a truly decentralized network.

## I have a DApp that runs on Mist, how can I test it in Status?
If your web-based DApp renders on mobile, use the big "+" button on the homepage, navigate to the DApps page type in the web URL where your DApp is being hosted. You can also debug any issues by using Chrome dev tools very easily.

## Is it going to be for Android only?
No, we currently support both iOS and Android and have a dedicated team working on desktop integration.

## Is it possible to install Status & how can I test?
We are working through getting more TestFlight invites out for iOS, so make sure to sign up on the homepage. For Android users you can navigate to here and [download an APK for yourself](https://status-im.github.io/nightly/). 

## What languages do you support?
We’re currently supporting 30 languages — this includes; English, 官話, 官话, 廣東話, 上海话, Nederlands, Français, Deutsch, हिन्दी, Magyar, Italiano, 日本語, 한국어, Polski, Português brasileiro, Português europeu, Română, Slovenski, Español, Español (Latin-America), Swahili, Svenska, Suisse française, Schweizerdeutsch, Svizzera Italiana, ภาษาไทย, Türkçe, русский, українська, اُردُو & Tiếng Việt!

If you see a typo, mistranslation or something missing, don't hesitate to let us know via the [chat.status.im](https://chat.status.im).

## Camera Permissions 
We use this for setting your profile picture and for reading QR codes and only ask when it is absolutely necessary to, not before.

## Is there a rationale for using simple optimizations only for prod builds?
The difference in size is about 300KB, anyway RN packager makes some magic with js after cljs compiler. The difference in error output is that with `:simple` we have much more useful info if error happens, not just `a.b.adsfas is undefined`.

The only reason why we added `:advanced` was that when resulting cjs was small RN packager ran much faster. And we didn’t meet that non-configurable 300s timeout for packager

## Is that intentional? Alice has account Sneaky White Koala. Bob has account Cool Damp Bear
When Alice adds Bob's as a contact, she will see him as e.g. Breezy Tall Elephant until Bob adds Alice to his contacts, at which both will see the other's "true" name. This is for privacy reasons.

