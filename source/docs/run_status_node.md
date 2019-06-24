---
id: run_status_node
title: Running Status Node
---

# Running Status Node

Status Node is an Ethereum client usually running on a server supporting the Status app. As we operate in a decentralized model, we need some peers scattered around the globe to provide a reliable service.

Status Node can be run in such a way that it supports only Whisper messages (ie. it helps propagate them), or as a permanent message store (Mail Server).

## Requirements

Linux or macOS is required.

### Status Node With Whisper Only

You can run Status Node on your laptop or PC. It does need high uptime to join the network. Status Node also works just fine on mobile devices in our app, though it consumes a lot of bandwidth.

### Status Node With Mail Server

The additional requirement for Status Nodes with Mail Server capability enabled is disk storage. The current data volume collected by a Mail Server within a month is around 600 MB.

### Cloud Providers

Mail Servers need high uptime to collect as many envelopes as possible for later retrieval.

A single server with 1GB of RAM and 1 vCPU should be enough to run Status Node reliably.

## Why Run Status Node?

Currently, we don't provide any incentives for running Status Nodes. We are working hard to solve this problem. Our intent is to increase the size of the Whisper network, thereby improving how "decentralized" and safe our platform is.

Another reason is privacy. In the current setup, nodes that are running as Mail Servers are `trusted`. This means that such a node can communicate directly with the Status app using a p2p connection and some metadata might leak. If one wants to avoid that, the best option is to run a Mail Server on your own and configure it in the Status app.

## How To Run It

First, visit [build status-go](/build_status/status_go.html) in order to compile a binary.

When you get it, open a Terminal window and run
```bash
$ ./build/bin/statusd -h
```
to learn more about available options.

```bash
$ ./build/bin/statusd
```
This will run a regular Whisper node that joins Status production network.

If you need more control, you will need to provide a JSON file with a custom configuration. The provided file will override any default options.

For example, if you'd like to expose HTTP and IPC interfaces, you need to create a JSON file:

```bash
# file located at ./development.json
{
    "HTTPEnabled": true,
    "IPCEnabled": true
}
```

and then run

```bash
$ ./build/bin/statusd -c ./development.json
```

Check out [this directory](https://github.com/status-im/status-go/tree/develop/config/cli) for more examples.

### Running with docker

If you have some experience with Docker and would like to run it without building, you can use [our Status Node Docker images](https://hub.docker.com/r/statusteam/status-go/).

The simplest command looks like this:

```bash
$ docker run --rm statusteam/status-go:0.16.0
```

Let's see a more advanced option with a custom config. First, you need to create a file with a custom config:

```json
# this file is named http-enabled.json and
# created in the current working directory
{
	"HTTPEnabled": true,
	"HTTPHost": "0.0.0.0",
	"APIModules": "admin,debug"
}
```

Then, just run a docker container:

```bash
docker run --rm \
    -p 8545:8545 \
    -v $(pwd)/http-enabled.json:/config/config.json \
    statusteam/status-go:0.16.0 \
    -register \
    -log DEBUG \
    -c /config/config.json
```

Finally, test if everything works as expected making an HTTP request to the Status Node running in Docker:

```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"admin_peers","params":[],"id":1}' \
    localhost:8545
```

## Run Nodes For Community

If you want to provide additional nodes for the Status community, we recommend running them in Docker or as a daemon so that it keeps running after system restart or a runtime node error.

### Whisper Node

In order to run a regular Whisper node that can be found by other nodes and added as a peer, use `-register` flag:

```bash
$ ./build/bin/statusd -register
```

> `-register` populates `RegisterTopics` setting in the config. The equivalent is:
> ```json
> {
>     "RegisterTopics": ["whisper"]
> }
> ```

### Mail Server

In order to run a regular Whisper node that can be found by other nodes and added as a peer, use `-mailserver` and `-register` flags:

```bash
$ ./build/bin/statusd -register -mailserver
```

> `-mailserver` is a shortcut that loads the following [JSON config](https://github.com/status-im/status-go/blob/develop/config/cli/mailserver-enabled.json):
> ```json
> {
>     "WhisperConfig": {
>         "Enabled": true,
>         "EnableNTPSync": true,
>         "EnableMailServer": true,
>         "MailServerPassword": "status-offline-inbox"
>     }
> }
> ```

> `-register` populates `RegisterTopics` setting in the config. Together with `-mailserver`, the equivalent is:
> ```json
> {
>     "RegisterTopics": ["whispermail"]
> }
> ```

## Tutorial

### Read Messages From Public Chats

TBD
