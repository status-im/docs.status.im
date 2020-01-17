---
id: faqs
title: Frequently Asked Questions
---

# Frequently Asked Questions

## General

### What is Status?
Status is a private, secure communication tool to uphold human rights and empower sovereign communities.

### Who is behind Status?
Status is built by the [Status Network](https://statusnetwork.com/). The Status Network builds products, tools and infrastructure for resilient, sustainable and inclusive communities. More about Status and its core contributors here: https://status.im/about/

### Why use Status?
Over the past 20 years, the internet as we know it has been controlled by a few corporations, with an incentive to collect and sell data. Status provides an alternative. Status uses state of the art technology to provide private, secure communication. Status uses a peer-to-peer model that prevents any 3rd party from controlling users’ data. Status combines a messenger, crypto wallet, and web3 browser and gives you full control over your assets and communication. 

### Why a messenger?
Sovereign communities need uncensored, private and secure communication to organize. Messaging offers a promising road to the adoption of Ethereum because of its suitability for mobile use. This in turn can pave the way to making payment networks and other decentralized applications accessible to more communities.

Ultimately Status is much more than a messenger. Combining asset management with the crypto wallet and access to a world of decentralized applications through the web3 browser, it is a communication tool in the broadest sense.

### What makes Status different from other messaging applications?
Most messengers offer end-to-end encryption. This standard protection means that the company providing the service can not read the content of your messages. But the flow of information over their network is public, and allows for interpretation of who is talking to whom, from where. Traditional messengers also require identifying information to sign up, like a phone number, and this is usually connected to a host of other personal data about you. Status requires no personal information whatsoever for you to get started. Because of its peer-to-peer infrastructure, Status has no knowledge about who is contacting whom, nor about the content of your messages. [Here](https://github.com/status-im/specs) you can find specifications of how this technology works.
 
### What happens if a government tries to block or censor Status?
Status messenger does not use one central server to and from which communication can be blocked. Instead Status uses a distributed network of mail servers. This ensures resilience of the network. If a mail server is shut down you can connect to another mail server or start [running your own](https://discuss.status.im/t/get-your-node-running/1488/4?u=hester). However, Status and mail servers in the network still rely on having an Internet connection. If the Internet is shut down through telecom providers you will not be able to use Status.

### How does Status connect to the blockchain? ?
Status is packaged with go-ethereum, which connects to the Ethereum network. All you need to do to connect to Ethereum is run the Status app! Note that only the wallet and browser interact with the Ethereum blockchain. Messages are not stored on the blockchain.

### Can I run go-ethereum myself or on a server?
We are committed to getting light nodes working on resource restricted devices. This would allow you to connect to Ethereum from your mobile phone or IoT device directly, no server required. More importantly, it would increase accessibility and resilience of the network overall. For more information, please check out https://nimbus.team/.

If you want to run go-ethereum now, you can set up a node on a Linux device and configure the Status app to connect to this node. You can find more information [here](https://discuss.status.im/t/get-your-node-running/).

### On what devices can I use Status?
Status is tested to run on Android 7+, and iOS 13+.

### Does Status also run on desktop?
Not at the moment. Our code base is designed so that Status can run on either mobile or desktop devices. Development of Status desktop is currently paused while the team focuses on the mobile app and other infrastructure projects.

### What languages do you support?
Status is currently available in 7 languages — English, français, italiano,中文, 한국어, 日本語, اُردُو & русский! 

Anyone can contribute to Status translations. If you see a typo, mistranslation or simply want your language represented, join us at [translate.status.im](https://translate.status.im/).

### Is the app free to use?
Absolutely. No payment is needed to use Status’ core features. To get the most out of Status, it does help to hold the cryptocurrencies ETH (Ethereum) and SNT (Status Network Token). Certain features require SNT to use, as this helps to support our project. 

To get SNT, you can use an exchange DApp to trade crypto you already own, or you can buy ETH and SNT in exchange for a fiat (e.g. Euro or US dollar) currency using a fiat-to-crypto exchange. 

### Are there any fees?
Status has no hidden fees. When you make a transaction using your crypto wallet, you will see a network fee included in the cost. This network fee is otherwise known as “gas,” and is a requirement of the Ethereum network, used in exactly the same way by all Ethereum wallets and applications to facilitate transactions. Status does not collect any percentage of this fee.

### I would like to contribute to the project, where would you suggest I start?
Status is an open source project and welcomes all contributions, both technical and non-technical. The [ambassadors page](https://ambassador.status.im/) is a great place to start. Here you can get in touch with active contributors who can support you in promoting, teaching about or otherwise contributing to the next generation of the web. 

If you’re a developer and want to get your hands dirty, head over to documentation on DApp development in the [DApp Integration Center](https://status.im/developer_tools/). If you are a mobile developer yourself and love functional languages, then [build Status](https://status.im/build_status/) yourself and start submitting those PRs.

### How can I request features? 
As Status is an open source, community-driven project, you can both request and contribute to feature development. Share your thoughts in the public channel [#status](https://get.status.im/chat/public/status) or on our discuss forum: https://discuss.status.im/. You’re also welcome to open a [Github issue](https://github.com/status-im). 

If you’re a developer, follow our [contributor guide](https://dev.status.im/technical/contributor_guide.html) to get involved. 

### What is SNT and how does it work in the app?
SNT is the Status Network Token. It’s Status’ ERC20 (Ethereum standard) token, used to power the Status Network. Certain features and functionalities require users to deposit or spend SNT. Utility of the token is a primary goal of the Status Network, as the value of SNT helps to ensure longevity of the project. 

## Keys and Accounts
### What are keys?
Keys are a form of identity and the backbone of Status and Ethereum. They always come in pairs, a public key and a private key. You generate the very first pair when you start using Status, you can consider this the master key pair. After that, n-number of key pairs can be generated based on this first pair. Creating something like a keychain of identities. One of the keys on this chain is your chat key; You can find it in `Profile` > `Share icon`.

### What are accounts?
You can compare accounts in Status to bank accounts. Each account is based on its own key pair. Like a bank account, an account typically has an address, balance and can transact. Each account also has its own history of transactions that is public. For ultimate privacy you use multiple accounts. You can view your accounts in the `Wallet` tab.

### What is my wallet address?
Your wallet address has 42 characters and starts with 0x. It’s an on-chain identity for your Ethereum account. If you have multiple accounts, you have multiple addresses. You can find your wallet address by going to `Wallet` > `Account card` > `Receive` or by tapping on the `Share icon` on the Account card.
Note that although it looks similar, your wallet address is not the same as your chat key. You can find your chat key in `Profile` > `Share icon`.

### How many accounts can I create in Status?
You can create as many accounts as you want. Go to `Wallet` > `Add account` > `Generate keys`. Accounts added this way can be recovered with your seed phrase, along with your master key pair, if you lose access to your account.
You can also create more master key pairs by going to the start screen `Your keys` > `Generate keys` or `Access existing keys` if you want to import keys from another wallet or create a completely new keychain of identities.

## Profile and Settings
### What is an ENS username?
An ENS username is a name registered with Ethereum Name Service; A register that connects an Ethereum address to a unique, human-readable name, e.g. Alice. Like registering a web domain, it comes with different suffixes. If you register a name through Status, you get alice.stateofus.eth. When you register an ENS name you can use it in Status chat, transforming your random name, e.g. Sneaky White Koala, into your ENS name. This makes it much easier for others to find and recognize you.

### What is the difference between alice.eth versus alice.stateofus.eth?
Buying a stateofus.eth name is cheaper. You pay 10 SNT deposit to license the name, after 1 year you can either retrieve the funds or continue using the name at no further cost. A .eth domain currently (January 2020) costs around $5 annually in ETH. You can connect both names to your chat key to use, your name e.g., @alice, in chat. 

### What is a seed phrase?
Your seed phrase in Status is comprised of 12 words. It is the origin of your chat key as well as the account keys in your wallet. All keys are derived from this first seed through some cryptographic wizardry. If you lose access to your account, for example by losing your phone, you can access your keys using your seed phrase. The same wizardry will let you regenerate the exact same keychain of identities.

### What should I do with this seed phrase?
You can find your seed phrase under `Profile` > `Privacy and security` > `Back up seed phrase`. Write it down. Keep it safe. Keeping your seed phrase on paper, away from your devices, is the most secure option. 

### If I lose my phone, how can I access my accounts?
To access your accounts you need your 12-word seed phrase. With this seed phrase you can regain access to your master key pair and all your accounts.

Note that you can restore accounts that live on Ethereum. However, you will not regain access to your chats or contact list, as this information is only stored locally on your phone.

### Why is 'Back up seed phrase' greyed out?
The `Back up seed phrase` item is greyed out when you have already walked through the screens that instruct you to write down your seed phrase. At this point, you can no longer view the seed phrase in the app. The phrase is removed from local storage to minimize the risk of anyone but you ever being able to access it.

### I lost my seed phrase. What do I do?
That’s a pain. First check if you can no longer back up your seed phrase under Profile > Privacy and Security. If the item `Back up seed phrase` is greyed out, you are no longer able to access the seed phrase. 

The best option now is to generate a new master key pair using a new seed, and transfer your assets to this new account. In Status go to `Sign out` > `Generate a new key`. Follow the steps on the screen to store and secure this new key. Once you’re done, go to `Profile` > `Privacy and Security` > `Back up seed phrase`. Store the seed phrase securely offline. Then go to `Wallet` > `Share icon` > Tap address to copy. 

Unlock the keys for which you lost your seed phrase using your password. Send all assets from the accounts in your wallet to your new address.

### How do I delete my profile?
Your profile only exists locally. Any messages you have sent will remain on mail servers for 30 days. After that, the message cease to exist. Transactions you have made with using an account in your wallet will remain on the blockchain. 

### If someone gets access to my phone, what part of my profile is encrypted and what not?
Your private keys are encrypted at all times and can only be used by you to sign transactions in combination with your password or passcode. Information that is not encrypted includes the 3 word name, when you last used Status (unlocked your keys), your profile picture, and the identifier of your Keycard if you have one. 

### How do I minimize mobile data usage by Status?
Status can be bandwidth heavy. The best way to prevent too much data consumption is by using Status only when connected to wifi. You can prevent Status from using mobile data by adjusting your settings under `Profile` > `Sync settings` > `Mobile data`.

## Chat
### Are my messages really private?
Yes, they are. Status currently uses Whisper, the messaging protocol of the Ethereum stack.Whisper provides peer-to-peer messaging with zero reliance on centralized servers, data centers or service providers. 
 
Every message is end-to-end encrypted, and broadcast to every single peer in the network for a set time. This makes it not only impossible for unintended audiences to read the content of messages, but also to see who sends messages to whom. For private 1:1 messages, only the intended recipient of a message is able to decrypt the content. For public chats, anyone who knows the name of the chat can decrypt the content. 
An additional safeguard is the use of a new encryption key with every message, after the initial key exchange between users (Perfect Forward Secrecy). If your message key is compromised, only the message for that particular key is compromised. There is no access to past messages.
 
The privacy Whisper provides does come at the cost of high data usage. Development of an alternative is ongoing. You can follow progress [here](https://forum.vac.dev/t/waku-project-and-progress/24).

### Where are my messages stored? Are they on the blockchain?
Messages are stored on a mail server for two weeks, and on your phone once you receive them by opening Status and connecting to the network. To reach you, messages pass over devp2p—the transport layer for Whisper—but are not transported through the Ethereum Virtual Machine. In other words, they are not stored on the blockchain, and they don’t cost anything to send.

### Who hosts the mail servers that store messages?
Whisper requires a special kind of Ethereum node to store and transfer messages. Status is the only instance of Whisper being used in production. Thus, Status hosts a set of these special nodes in order to support its users. However, anyone is able to host a mail server node with the proper hardware. You can find instructions on how to do so here.

### How can I change my name in Status?
If you want to add a custom name, you can register an ENS username. Go to `Profile` > `ENS usernames`. When you register or connect an existing ENS username to your Status chat key, others can then find you by this username. You can also display it in place of your three word name.

### How do I invite my friends to Status?
You can share either your profile or a specific chat with friends outside of Status.

To share your own profile and chat key, go to `Profile` > `Share icon`. A link will be generated that your friend can follow to get Status and load your profile. 

To share a public chat, open the chat, and tap on `...` > `Share chat`. This will generate a link to the chat, which you can then send to your friend outside of Status.

### I joined a public chat, but I don’t see any messages. Why is that?
Public chats are like radio channels. You can tune into a channel, but you will only see messages if others are broadcasting on that channel. You can start your own conversation and invite others by going to `...` > `Share chat`.

### How do I create a new public chat?
On the Chat tab, tap `+` > `Join public chat` and type a chat name. If the name doesn’t exist yet on the network, you automatically create one. 

You can think of public chats like #-tags. They're a collection of all messages that use the same #.

### How can I start a 1:1 chat with someone on Status?
On the Chat tab, tap `+` > `Start new chat` > `Enter the ENS username or chat key`. Or if the other person is sitting next to you, scan the QR code with their chat key from their profile.

If you want to start a 1:1 with someone in a Public channel, tap on their name or avatar > `Send message`.

### Does it matter which mail server I select?
Mail servers that are closer to you in geographic distance will return messages faster. It’s recommended that you keep the default setting for automatic mail server selection. With automatic selection enabled, Status can measure the latency of messages between servers and choose the fastest one for you. 

If you want to connect to your own mail server, or to one running on a specific trusted device, you can add a custom mail server.

## Browser
### How is this browser different from other browsers?
Status is a web3 enabled browser. A web3 enabled browser can open any website, but on top of that allows you to use decentralized apps, or ‘DApps’. In order to do so, Status injects an object into the DOM of a given site, allowing that site to reference your account on the blockchain—with your permission first. 

Typically, DApps use the Ethereum blockchain to send and receive information and process payments that would conventionally be stored on a centralized server. DApps present little risk of a single party controlling and profiting from your data.

### What is DAp.ps?
DAp.ps is a decentralized and community curated directory of DApps built for Ethereum, so that you can easily explore the best of web3. DApp developers can submit their DApps for free, or stake SNT to boost their ranking. Users can upvote or downvote DApp listings with SNT as well. The more SNT a developer has staked, the easier it is to downvote their DApp. 

### How do I vote for DApps?
Go to https://dap.ps, find your favorite DApp and tap `Upvote`. Set the `Amount` of SNT you want to use and tap `Upvote`. When you downvote a DApp, the amount is already set. The more DApp developers invested to increase their ranking, the cheaper it will be for you to downvote. This reduces the risk of well-funded DApps to take over and make your vote on the DApps usefulness count.
Note that voting requires SNT as well as a small amount of ETH to pay for the transaction.

### What are DApp permissions?
DApps must ask permission to view and use your wallet address and/or your chat key. Usually, a DApp asks to `Connect your wallet`. When it does, you receive a popup asking to `Deny` or `Allow` this request. Permissions to connect your wallet address are specific to each account you hold in your wallet. If you give permission for a new account, permission to the previously connected account is revoked. If you reject a permission request, the DApp will not know anything about your Ethereum address, nor will it be able to initiate transactions.

Go to `Profile` > `Privacy and security` > `Set DApp permissions` to see which DApps can access which accounts, and to revoke permissions if you would like. 

Note that if the DApp has stored your address, this cannot be revoked by Status.

## Wallet
### How secure is my wallet?
Status includes a Hierarchical Deterministic (HD) wallet. Any keys generated in this wallet are encrypted and stored locally on your phone, using secure hardware if available. Nobody has access but you. For enhanced security you can get a Keycard to store your keys.

### What does it mean to sign a transaction?
Any change on Ethereum is considered a transaction. Information is transferred from one address to another. This information can be assets or an agreement. When you sign a transaction using Status you are approving this transaction. Status will tell you what type of transaction you are asked to sign. 

### What is my signing phrase?
The signing phrase is a security feature. When you use Status for the first time, the wallet will show you your signing phrase, which is a unique combination of three words. Only you and the app know this signing phrase. Every time you sign a transaction, the app will show you the signing phrase. If you recognize the signing phrase, you know for sure that the signature request is coming from Status and is safe to sign. You can view your signing phrase by going to `Wallet` > `...` > `View signing phrase`.

### What assets does the Status wallet support?
The wallet currently supports ETH and ERC20 (e.g. OMG, BNB, BAT or DAI) tokens, and some ERC721 tokens as well (e.g. Cryptokitties or digital artwork).

### Why are my assets not showing?
By default, only ETH and SNT are displayed in your wallet. If you import an account that also holds other tokens, Status shows these as well. In other cases, for example when you send tokens to an account in Status, you will need to add these to your account view. 

You can add tokens to your account view by going to `Wallet` > `[...]` > `Manage assets`. 

### How does ENS work with Status wallet?
You can send assets to an ENS name by going to `Wallet` > `Send icon [↗]` > `Choose recipient` > `Enter recipient address`. The wallet will automatically replace the ENS name with the wallet address that owns it. 

### Why do I have to pay a network fee for transactions?
The network fee, also known as “gas,” covers the computational cost of executing an action on the Ethereum blockchain. It’s standard to the network. No changes can be made to the Ethereum blockchain, including transactions between users, without the expenditure of gas. The Status wallet allows you to adjust the network fee with each transaction. A higher fee will improve the processing speed for your transaction.

### How and to what addresses can I send assets?
Status wallet allows you to send ETH and ERC20 (e.g. OMG, BNB, BAT or DAI) to wallets that accept these currencies. To send assets go to `Wallet` > `Send icon [↗]`. Alternatively go to `Wallet` > `Account card` > `Send`

Then `Enter Amount` > `Select token` > `Select from account` > `Choose recipient`

You can recognize wallets that accept ETH and Ethereum based tokens by the address format. The address will start with 0x… Status wallet checks for invalid addresses. Best practice is to always triple check the address manually before signing a transaction. 



