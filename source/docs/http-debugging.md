# General information

For debugging we use HTTP server that uses [react-native-http-bridge](https://github.com/alwx/react-native-http-bridge). 
We decided to not work on network discovery at the current stage. All the discovery proposals are available [here](https://gist.github.com/alwx/a911408984791e0e9a80d1ac4302443c).

All the request examples below are given for [HTTPie](https://httpie.org).

# Technical details
* The server runs on port 5561;
* It runs only if **Development mode** (on **Settings** screen) is switched on;
* The content type for both requests and responses is always `application/json`.

# API description

## POST /ping
Simply pings the device.

Request:
```
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
```
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
```
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
```
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
```
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
