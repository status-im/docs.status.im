---
id: add_your_dapp
title: Adding your DApp to Status
---

# Instructions

We accept submissions to our DApp list via pull request. 

Once you've tested your DApp thoroughly on Status and addressed any issues, make a pull request to [discover-dapps](https://github.com/status-im/discover-dapps) with the following:

- Add a square icon for your DApp (180x180 png) with a colored (non-white) background to `public/images/dapps`. The file name should match your DApp, e.g. `my-dapp.png`. Please do not include any text. Note that the icon will be round cropped.

- Add information about your DApp to `src/common/data/dapps.js`. For example:
```js
  {
    name: 'Uniswap',
    url: 'https://uniswap.exchange/',
    description:
      'Seamlessly exchange ERC20 tokens, or use a formalized model to pool liquidity reserves',
    image: '/images/dapps/uniswap.png',
    category: Categories.EXCHANGES,
    dateAdded: '2019-04-23',
  },
```
- Once submitted, please ping in #status-core-dapps to ensure that your PR is reviewed.

## Link to your DApp

You can deep link to any DApp in Status using this format:

```
https://get.status.im/browse/website.com
```

You can also use the `Share link` button from the options menu within the Status browser. 

## A note on curation

Discover is a separate React web app and the DApps that appear in it are not part of the Status App's native code.  

SNT is used to rank DApps in Discover, and allow users to vote on rankings. The game is simple: whoever stakes the most SNT ranks highest, with the one caveat that the more you stake, the cheaper it is for users to move you down the rankings. In order to achieve this, we create votes using a Bonded Curve that relates the SNT Staked by developers with the Cost to Vote for users.

This ensures that it is easier for the community to hold powerful, well-resourced actors to account, while smaller, start-up, open source creators without much financial power cannot be too negatively effected by either corporate warfare or general trolling. Either way, the net effect of any corporate warfare/trolling is more SNT accumulating in Discover, which means less SNT in circulation and greater total value per SNT for every SNT stakeholder, as well as more economic confidence in the rankings as a whole.

Users pay a fee to vote. As a user, I just want to see links/DApps that are relevant to me and have some transparency as to how that relevance has been calculated. I do not want to have to manage 100 different tokens, all with different governance mechanisms, on-chain transactions and reward schemes. If I feel really strongly about it, I should be able to influence the rankings, but it seems fair that this has a cost to me, and that such a cost goes directly back to the owner of the product on which I am voting.

## Need support?

If you have any questions, ping us in [#status-core-dapps](https://get.status.im/chat/public/status-core-dapps).
