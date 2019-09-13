---
id: http_debugging
title: Debugging
---

# General information

Status uses an HTTP server for debugging. When you turn on **Development mode** (`Profile` -> `Advanced` -> `Development Mode`) you start this server.
After that, you're able to communicate to Status by sending HTTP requests. 

This document describes all the possible requests and expected responses. All the examples here are given for HTTPie.  Of course, you can use any other tool for HTTP communication instead.

## Technical details

* The server runs on port 5561;
* It runs only if **Development mode** is switched on
* Its settings are linked to your account — the server stops when you log out and starts when you log in;
* The content type for both requests and responses is always `application/json`.

# API description

## POST /ping

Simply pings the device.

Request:

``` bash
http -v POST localhost:5561/ping
```

Response:

```
HTTP/1.1 200 OK
{
    "message": "Pong!"
}
```

## POST /dapp/open

Opens a DApp with a specified `url`

Request:

``` bash
http -v --json POST localhost:5561/dapp/open url=<dapp_url>
```

Response:

```
HTTP/1.1 200 OK
{
    "message": "URL has been opened."
}
```

## POST /network

Adds a new network to the list of networks.
Expects 4 fields:

* `name` — the name of your network;
* `url` — the url of it;
* `chain` — type of network (theoretically, can be any name);
* `network-id` — id of the network (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids).

Request:

``` bash
http -v --json POST localhost:5561/network name=AnyNetworkName url=http://localhost:3000 chain=mainnet network-id=2
```

Response:

```
HTTP/1.1 200 OK
{
    "message": "Network has been added.",
    "network-id": "1535660846036b3c3241022ec5046af53cdb769dcc216"
}
```

```
HTTP/1.1 400 Bad Request
{
    "message": "Please, check the validity of network information."
}
```

## POST /network/connect

Switches to a network with a specified `id`. The network should be created first!

Request:

``` bash
http -v --json POST localhost:5561/network/connect id=1535660846036b3c3241022ec5046af53cdb769dcc216
```

Response:

```
HTTP/1.1 200 OK
{
    "message": "Network has been connected.",
    "network-id": "1535660846036b3c3241022ec5046af53cdb769dcc216"
}
```

```
HTTP/1.1 400 Bad Request
{
    "message": "The network id you provided doesn't exist."
}
```

## DELETE /network

Deletes a network with a specified `id`. `400 Bad Request` can be returned if the network doesn't existed or when it's a current one.

Request:

``` bash
http -v --json DELETE localhost:5561/network id=1535660846036b3c3241022ec5046af53cdb769dcc216
```

Response:

```
HTTP/1.1 200 OK
{
    "message": "Network has been deleted.",
    "network-id": "1535660846036b3c3241022ec5046af53cdb769dcc216"
}
```

```
HTTP/1.1 400 Bad Request
{
    "message": "Cannot delete the provided network."
}
```

## Not found

```
HTTP/1.1 404 Not Found
{
    "message": "Not found (<method> <url>)"
}
```
