---
title: DApp Store Requirements 
id: dapp_store_requirements
---

# DApp Store Requirements

## Introduction

Status is expected to attract a strong following of Ethereum enthusiasts and DApp users owing to its seamless integration of wallet, chat, browser, and keystore. For a DApp to run on Status:

- It should present a responsive, mobile-optimized user interface.
- It should implement EIP-1102.

Status has a DApp Store, [https://dap.ps](https://dap.ps). The DApp Store is a curated list of DApps displayed on the DApp panel: ![](/developer_tools/img/dappIcon.png)

To be accepted into the DApp Store, a DApp:

<div class='box-remember'>
  <ul><li>must present a responsive, mobile-optimized user interface</li><li>must implement EIP-1102 support </li><li>must offer Status if the DApp offers wallet selection</li><li>should invite users to launch the DApp in Status if they have arrived by another browser</li></ul>
</div>

We will explore the DApp curation process in more detail in [Register DApps](../register_dapps/register_dapps.html). 

Let us briefly describe mobile-optimized user interfaces and then dive into EIP-1102. 

## UI Optimized for Mobile

The debut production release of Status is a mobile app for Android and iOS. As such, step one is to ensure that your front-end is optimized for mobile. These considerations will be familiar to mobile web developers. 

<div class='box-remember'>
<ul><li>responsive layout that adjusts to the user’s screen dimensions </li><li>observes generally-accepted best-practices for mobile browser content </li><li>optimizes images to load quickly over lower bandwidth connections</li><li>avoids interstitials and pop-ups that could block mobile users </li></ul>
</div>

As noted in the asset guidelines in the Status docs ([https://status.im/developer_tools/assets_guidelines.html](https://status.im/developer_tools/assets_guidelines.html)), if you find yourself pinching the screen to zoom out or zoom in, you need to resolve those issues.

## Introducing EIP-1102

EIP-1102 ([https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md)) is a privacy-focused improvement to the way DApps interact with user accounts. Let us review the history of how this works and how EIP-1102 affects your DApps. 

You may recall early days when Mist, MetaMask, and others injected Web3 and exposed users' Ethereum accounts to websites. That is, the users’ Ethereum accounts were available for inspection by any interested web page. Later, the Ethereum community recognized this was a security risk. 

You may also recall that MetaMask and others introduced a “Privacy Mode,” which is enabled by default. With Privacy Mode enabled, user accounts are hidden from all DApps. This prevents harvesting of user accounts but it also means that users are forced to disable Privacy Mode every time they wish to interact with a DApp. And, users will need to remember to re-enable Privacy Mode if they want to avoid revealing their accounts to untrusted websites without their knowledge. 

That arrangement is not ideal. 

EIP-1102 resolves this issue by authorizing DApps. If this difference seems subtle or mysterious, consider:

- **Old Way**. Authorize NOW. Privacy Mode is either ON or OFF and the user is responsible for managing this. The mode is not particular about which websites have access, so the revealed information is available across all open tabs and other sites the user opens while privacy is disabled. 

- **New Way**. Authorize DApp. A specific DApp is allowed to inspect account information, or not. A DApp that wants such authorization will cause the user to be prompted to grant it access. Once access is authorized, the user’s decision is persistent and they won’t be prompted again. This flow closely resembles familiar mobile app permissions such as giving a specific app permission to use the camera.

As you might expect, EIP-1102 is a new protocol for communication between a DApp and the user’s wallet.

For a more detailed look at the rationale for EIP-1102, see the EIP repository. [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md)

## Backward Compatibility

Support for EIP-1102 is optional but strongly recommended. 

<div class='box-remember'>
<ul><li>EIP-1102 is poised to become the de facto standard method of inspecting user account information. Status and other wallet providers have indicated their intention to support it, and to phase out backward compatibility over time - a breaking change for DApps that fail to implement EIP-1102 in time.</li><li>EIP-1102 is a more intuitive user experience and a more secure solution.</li></ul>
</div>


Let us consider how a DApp that does not implement EIP-1102 will work with Status (at the time of writing). 

![](/developer_tools/img/previewPrivacyMode.png)

*Figure 1: Preview Privacy Mode in the Profile panel.*

By default, Status’ Preview Privacy Mode is enabled. Enabled means DApps cannot see the user accounts (unless they implement EIP-1102). Users can disable this by toggling the feature off. With Preview Privacy Mode disabled, untrusted websites can inspect the user’s Ethereum addresses. Therefore, a user can use a legacy DApp with Status, but the user must disable Preview Privacy Mode and, importantly, remember to re-enable it for their own security. 

This process should be familiar. 

To improve the user experience, to qualify for the DApp Store, and to improve the user experience you will want to implement EIP-1102.

## EIP-1102 User Perspective

With Preview Privacy Mode enabled (the default) the flow is more intuitive, provided the DApp supports EIP-1102.

Let us load CryptoKitties, this time with Preview Privacy Mode enabled. Recall that Enabled is the default setting, and this is how users should operate to protect their privacy. 

Press the ![](/developer_tools/img/cryptoKittiesStart.png) button after the welcome screen appears. 

Notice that you are prompted to allow CryptoKitties to connect to the wallet. It works this way because CryptoKitties implements EIP-1102. 

![](/developer_tools/img/cryptoKittiesEip1102.png)

*Figure 2: Crypto Kitties requests wallet access using EIP-1102.*

This is intuitive. The user can grant access without venturing into settings and disabling privacy. The permission granted applies only to CryptoKitties. It does not open up wallet access to other sites the user visits later. The permission granted is persistent, so the user won’t be interrupted again. 

Now that you know what EIP-1102 does for users, learn how to [implement EIP-1102](../run_on_status/eip-1102.html). 

## DApp Chat with Whisper

In addition to private one-to-one and group chats, every DApp domain automatically receives its own Whisper topic. 

If you are unfamiliar with Whisper, it is a privacy-focused and censorship-resistant distributed messaging protocol. Have a look over here for an introduction to Whisper: [https://status.im/research/](https://status.im/research/)

You may have noticed this already.

For example, visit the CryptoKitties DApp and click the application level chat icon ![](/developer_tools/img/chatIcon.png). You are presented with a whisper topic that corresponds to the DApp’s domain name. 

![](/developer_tools/img/cryptoKittiesChat.png)

*Figure 7: CryptoKitties has its own Whisper Topic.*

When you load your DApp in Status and press the application chat icon, you will see a Whisper topic that corresponds to the domain where your DApp is hosted. This is a place where users can chat about your DApp.  

There is absolutely nothing you need to do to enable these DApp topics. Every DApp (domain) gets one.

## One Last Thing

Invite your users to run your DApp on Status. 

- If your DApp invites users to choose a wallet, then Status should be one of the options. 
- If your user arrives in another browser, then your DApp should display one of the badges below to launch the DApp in Status. 

![](/developer_tools/img/statusIcons.png)

## Universal Links (iOS) & Deep Links (Android)

With universal links (iOS) and deep links (Android) mobile users can tap a link to Status and get seamlessly redirected to the Status app and linked to specified screens. If Status isn’t installed, tapping a link to the Status website opens a Status website with information and instructions to download the mobile app.

### Supported Links
<strong> DApp Browser</strong>
- https://get.status.im/browse/DAPP-ADDRESS
- e.g. https://get.status.im/browse/www.cryptokitties.co

<strong>Public Chats</strong>
- https://get.status.im/chat/public/CHANNEL-NAME 
- e.g. https://get.status.im/chat/public/status

<strong>Users</strong>
- https://get.status.im/user/CONTACT-ADDRESS 
- e.g. https://get.status.im/user/0x044166fa04e967e333211ae0cc1087c9c74exxx
- e.g. https://get.status.im/user/name.stateofus.eth


## That’s It!

Now, let us see how easy it is to [implement EIP-1102](eip-1102.html).  

## Links

- EIP-1102 [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md) 
- Status mobile DApp guidelines: [https://status.im/developer_tools/run_on_status/assets_guidelines.html](assets_guidelines.html) 
- Mozilla mobile best practices: [https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile](https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile) 
- Status DApp store: [https://dap.ps](https://dap.ps) 
