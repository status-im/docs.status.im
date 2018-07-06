---
id: intro_openbounty
title: Using Status Open Bounty
sidebar_label: Learn the Joy of the Hunt
---

## Status Open Bounty is live on the main-net 

You can use Status Open Bounty today by visiting [openbounty.status.im](openbounty.status.im)

Please note that for Organizations to add bounties to GitHub issues, you need to visit our [chat](https://chat.status.im/#/register), go into the #openbounty channel and get your GitHub account profile whitelisted for live-use.

## General
For using Status Open Bounty you will need:

1. A web-browser with Ethereum network connectivity (Status, or something like Metamask)
2. An ethereum account on main-net
3. A GitHub account with administrative access to one or more repositories (to add bounties)

## Signing up
First please make sure you’re connected to Ethereum network through Status, Metamask, Mist, or Parity through your internet browser. Visit [openbounty.status.im](https://openbounty.status.im) and click `Log In`, which you can do easily using your GitHub account.

## For Developers
After sign up, click on your profile picture and then "My payment details" to add your Ethereum address to your profile.

You will see this field `Update Address - Insert your Ethereum Address in Hex Format`.

Please paste your public ethereum address in this field. This will be the account you receive payments in. Verify you have all the private keys and account access secure and be sure to click the `Update` button.

That's it, you’re ready to start bounty hunting!

Click on Bounties and start searching for an issue you’d like to work on - once a Pull Request you submit on an issue is merged you will receive the bounty!

Please include `Fixes: #N` with the specific Issue # on a comment of the PR for the Issuer to see your fix and pay out your bounty.

## For Organizations

Please follow this process to get setup, as the order really matters due to the way GitHub handles webhooks and permissions.

1. Log into [openbounty.status.im](https://openbounty.status.im)
2. Update your payment details
3. Log into [chat.status.im](https://chat.status.im), let us know your GH username in the #openbounty channel and we will whitelist you.
4. Wait to be whitelisted.
5. Add our [GitHub app](https://github.com/apps/status-open-bounty-app/) to your repo.
6. Create a `bounty` label.
7. Assign it to an issue and watch magic happen.

Follow [this link](https://github.com/apps/status-open-bounty-app-tes) for the test version if you just want to play around on Ropsten.

Please note: Currently you must create a `New Label` called bounty to add a bounty too an issue, so you must have write access to the repository.

Once the bounty label has been added to your issue in your GitHub repository the Status Open Bounty bot will add a Comment to your issue where you can fund the bounty.

After a few moments your issue now has an active bounty on it and you need to fund it.

The comment just added to your issue will now contain a QR code and Ethereum address to be funded and should look like this.

![Open Bounty comment](/docs/assets/SOB_comment.png)

You can now fund this bounty by sending to the Contract address either via address or QR code with any ETH or ERC20 or ERC223 Tokens!

Once funded your bounty is now ready to be confirmed.

## Confirming Bounties

Navigate to the Manage Payouts section of [openbounty.status.im](https://openbounty.status.im).

The Open Claims section will list all of your unmerged and merged pull requests.

Once a pull request is merged with a bounty on it, it is selected as the winning claim.

You must sign off on this bounty payout by navigating to your Ethereum Wallet and `confirming` the transaction - after a bounty is merged.

You can check out `Activity Feed` to view that claimer received the funds after `confirming` transaction.

You’ve now issued your first bounty - congratulations!

## Removing Bounties

You can also easily revoke bounties by navigating to the "Manage bounties" page, scrolling down to "Unclaimed bounties", clicking the 3 dots in the bottom right of the issue you're wanting to claim your funds back from and selecting "Revoke". 

You'll be prompted after a time to confirm the refund via Metamask. Be sure to make sure you have set a high enough gas price to get your funds back quickly!

Obviously, it is not possible to revoke a bounty once a PR fixing the issue has been merged.

## Switching Accounts

If you’d like to change the GitHub account associated with login you can simply clear the cache of your preferred browser. A private browsing window will work as well.

Alternatively, if you want to remove your GitHub profile from SOB you can revoke 0auth apps access in GitHub under Applications > 0auth apps > Revoke access.

## Status Open Bounty Video Tutorial

[![Open Bounty Tutorials](/docs/assets/SOB_video.png)](https://www.youtube.com/watch?v=edfQd_urHBc)