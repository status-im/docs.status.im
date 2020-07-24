---
id: run_status_node
title: Running Status Node
description: Status Node is an Ethereum client supporting the Status app.
---

## Why Run Status Node?

Currently, we don't provide any incentives for running Status Nodes. We are working hard to solve this problem. Our intent is to increase the size of the Waku network, thereby improving how decentralized and safe our platform is.

Another reason is privacy. In the current setup, most nodes - both relay and historical ones - are running as part of Status infrastructure. This means that Status has a wide view of most of the network. While all traffic in Waku is encrypted, the metadata that could be gathered this way can leak so information. If one wants to avoid that, the best option is to run a node on your own and configure it in the Status app.

### Community

By running your own node you provide additional nodes for the Status community. We encourage anyone to publish the enode addresses of their nodes for others to use. We also recommend running them as a permanent service or a docker container, so that it keeps running after system restart or a runtime node error.

### Types of Nodes

* Relay Node - A regular Waku Node which relays messages between nodes, including mobile or desktop clients.
* History Node - Also known as a Mailserver, stores historical messages and delivers them when queried.
    - Requires additional disk space. Around 1 GB of free space would be a start for storing last 30 days.

## Running A Status Node

Status Node is a modified [go-ethereum](https://github.com/ethereum/go-ethereum) node called [status-go](https://github.com/status-im/status-go) running on a server and supporting the Status app. As we operate in a decentralized model, we need multiple peers scattered around the globe to provide a reliable service.

When correctly configured a Status Node supports relaying Waku messages - helps propagate them between nodes - and storing them for devices that were offline when it was sent.

### Requirements

A machine running Linux or MacOS is required. It is entirely possible to run a Status Node on a physical machine in a local network, but for full functionality it would require a public and static IP address via which the service can be accessed.

An alternative would be to use a [cloud service provider](https://en.wikipedia.org/wiki/Cloud_computing) which would provide you with a public and static IP out of the box in most cases. Using a cloud service would also provide you with the high uptime necessary to collect as many envelopes as possible for later retrieval.

A single instance with 1GB of RAM and 1 vCPU should be enough to run Status Node reliably.

### Ports

* `30303` TCP/UDP - [DevP2P](https://github.com/ethereum/devp2p) wire protocol port. Must __ALWAYS__ be public.
* `8545` TCP - [JSON RPC](https://github.com/ethereum/wiki/wiki/json-rpc) management port. Must __NEVER__ be public.
* `9090` TCP - [Prometheus](https://prometheus.io/docs/concepts/data_model/) metrics port. Should not be public.

## Quick Start

The quickest way to start a node is using our `Makefile` scripts. You can read about that [here](https://github.com/status-im/status-go/blob/develop/MAILSERVER.md).

In simple terms you clone the [status-go](https://github.com/status-im/status-go) repo and run:
```sh
make run-mailserver-docker
```
or
```sh
make run-mailserver-systemd
```
To get a Status node running inside of docker or as a systemd service respectively.
For more details read their own `README` files: [docker](https://github.com/status-im/status-go/blob/develop/_assets/compose/mailserver) and [systemd](https://github.com/status-im/status-go/blob/develop/_assets/systemd/mailserver).

## Manual Approach

### Building

First you'll have to build a `statusd` binary. To do that simply do:
```
git clone https://github.com/status-im/status-go
cd status-go
make statusgo
```
For more information visit [this page](./build_status/status_go.html).

### Running

You can check the available options using the `-h`/`--help` flags:
```bash
./build/bin/statusd -h
```
The default settings will not let you run a full relay and history node.

### Configuration

The configuration is provided as a JSON file. A basic config that will let you run a Waku node that also stores historical messages would look like this:

`./config.json`
```json
{
    "AdvertiseAddr": "1.2.3.4",
    "ListenAddr": "0.0.0.0:30303",
    "HTTPEnabled": true,
    "HTTPHost": "127.0.0.1",
    "HTTPPort": 8545,
    "APIModules": "eth,net,web3,admin,mailserver",
    "RegisterTopics": ["whispermail"],
    "WakuConfig.Enabled": true,
    "WakuConfig.EnableMailServer": true,
    "WakuConfig.DataDir": "/var/tmp/statusd/waku",
    "WakuConfig.MailServerPassword", "status-offline-inbox"
}
```
Which can be provided using the `-c` flag:
```bash
$ ./build/bin/statusd -c ./config.json
```

For examples of config files check out [this directory](https://github.com/status-im/status-go/tree/develop/config/cli) and this [README](https://github.com/status-im/status-go/blob/develop/config/README.md) for more details on what these options mean.

You can read the comments for all options in the [following source file](https://github.com/status-im/status-go/blob/develop/params/config.go).

### Metrics

In order to enable Prometheus metrics you'll need to pass some flags:
```sh
./build/bin/statusd -metrics -metrics-port=9090
```
Which should expose metrics on the `9090` port:
```sh
 > curl -s localhost:9090/metrics | grep '^whisper_envelopes_received_total'
whisper_envelopes_received_total 123
```

### Healthcheck

The simplest way to check if the service is running is using the JSON RPC administration API:
```sh
 $ export DATA='{"jsonrpc":"2.0","method":"admin_peers", "params": [], "id":1}'
 $ curl -s -H 'content-type: application/json' -d $DATA localhost:8545 | jq -r '.result[].network.remoteAddress'
34.68.132.118:30305
134.209.136.123:30305
178.128.141.249:443
```

### Using Docker

Status provides a [docker image](https://hub.docker.com/r/statusteam/status-go/) that is used for running nodes on our fleet as well as using the [Docker Compose setup](https://github.com/status-im/status-go/tree/develop/_assets/compose/mailserver) we provide.

If you'd like to run a container yourself an example of that would be:
```bash
docker run --rm \
    -p 8545:8545 \
    -p 30303:30303 \
    -v $(pwd)/config.json:/config.json \
    statusteam/status-go:0.55.1 \
    -register \
    -log DEBUG \
    -c /config.json
```
