---
title: Register DApps
id: tutorial_4_register_dapps
---

# Register DApps

## Introducing the DApp Store

Status comes with a built-in DApp Store to help users quickly and easily find the most relevant, useful and trustworthy DApps built on the Ethereum network. 

![](/developer_tools/img/dappStore.png)

*Figure 1: The DApp Store.*

Registration itself is simple as we will see shortly. The DApp Store includes a ranking algorithm that sorts the DApps. To understand how a DApp becomes a “top” DApp we must understand how rank is determined. 

## Human Curation

The Terms and conditions state that DApps may be removed for:

- Malicious code injection
- Violation of Status' principles
- Lack of usability (especially on mobile)
- Vote manipulation

Also:

- Apps must be Https secure 
- Apps must display a connect with Status if the DApp offers wallet choices
- Apps must display Open with Status or Connect with Status if the use arrives in another browser.

![](/developer_tools/img/dappStoreTerms.png)

*Figure 2: Human Reviewed Criteria*

In summary, observe Status’ principles, don’t cheat and be sure your DApp runs well on mobile, including EIP-1102 (See Tutorial 2). 

When the human review has approved your DApp, your DApp will appear in your chosen category. 

## Token-Curated Registry

The DApp Store’s ranking algorithm is designed to sort the most relevant results, from a user perspective, to the top of the list. More precisely, it aims to sort the DApps that provide the most value to holders of the Status Network Token, SNT. 

DApp publishers can effectively purchase an initial position in the DApp Store ranking by staking SNT. Indirectly, staking a large amount of SNT does indeed provide value to holders of SNT because it reduces the circulating supply of SNT. Doing so increases the value of SNT tokens that remain in circulation.  

The algorithm is designed to counter domination by the richest participants. Aside from the cost of acquiring a quantity of SNT there are further tradeoffs a rational actor must weigh when considering a large stake for a high rank. 

1. Stakes can be withdrawn at a later date, but the larger the stake the less that can be recovered later. For example, if one stakes 10,000 SNT, then 99.5% can be withdrawn. If one stakes 1,000,000 SNT then only 50.99% will ever be recoverable. 

2. Users can vote DApps up or down. These votes have a cost (in SNT) which discourages spammy activity. This cost also decreases (exponentially) in proportion to a DApps stake relative to the circulating supply of SNT. In case that is not clear, it is significantly less expensive for users to downvote DApps with the highest stakes near the top of the ranking. 

![](/developer_tools/img/highestRanked.png)

*Figure 3: Highest Ranked DApps*

For a deeper look at the goals and principles of the ranking algorithm, see [https://our.status.im/discover-a-brave-new-curve/](https://our.status.im/discover-a-brave-new-curve/) or dive into the code: [https://github.com/dap-ps/discover](https://github.com/dap-ps/discover)

## Staking is Optional

When one registers a DApp one can choose to stake or simply register without staking. DApps without staking will still appear in the chosen category after the human review. 

If one stakes SNT, the DApp will appear immediately in the Highest Ranked DApp list, according to the position established by the stake (which the DApp Store reveals before the stake is committed). After the human review, the DApp will also appear, with its rank, in the chosen category. 

## Display the Badge on your landing page.
Don’t forget to invite your users to run your DApp on Status. 

- If your DApp invites users to choose a wallet, then Status must be one of the options. 
- If your user arrives in another browser, then your DApp should display one of the badges below to launch the DApp in Status. 

![](/developer_tools/img/statusIcons.png)

*Figure 4: Status Badges*

Let’s watch Andy Tudhope walk us through the DApp Store registration process.

<div class="video-wrapper">
	<iframe class="video-iframe" src="https://www.youtube.com/embed/5UlOWRtYAnI?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Practice Registration and Staking

You can practice DApp Registration on Ropsten. 

- Switch to the Ropsten testnet (**Profile => Advanced Settings**) in Development Mode ([Mobile Developer Tools](../run_on_status/mobile_dev_tools.html#Install-Status-Create-an-Account-and-Switch-to-Testnet)).
- Get some Ropsten **Testnet ETH** and some STT (The **Status Testnet Token**) from `simpleDapp.eth`. 
- Then, go ahead and **register** your DApp with, or without, staking. 

Remember the human-review part of the process. It is still in effect on Ropsten. Since it is only a test, the reviewers will approve your DApp after some time. Keep in mind that when they approve your DApp for Ropsten it is only to help you become acquainted with the process. Testnet DApps are not subject to the same careful inspection as DApps registered for the DApp Store on mainnet.

When you are ready to register your DApp in the mainnet DApp Store, you will want to review the 
Readiness Checklist.

## Readiness Checklist

Let us review what has been presented with quick checklist:

1. Your DApp meets all [DApp Store Requirements](../run_on_status/dapp_store_requirements.html).
    - A responsive layout that adjusts to the user’s screen dimensions. 
    - Observes generally-accepted best-practices for mobile browser content. 
    - Optimizes images to load quickly over lower bandwidth connections.
    - Avoids interstitials and pop-ups that could block mobile users.
2. Your DApp [implements EIP-1102](../run_on_status/eip-1102.html).
3. Your DApp displays the [Status badges](../run_on_status/dapp_store_requirements.html#One-Last-Thing) to invite users to use Status.
4. Your DApp uses the [Status DApp API](../status_extras/status_dapp_api.html) where appropriate. (Optional)
5. Your DApp is registered in the [DApp Store](#) with or without staking.

## Links

- Status Principles: [https://status.im/about/](https://status.im/about/) 
- Discover a brave new curve: [https://our.status.im/discover-a-brave-new-curve/](https://our.status.im/discover-a-brave-new-curve/) 
- DAp.ps Discovery Repo: [https://github.com/dap-ps/discover](https://github.com/dap-ps/discover) 
- Mozilla Best Practices for Mobile Design: [https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile](https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile) 
