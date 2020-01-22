---
id: index
title: Status External Audits
---

# Status External Audits

This page contains information about all the external audits we have undergone.  As we reach major milestones in development, after rounds of internal review and auditing, we reach out to third parties to verify our sanity, and double/triple check the work that we do.  

These security audits are not guarantees of security in the projects they pertain to. They are additional checks from objective third parties to help bolster confidence in the security of intended functionality.

As always, if you find a bug or vulnerability in our code, please report it to [security@status.im](mailto:security@status.im).

## Ongoing Security Retainer

Status currently maintains an ongoing retainer contract with Trail of Bits to help with overall security coverage.

## Bug Bounty Program

Status currently has a private campaign on the HackerOne platform for bug bounties.  We are currently underway to expand this program's scope and availability post-V1 mobile app release to become public and the de-facto standard method for reporting found vulnerabilities within the Status ecosystem.  

## Ongoing Security Audits

There are no current ongoing security audits. 

## Finalized Security Audits

### Status Mobile App V1 with Trail of Bits
- Started September 30th, 2019
- Ends November 1st, 2019
- [Blog post](https://our.status.im/status-mobile-app-security-audit-complete-ahead-of-v1-launch/)

### Sticker Market contracts with Trail of Bits
- June 2019 - [Sticker Market Repository (with contracts)](github.com/status-im/sticker-market)
- [Finalized Issue Document](https://docs.google.com/document/d/1zwORJkLjymjF7Z8UmNIURr9tlCjt7eI0qtcRYuJRPEA/edit?usp=sharing)
    - We opted to not request a finalized generated report from Trail of Bits for this audit, and instead tracked problems through a private repository maintained by Trail of Bits.  These were then fixed and summarized in the above document. 
    - All changes in that repository have been merged into the above linked repository.
 
### ENS smart contract with Sigma Prime
- October 2018 - [ENS Username Contract ](https://github.com/status-im/ens-usernames/blob/master/contracts/registry/UsernameRegistrar.sol) - commit hash [eaefa92](https://github.com/status-im/ens-usernames/commit/eaefa92a258c784f1df4066e057e8170bcb6ef95#diff-dbff1e6b987cbb9a6b87ea8180c41e72)
- [Report](https://drive.google.com/open?id=1BqiPGBjILgbIlmMXAO8AombxW_jsQtfC)
- [Tests](https://drive.google.com/open?id=12ACYXvPn8WUyRg9WCooUTO3vvJVuo7lL)
- [Code](https://drive.google.com/open?id=16LbYo4PYv3CY8XZ57kBsB3TxPzGkrb8j)
- [Blog post](https://blog.sigmaprime.io/status-ens-review.html)

### Deja Vu Beta Audit
- May 07, 2018 - [Status-go](https://github.com/status-im/status-go) and [Status-react](https://github.com/status-im/status-react) repos with Deja Vu 
- [Report](https://drive.google.com/file/d/1wB5pGPaNsQwq2udV7NmHkLuW-2JCMbnV/view) 
- [Blog post](https://blog.status.im/status-deja-vu-security-audit-final-report-5b6eda5a683a)
