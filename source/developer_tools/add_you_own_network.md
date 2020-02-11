---
id: add_your_own_network
title: How To Add Your Own Custom Network To Status
---

# Adapt Status For Your Own Needs

This article lists and explains all the steps needed to add a new network to Status (e.g. side chain or a test network). We want anyone, on any Ethereum-like network to have direct access to a powerful mobile client that they can just use (TM) without having to worry about anything more than providing an alternative RPC endpoint. 

We have already [implemented this with POA](https://github.com/status-im/status-react/issues/6250), for both the xDAI and POA sidechains, and look forward to a future where a thousand blockchains bloom, all from your pocket.

Overview:

1. Add the network info to `status-im.constants`
2. Add the chain id and name to `status-im.utils.ethereum.core`
3. Add the native currency info to `status-im.utils.ethereum.tokens`
4. Add the native currency icon to `resources/images/tokens/NETWORK/0-native.png`
5. Add a migration to add new networks to existing accounts upon upgrade

# Detailed walkthrough

## 1. add network info to `status-im.constants`

Add a new entry to the map which contains all our current networks. The key should be a string representation of the internal network id, e.g. "xdai_rpc". The value should be the network configuration object, e.g.:

```clojure
{:id     "xdai_rpc",
 :name   "xDai Chain",
 :config {:NetworkId      (ethereum/chain-keyword->chain-id :xdai)
          :DataDir        "/ethereum/xdai_rpc"
          :UpstreamConfig {:Enabled true
                           :URL     "https://dai.poa.network"}}}
```

By convention, we use the `_rpc` suffix for all networks that access their blockchain data via upstream RPC. For full or LES access, we should omit this suffix, e.g just `"mainnet"` as opposed to `"mainnet_rpc"`. This only applies to the network identifier - the chain identifier should not contain any suffixes.

## 2. add chain id and name to `status-im.utils.ethereum.core`

There is a mapping between internal ids (as keywords) and numerical chain ids in this namespace. Add the new network info as per this example:

```clojure
(def chains
  {:mainnet {:id 1 :name "Mainnet"}
   :testnet {:id 3 :name "Ropsten"}
   :rinkeby {:id 4 :name "Rinkeby"}
   :xdai    {:id 100 :name "xDai"}
   :poa     {:id 99 :name "POA"}})
```

The internal keyword id is arbitrary and you can choose whatever makes sense. On the other hand, the numerical id should be the same as the one actually used by the chain in question. You can check the value by calling `web3.version.getNetwork()`. If the incorrect id has been configured, there will be an error during the Ethereum node initialization (right after login).

## 3. add native currency info to `status-im.utils.ethereum.tokens`

If your native currency has a name and symbol other than Ether and ETH, then this needs to be set up. For example, the xDAI Chain native currency is called xDAI, so we set that up by adding a new entry to the native currency map, where the chain id is the key and the following is value:

```clojure
{:name            "xDAI"
 :symbol          :ETH
 :symbol-display  :xDAI
 :symbol-exchange :DAI
 :decimals        18}
```

* `name` - full display name of the given currency
* `symbol` - internal symbol key, always `ETH` for native currencies
* `symbol-display` - the value of symbol as it is displayed in Wallet screens, chat messages, etc.
* `symbol-exchange` - the symbol used as the ticker on exchange services to represent the given currency, e.g. `xDAI` represents the native currency of xDAI Chain, however it is listed as DAI on cryptocompare.

## 4. add native currency icon to `resources/images/tokens/NETWORK/0-native.png`

If the native currency icon is different that the default Ether icon, then the resource file needs to be added to the project. Since there is only one native currency per chain, the file name will always be `0-native.png` - it only needs to be located in the correct directory for that chain.

## 5. add a migration to add new networks to existing accounts upon upgrade

Correction - we'll change the model in such a way so that we can remove the need for this migration. See [#6491](https://github.com/status-im/status-react/issues/6491)

That's it! If you have any questions or remarks, please find us in the [status developer channel](https://join.status.im/chat/public/status-core-devs). Hopefully, we'll simplify this process soon enough.