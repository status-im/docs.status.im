---
id: run_status_node
title: Running Status Node
---

Status Node is an Ethereum client usually running on a server supporting the Status app. As we operate in a decentralized model, we need some peers scattered around the globe to provide a reliable service.

Status Node can run as a Whisper node (providing only Whisper protocol) or a Whisper node with permanent message storage (Mail Server) capability.

## Requirements

Linux or macOS is required.

### Status Node With Whisper Only

You can run Status Node on your laptop or PC. It does need high uptime to join the network. Actually, Status Node works just fine on mobile devices in our mobile app.

### Status Node With Mail Server

The additional requirement for Status Nodes with Mail Server capability enabled is a disk storage. The current data volume collected by a Mail Server within a month is around 600 MB.

### Cloud Providers

Mail Servers need high uptime to collect as many envelopes as possible for later retrieval.

A single server with 1GB of RAM and 1 vCPU should be enough to run Status Node.

## Why To Run Status Node?

Currently, we don't provide any incentivizations for running Status Nodes. We are working hard to solve this problem. Our intent is to increase the size of the Whisper network, hence improve decentralization and safety of our platform.

Another reason is privacy. In the current setup, nodes with Mail Server capability are trusted. That means that such a node can communicate directly with the Status app using p2p connection and some metadata might leak. If one wants to avoid that, the best option is to run a Mail Server on your own and configure it in the Status app.

## How To Run It

First, visit [Build status-go](https://docs.status.im/docs/build_status_go.html) in order to compile a binary.

When you get it, open a Terminal window and run
```bash
$ ./build/bin/statusd -h
```
to learn more about available options.

```bash
$ ./build/bin/statusd
```
will run a regular Whisper node that joins Status production network.

If you need more control, you need to provide a JSON file with a custom configuration. The provided file will override default options.

For example, if you'd like to expose HTTP and IPC interfaces, you need to create a JSON file:

```bash
# file located at ./development.json
{
    "HTTPEnabled": true,
    "IPCEnabled": true
}
```

and the run

```bash
$ ./build/bin/statusd -c ./development.json
```

Check out [this directory](https://github.com/status-im/status-go/tree/develop/config/cli) for more examples.

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
