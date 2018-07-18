---
id: security_threat_modeling
title: Threat modeling with STRIDE
---

Threat modelling is a way to try to identify risks and threats in the
application. It usually is done from the _point of view of an attacker_.

## Threat modeling basics

1. Understand the system or the feature.

    - is there any sensitive information?

    - what is the security perimeter of the app? 

    - where does data pass the perimeter?

2. What can go wrong?

    - STRIDE modelling 
         - feature
         - information tranferring endpoints
         - data flows

3. What are we going to do about it?

    - assess risks value and decide how to mitigate them;

    - document the decisions;

4. Did we do a good job?

    - Does the diagram represents the system well?

    - Did we found at least 5 threats per every thing in the diagram including
    the data flows?

    - Did we document each threat?

## STRIDE


STRIDE is an acronym that stands for: Spoofing, Tampering, Repudiation,
Information disclosure, Denial of service, Elevation of priviledge.

We try to apply all 6 attack types to every component or data flow of the
system and coming up with the possible attack vectors.

### Spoofing

Pretending you are someone/something you are not.

_Example: "Advisary can pretend to be a Status Bot and request Money to "Unblock" user's account."_

### Tampering

Changing something in the app's storage or memory or networking.

_Example: "A malicious application can read our debug logs and get the
password from there"._

### Repudiation

Claiming that you didn't do something you did. Like you didn't transfer money
while you did. Cleaning up the logs counts here.

Claiming that something is invalid while it is valid.

_Example: A DApp claiming that the transaction didn't go through._


### Information disclosure

Leaking any information to any parties that aren't allowed to read it. That is
not only about leaking it to the public, but also between accounts, etc.

_Example: Ethereum Node failed to restart on signout and discloses the keys and message
history to another user._

### Denial Of Service

Somehow waste all the app resources that it can't do it's main job.

_Example: User sends multiple huge messages and no one in the chatroom can
type anymore, because the phone is processing it too slowly._

### Elevation Of Priviledge

Doing something in the app that you don't have permissions to.

_Example: Due to an error, it is possible to sign a transaction as another
user._


Now, when we know the types of attacks, how do we use them to threat model?

There are two useful questions that we can ask ourselves:

- "How using this feature of our app can an advisory do `<attack type>`?"
  (Example: How using universal links can an advisory do a spoofing attack?).

- "How using this `<attack type>` can an advisory get access to `<sensitive
info>`?"
  (Example: How using Tampering can an advisory get access to Recovery Phrase?)

Also, there is a card game called ["Elevation of Priviledge"](https://www.microsoft.com/en-us/sdl/adopt/eop.aspx). It can help to threat model as well.
Download it, print out the cards and play!


## ‼️ UX and Security

Being a developer or a QA, it is very easy to come up with technical threats
and technial solutions to them, leaving the "user errors" aside. 

That leaves out a huge amount of threats and risk mitigations aside. **If it is
easy for a user to make an error in our app, it is our problem and we need to
fix that.**

Pay precise attention on the UX problems, "user errors" and social engineering
while doing threat modeling!

Read these articles to understand how issues in UX might make security features
essentially pointless:
- ["Why Johnny Can't Encrypt (PGP 5 1999)"](https://people.eecs.berkeley.edu/%7Etygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf)
- ["Why Johnny Still Can’t Encrypt (PGP 9, 2006)"](https://cups.cs.cmu.edu/soups/2006/posters/sheng-poster_abstract.pdf)
- ["Why Johnny Still, Still Can’t Encrypt (Mailvelope, 2015)"](https://arxiv.org/pdf/1510.08555.pdf)

## Privacy & Security

STRIDE model that will be discussed further is typically focused on security
aspects. Privacy, on the other hand, might be left off.

In Status, we shouldn't put users' privacy at risk, so when doing the threat
analysis also take into account how this feature/change/module/dataflow will
affect users' privacy.

Educate yourself about user privacy [here](https://msdn.microsoft.com/en-us/library/aa480490.aspx) or [here](https://en.wikipedia.org/wiki/Internet_privacy).

Take into account all the privacy aspects of any given feature/module/change.


## Scoring risks

With scoring risks, repeatability is an important thing to gain. To do that, we
will use [OWASP Risk Rating Methodology](https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology).


### Handling Risks and Scores

- All HIGH and CRITICAL risks should be documented (either as a checklist in
the feature's GHI or as separate issues);

- Usually, all HIGH and CRITICAL risks should be addressed and mitigated before the PR
is merged;

- Exceptions can be made but they should be documented and a separate GHI
should be created for such risks.


## Learn more

["Elevation Of Priviledge" card game](https://www.microsoft.com/en-us/sdl/adopt/eop.aspx)

[Threat Modelling: What, Why and How?](https://misti.com/infosec-insider/threat-modeling-what-why-and-how)

[YouTube Presentation from Basel](https://www.youtube.com/watch?v=7Jk1GCvJnpM&t=6350s)
