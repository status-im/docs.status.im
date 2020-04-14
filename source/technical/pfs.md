---
id: whisper_pss
title: Status Perfect Forward Secrecy Whitepaper
description: You can find the protocols used by Status to achieve Perfect Forward Secrecy.
---

Status Perfect Forward Secrecy Whitepaper
====

## 1. Introduction

This whitepaper describes the protocols used by Status to achieve Perfect Forward Secrecy for 1:1 chat participants. It builds on the [X3DH](https://signal.org/docs/specifications/x3dh/) and [Double Ratchet](https://signal.org/docs/specifications/doubleratchet/) specifications from Open Whisper Systems, with some adaptations to operate in a decentralized environment.

### 1.1. Definitions

- **Perfect Forward Secrecy** is a feature of specific key-agreement protocols which provide assurances that your session keys will not be compromised even if the private keys of the participants are compromised. Specifically, past messages cannot be decrypted by a third-party who manages to get a hold of a private key.

- **Secret channel** describes a communication channel where Double Ratchet algorithm is in use.

### 1.2. Design Requirements

- **Confidentiality**

  The adversary should not be able to learn what data is being exchanged between two Status clients.

- **Authenticity**

  The adversary should not be able to cause either endpoint of a Status 1:1 chat to accept data from any third party as though it came from the other endpoint.

- **Forward Secrecy**

  The adversary should not be able to learn what data was exchanged between two Status clients if, at some later time, the adversary compromises one or both of the endpoint devices.

### 1.3. Conventions

Types used in this specification are defined using [Protobuf](https://developers.google.com/protocol-buffers/). Protocol buffers are a language-neutral, platform-neutral, extensible mechanism for serializing structured data.

### 1.4. Transport Layer

[Whisper](./index.html) serves as the transport layer for the Status chat protocol. Whisper is a hybrid P2P/DHT communication protocol which delivers messages probabilistically. It is designed to provide configurable levels of darkness and plausible deniability at the expense of high-latency and relatively high bandwidth.

### 1.5. User flow for 1-to-1 communications

#### 1.5.1. Account generation

Generating a user account in Status involves 3 steps:

- Generation of a random seed, and the respective account;
- Generation of a X3DH bundle. This prekey bundle will become part of the user's contact code;
- Registration with Push Notification platform.

#### 1.5.2. Account recovery

If Alice later recovers her account, the Double Ratchet state information will not be available, so she is no longer able to decrypt any messages received from existing contacts.

If an incoming message (on the same Whisper topic) fails to decrypt, a message is replied with the current bundle, so that the other end is notified of the new device. Subsequent communications will use this new bundle.

## 2. Messaging

All messaging in Status is subject to end-to-end encryption to provide users with a strong degree of privacy and security.

### 2.1. End-to-end encryption

End-to-end encryption (E2EE) takes place between two clients. The main cryptographic protocol is a [Status implementation](https://github.com/status-im/doubleratchet/) of the Double Ratchet protocol, which is in turn derived from the [Off-the-Record protocol](https://otr.cypherpunks.ca/Protocol-v3-4.1.1.html), using a different ratchet. The message payload is subsequently encrypted by the transport protocol - Whisper (see section [1.4](#14-Transport-Layer)) -, using symmetric key encryption. 
Furthermore, Status uses the concept of prekeys (through the use of [X3DH](https://signal.org/docs/specifications/x3dh/)) to allow the protocol to operate in an asynchronous environment. It is not necessary for two parties to be online at the same time to initiate an encrypted conversation.

Status uses the following cryptographic primitives:
- Whisper
    - AES-256-GCM
    - KECCAK-256
- X3DH
    - Elliptic curve Diffie-Hellman key exchange (secp256k1)
    - KECCAK-256
    - ECDSA
    - ECIES
- Double Ratchet
    - HMAC-SHA-256 as MAC
    - Elliptic curve Diffie-Hellman key exchange (Curve25519)
    - AES-256-CTR with HMAC-SHA-256 and IV derived alongside an encryption key

    Key derivation is done using HKDF.

### 2.2. Prekeys

Every client initially generates some key material which is stored locally:
- Identity keypair based on secp256k1 - $IK$;
- A signed prekey based on secp256k1 - $SPK$;
- A prekey signature - <i>Sig($IK$, Encode($SPK$))</i>

Prekey bundles are exchanged through QR codes, contact codes, 1:1 or public chat messages. *We will be updating this document with information about bundle exchange through [ENS](https://ens.domains/) and [Swarm](https://swarm-guide.readthedocs.io/en/latest/introduction.html) as work progresses and technologies become more usable.*

### 2.3. Bundle retrieval

X3DH works by having client apps create and make available a bundle of prekeys (the X3DH bundle) that can later be requested by other interlocutors when they wish to start a conversation with a given user.

In the X3DH specification, a shared server is typically used to store bundles and allow other users to download them upon request. Given Status' goal of decentralization, Status chat clients cannot rely on the same type of infrastructure and must achieve the same result using other means. By growing order of convenience and security, the considered approaches are:
- contact codes;
- public and one-to-one chats;
- QR codes;
- ENS record;
- Decentralized permanent storage (e.g. Swarm, IPFS).
- Whisper

Since bundles stored in QR codes or ENS records cannot be updated to delete already used keys, the approach taken is to rotate more frequently the bundle (once every 24 hours), which will be propagated by the app through the channel available.

### 2.4. 1:1 chat contact request

There are two phases in the initial negotiation of a 1:1 chat:
1. **Identity verification** (e.g., face-to-face contact exchange through QR code, Identicon matching). A QR code serves two purposes simultaneously - identity verification and initial bundle retrieval;
1. **Asynchronous initial key exchange**, using X3DH.

#### 2.4.1. Initial key exchange flow (X3DH)

The initial key exchange flow is described in [section 3 of the X3DH protocol](https://signal.org/docs/specifications/x3dh/#sending-the-initial-message), with some additional context:
- The users' identity keys $IK_A$ and $IK_B$ correspond to their respective Status chat public keys;
- Since it is not possible to guarantee that a prekey will be used only once in a decentralized world, the one-time prekey $OPK_B$ is not used in this scenario;
- Bundles are not sent to a centralized server, but instead served in a decentralized way as described in [section 2.3](#23-Bundle-retrieval).

Bob's prekey bundle is retrieved by Alice, however it is not specific to Alice. It contains:

([protobuf](https://github.com/status-im/status-go/blob/a904d9325e76f18f54d59efc099b63293d3dcad3/services/shhext/chat/encryption.proto#L12))

``` protobuf
// X3DH prekey bundle
message Bundle {

  bytes identity = 1;

  map<string,SignedPreKey> signed_pre_keys = 2;

  bytes signature = 4;

  int64 timestamp = 5;
}
```
- `identity`: Identity key $IK_B$
- `signed_pre_keys`: Signed prekey $SPK_B$ for each device, indexed by `installation-id`
- `signature`: Prekey signature <i>Sig($IK_B$, Encode($SPK_B$))</i>
- `timestamp`: When the bundle was created locally

([protobuf](https://github.com/status-im/status-go/blob/a904d9325e76f18f54d59efc099b63293d3dcad3/services/shhext/chat/encryption.proto#L5))

``` protobuf
message SignedPreKey {
  bytes signed_pre_key = 1;
  uint32 version = 2;
}
```

The `signature` is generated by sorting `installation-id` in lexicographical order, and concatenating the `signed-pre-key` and `version`:

`installation-id-1signed-pre-key1version1installation-id2signed-pre-key2-version-2`

#### 2.4.2. Double Ratchet

Having established the initial shared secret `SK` through X3DH, we can use it to seed a Double Ratchet exchange between Alice and Bob.

Please refer to the [Double Ratchet spec](https://signal.org/docs/specifications/doubleratchet/) for more details.

The initial message sent by Alice to Bob is sent as a top-level `ProtocolMessage` ([protobuf](https://github.com/status-im/status-go/blob/a904d9325e76f18f54d59efc099b63293d3dcad3/services/shhext/chat/encryption.proto#L65)) containing a map of `DirectMessageProtocol` indexed by `installation-id` ([protobuf](https://github.com/status-im/status-go/blob/1ac9dd974415c3f6dee95145b6644aeadf02f02c/services/shhext/chat/encryption.proto#L56)):

``` protobuf
message ProtocolMessage {

  Bundle bundle = 1;

  string installation_id = 2;

  repeated Bundle bundles = 3;

  // One to one message, encrypted, indexed by installation_id
  map<string,DirectMessageProtocol> direct_message = 101;

  // Public chats, not encrypted
  bytes public_message = 102;

}
```

- `bundle`: optional bundle is exchanged with each message, deprecated;
- `bundles`: a sequence of bundles
- `installation_id`: the installation id of the sender
- `direct_message` is a map of `DirectMessageProtocol` indexed by `installation-id`
- `public_message`: unencrypted public chat message.

``` protobuf
message DirectMessageProtocol {
  X3DHHeader X3DH_header = 1;
  DRHeader DR_header = 2;
  DHHeader DH_header = 101;
  // Encrypted payload
  bytes payload = 3;
}
```
- `X3DH_header`: the `X3DHHeader` field in `DirectMessageProtocol` contains:

    ([protobuf](https://github.com/status-im/status-go/blob/a904d9325e76f18f54d59efc099b63293d3dcad3/services/shhext/chat/encryption.proto#L47))
    ``` protobuf
    message X3DHHeader {
      bytes key = 1;
      bytes id = 4;
    }
    ```

    - `key`: Alice's ephemeral key $EK_A$;
    - `id`: Identifier stating which of Bob's prekeys Alice used, in this case Bob's bundle signed prekey.

    Alice's identity key $IK_A$ is sent at the transport layer level (Whisper);

- `DR_header`: Double ratchet header ([protobuf](https://github.com/status-im/status-go/blob/a904d9325e76f18f54d59efc099b63293d3dcad3/services/shhext/chat/encryption.proto#L31)). Used when Bob's public bundle is available:
    ``` protobuf
    message DRHeader {
      bytes key = 1;
      uint32 n = 2;
      uint32 pn = 3;
      bytes id = 4;
    }
    ```
    - `key`: Alice's current ratchet public key (as mentioned in [DR spec section 2.2](https://signal.org/docs/specifications/doubleratchet/#symmetric-key-ratchet));
    - `n`: number of the message in the sending chain;
    - `pn`: length of the previous sending chain;
    - `id`: Bob's bundle ID.

- `DH_header`: Diffie-Helman header (used when Bob's bundle is not available):
    ([protobuf](https://github.com/status-im/status-go/blob/a904d9325e76f18f54d59efc099b63293d3dcad3/services/shhext/chat/encryption.proto#L42))
    ``` protobuf
    message DHHeader {
      bytes key = 1;
    }
    ```
    - `key`: Alice's compressed ephemeral public key.

- `payload`:
    - if a bundle is available, contains payload encrypted with the Double Ratchet algorithm;
    - otherwise, payload encrypted with output key of DH exchange (no Perfect Forward Secrecy).
    -

# 3. Session Management

This section describe how sessions are handled.

A peer is identified by two pieces of data:

1) An `installation-id` which is generated upon creating a new account in the `Status` application
2) Their identity whisper key

## 3.1 Initializiation

A new session is initialized once a successful X3DH exchange has taken place.
Subsequent messages will use the established session until re-keying is necessary.

## 3.2 Concurrent sessions

If two sessions are created concurrently between two peers the one with the symmetric key first in byte order should be used, marking the other has expired.

## 3.3 Re-keying

On receiving a bundle from a given peer with a higher version, the old bundle should be marked as expired and a new session should be established on the next message sent.

## 4. Multi-device support

Multi-device support is quite challenging as we don't have a central place where information on which and how many devices (identified by their respective `installation-id`) belongs to a whisper-identity.

Furthermore we always need to take account recovery in consideration, where the whole device is wiped clean and all the information about any previous sessions is lost.

Taking these considerations into account, the way multi-device information is propagated through the network is through bundles/contact codes, which will contain information about paired devices as well as information about the sending device.

This mean that every time a new device is paired, the bundle needs to be updated and propagated with the new information, and the burden is put on the user to make sure the pairing is successful.

## 4.1 Pairing

When a user adds a new account, a new `installation-id` will be generated. The device should be paired as soon as possible if other devices are present. Once paired the contacts will be notified of the new device and it will be included in further communications.

Any time a bundle from your $IK$ but different `installation-id` is received, the device will be shown to the user and will have to be manually approved, to a maximum of 3. Once that is done any message sent by one device will also be sent to any other enabled device.

Once a new device is enabled, a new contact-code/bundle will be generated which will include pairing information.

The bundle will be propagated to contacts through the usual channels.

Removal of paired devices is a manual step that needs to be applied on each device, and consist simply in disabling the device, at which point pairing information will not be propagated anymore.

## 4.2 Sending messages to a paired group

When sending a message, the peer will send a message to any `installation-id` that they have seen, using pairwise encryption, including their own devices.

The number of devices is capped to 3, ordered by last activity.

## 4.3 Account recovery

Account recovery is no different from adding a new device, and it is handled in exactly the same way.

## 4.4 Partitioned devices

In some cases (i.e. account recovery when no other pairing device is available, device not paired), it is possible that a device will receive a message that is not targeted to its own `installation-id`.
In this case an empty message containing bundle information is sent back, which will notify the receiving end of including this device in any further communication.

# 5. Security Considerations

The same considerations apply as in [section 4 of the X3DH spec](https://signal.org/docs/specifications/x3dh/#security-considerations) and [section 6 of the Double Ratchet spec](https://signal.org/docs/specifications/doubleratchet/#security-considerations), with some additions detailed below.

**_TODO: Add any additional context here not covered in the X3DH and DR specs, e.g.:_**


### To be implemented

## 1. Introduction

#### 1.5.x. Contact request

Once two accounts have been generated (Alice and Bob), Alice can send a contact request with an introductory message to Bob.

There are two possible scenarios, which dictate the presence or absence of a prekey bundle:
1. If Alice is using Bob's public chat key or ENS name, no prekey bundle is present;
1. If Alice found Bob through the app or scanned Bob's QR code, a prekey bundle is embedded and can be used to set up a secure channel as described in section [2.4.1](#241-Initial-key-exchange-flow-X3DH).

Bob receives a contact request, informing him of:
- Alice's introductory message.

If Bob's prekey bundle was not available to Alice, Perfect Forward Secrecy hasn't yet been established. In any case, there are no implicit guarantees that Alice is whom she claims to be, and Bob should perform some form of external verification (e.g., using an Identicon).

If Bob accepts the contact request, a secure channel is created (if it wasn't already), and a visual indicator is displayed to signify that PFS has been established. Bob and Alice can then start exchanging messages, making use of the Double Ratchet algorithm as explained in more detail in section [2.4.2](#242-Double-Ratchet).
If Bob denies the request, Alice is not able to send messages and the only action available is resending the contact request.


## 3.4 Expired session

Expired session should not be used for new messages and should be deleted after 14 days from the expiration date, in order to be able to decrypt out-of-order and mailserver messages.

## 4.3 Stale devices

When a bundle is received from $IK$ a timer is initiated on any `installation-id` belonging to $IK$ not included in the bundle. If after 7 days no bundles are received from these devices they are marked as `stale` and no message will be sent to them.
