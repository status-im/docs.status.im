---
id: security_existing_features
title: Threat-modeling Existing Features Project
---

Prerequisite reads:

- [Security Champions](./security_champions.md)

- [Threat Modeling](./security_threat_modeling.md)

- [What Is Sensitive Data?](./security_sensitive_data.md)

---

The goals of this project is to retroactively threat model the existing
features and components of our application. This is potentially a one-time
project, as opposed to the threat modeling new features that is a process to
have in the organization.

The goal is to identify threats in our existing features, risk-assess them and
document them in GHI.

[Security champions](./security_champions.md) are responsible for doing this job.

We use [STRIDE threat modeling](./security_threat_modeling.md).

# Output

The output of this project is a list of threats as GHIs in `status-react`
project with ranks according to the OWASP Risk Ranking.
