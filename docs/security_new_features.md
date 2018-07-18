---
id: security_new_features
title: Threat-modeling new features
---

Prerequisite reads:

- [Security Champions](./security_champions.md)

- [Threat Modeling](./security_threat_modeling.md)

- [What Is Sensitive Data?](./security_sensitive_data.md)

---

The Security Process intends to implement security as an integral part of
software development.

That means that

- the code changes codebase should be assessed;

- threat-modelling should be done;

- risks should be found, documented and mitigated;

before the code is merged to our `develop` branch.


## Do we need to do that for every change?

For every change/GHI we assess if it affects security & privacy of our app. If
not, we can add a [github label](./security_github_labels.md) "Security: Skip" to it

Threat modeling should only be done for the features & fixes that do affect
privacy & security.

A simple checklist to assess if we need to threat model.

We should always threat-model:

- the change works with something that is received from outside the security perimeter (downloaded from the internet, input from the user, DApps, cloud backups, etc);

- the change uses or changes behaviour of handling [sensitive data](./security_sensitive_data.md);

- the change changes security mechanisms of the app itself.

Everything else might be skipped. This checklist will most probably be improved
in the future.


## Size of Change

It doesn't matter. Sometimes 1 LoC change can uncover a huge attack surface.


## How to do that?

To spreat the security culture around the company, most of the actual job for
threat-modeling should be done by *the contributor* itself, while the security
champion reviews and corrects it.

The process looks roughly like that:

- The Security Champion identifies if that change needs to be security-checked.
The result of this step is either a label "Security: Skip" or a comment about
necessity of threat modeling.

- The contributor does a short [threat analysis and risk assessment](./security_threat_modeling.md). The result of that is an informal list of threats that are identified.

    ```
    Example:

    - faking "Status Support" chatroom. CRITICAL; might leak backup phrase

    ```

- This list then gets reviewed by the security champion. If the security
champion isn't sure about that, he/she can ask for help in `#security` channel.

- The change is approved (and stamped with an appropriate [github label](./security_github_labels.md):
    
    - all the CRITICAL/HIGH risks are mitigated;
appropriate;

    - some HIGH risks are still there, but they are documented and there is
    a consensus between the security champion, the contributor and the PO and
    the TO of the appropriate team that this risk is what we are willing to
    take for now.
