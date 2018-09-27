Status Perfect Forward Secrecy Whitepaper (extref)
====

[TOC]

## 1. Introduction

This whitepaper describes protocols used by Status to achieve Perfect Forward Secrecy for 1:1 chat participants. It builds on the [X3DH](https://signal.org/docs/specifications/x3dh/) and [Double Ratchet](https://signal.org/docs/specifications/doubleratchet/) specifications from Open Whisper Systems, with some adaptations to operate in a decentralized environment.

### 1.1. Definition

Perfect Forward Secrecy is a feature of specific key-agreement protocols which provide assurances that your session keys will not be compromised even if the private keys of the participants are compromised. Specifically, past messages cannot be decrypted by a third-party who manages to get a hold of a private key.

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

TODO (Whisper)

## 2. Messaging

All messaging in Status is subject to end-to-end encryption to provide users with a strong degree of privacy and security.

### 2.1. End-to-end encryption

End-to-end encryption (E2EE) takes place between two clients. The main cryptographic protocol is a [Status implementation](https://github.com/status-im/doubleratchet/) of the Double Ratchet protocol, which is in turn derived from the [Off-the-Record protocol](https://otr.cypherpunks.ca/Protocol-v3-4.1.1.html), using a different ratchet. The message payload is subsequently encrypted by the transport protocol - Whisper (see section [1.4](#14-Transport-Layer) _TODO_) -, using symmetric key encryption. 
Furthermore, Status uses the concept of prekeys (through the use of [X3DH](https://signal.org/docs/specifications/x3dh/)) to allow the protocol to operate in an asynchronous environment. It is not necessary for two parties to be online at the same time to initiate an encrypted conversation.

Status uses the following cryptographic primitives:
- Whisper
    - AES-256-GCM
    - KECCAK-256
- Double Ratchet
    - HMAC-SHA256 as MAC
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

X3DH works by having client apps create a bundle of prekeys (the X3DH bundle) that can be requested by other interlocutors when they wish to start a conversation with a given user.

In the X3DH specification, a shared server is typically used to store bundles and allow other users to download them upon request. Given Status's goal of decentralization, it cannot rely on the same type of infrastructure and must achieve the same result using other means. By growing order of convenience and security, the considered approaches are:
- contact codes;
- public and one-to-one chats;
- QR codes;
- ENS record;
- Swarm storage.

Since bundles stored in QR codes or ENS records cannot be updated to delete already used keys, the approach is to provide an initial generic bundle without one-time prekeys, and subsequently provide a second user-specific X3DH prekey bundle.

### 2.4. 1:1 chat contact request

There are two phases in the initial negotiation of a 1:1 chat:
1. **Identity verification** (e.g., face-to-face contact exchange through QR code, Identicon matching). A QR code serves two purposes simultaneously - identity verification and initial bundle retrieval;
1. **Asynchronous initial key exchange**, using X3DH. X3DH is typically based on the premise of having online storage accessible by both parties. Since decentralization is a core design goal for Status, alternative solutions for bundle management must be used.

#### 2.4.1. Initial key exchange flow (X3DH)

The initial key exchange flow is described in [section 3 of the X3DH protocol](https://signal.org/docs/specifications/x3dh/#sending-the-initial-message), with some additional context:
- The users' identity keys $IK_A$ and $IK_B$ correspond to their respective Status chat public keys. 
- A one-time prekey $OPK_B$ is not used in this scenario (_TODO: add context_);
- Bundles are not sent to a centralized, but instead served in a decentralized way as described in section [2.3](#23-Bundle-retrieval).

Bob's prekey bundle retrieved by Alice, is not specific to Alice. It contains:

([protobuf](https://github.com/status-im/status-go/blob/features%2Fx3dh/services/shhext/chat/encryption.proto#L5))
``` protobuf
message Bundle {
  bytes identity = 1;
  bytes signed_pre_key = 2;
  bytes signature = 3;
}
```

The initial message sent by Alice to Bob is sent as a `ProtocolMessage` ([protobuf](https://github.com/status-im/status-go/blob/features%2Fx3dh/services/shhext/chat/encryption.proto#L41)) containing a `DirectMessageProtocol` ([protobuf](https://github.com/status-im/status-go/blob/features%2Fx3dh/services/shhext/chat/encryption.proto#L34)):

``` protobuf
message ProtocolMessage {
  Bundle bundle = 1;

  oneof message_type {
    DirectMessageProtocol direct_message = 101;

    bytes public_message = 102;
  }
}
```

``` protobuf
message DirectMessageProtocol {
  X3DHHeader X3DH_header = 1;
  DRHeader DR_header = 2;
  DHHeader DHHeader = 101;
  bytes payload = 3;
}
```

The `X3DHHeader` ([protobuf](https://github.com/status-im/status-go/blob/features%2Fx3dh/services/shhext/chat/encryption.proto#L27)) field in `DirectMessageProtocol` contains:

- Alice's ephemeral key $EK_A$;
- Identifier stating which of Bob's prekeys Alice used, in this case Bob's bundle signed prekey. (_TODO: confirm with @camellos_)

``` protobuf
message X3DHHeader {
  bytes key = 1;
  bytes id = 4;
}
```

Alice's identity key $IK_A$ is sent at the transport layer level (Whisper) (TODO: confirm with @camellos)

#### 2.4.2. Double Ratchet

Now that the initial shared secret `SK` has been established, we can use that to start a Double Ratchet algorithm between Alice and Bob.

Please refer to the [Double Ratchet spec](https://signal.org/docs/specifications/doubleratchet/) for more details.

``` protobuf
message DRHeader {
  bytes key = 1;
  uint32 n = 2;
  uint32 pn = 3;
  bytes id = 4;
}
```

``` protobuf
message DHHeader {
  bytes key = 1;
}
```

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

On receiving a new bundle from a given peer, the old bundle should be marked as expired and a new session should be established on the next message sent.

## 3.4 Expired session

Expired session should not be used for new messages and should be deleted after 7 days from the expiration date, in order to be able to decrypt out-of-order and mailserver messages.

## 4. Multi-device support

Multi-device support is quite challenging as we don't have a central place where information on which and how many devices (identified by their respective `installation-id`) belongs to a whisper-identity.
Furthermore we always need to take wallet recovery in consideration, where the whole device is wiped clean and all the information about previous sessions is lost.

Taking these considerations into account, the way multi-device information is propagated through the network is through bundles/contact codes, which will contain information about paired devices as well as information about the sending device.

This mean that every time a new device is paired, the bundle needs to be updated and propagated with the new information, and the burden is put on the user to make sure the pairing is successful.

## 4.1 Pairing algorithm

Pairing is either initiated by the user, or devices might receive pairing messages if a pairing group already exists.

Currently the algorithm is fairly simple and relies on the user to make sure their device are up-to-date.

Any message send to it's own $IK$ can trigger updates in the pairing group membership, it is important that the user should be notified and asked to approve any changes in membership.

Upon receiving a new bundle from it's own $IK$ the following operation are performed:

1) For each signed-pre-key if the local version is < then the one received or is missing, the local version will be updated/added.
2) If the received bundle is missing the receiving installation-id, the bundle will be updated with the receiving installation-id and current signed-pre-key/version, and the pairing version will be increased by one, upon confirmation from the user a reply message will be sent, containing the updated bundle.
3) If the version of the pairing is higher then the local version any new device present in the bundle will be added upon confirmation from the user.

Currently removal of paired devices is not supported.

# 4. Security Considerations

## 4.1. Authentication

## 4.2. Protocol replay

## 4.3. Replay and key reuse

## 4.4. Deniability

## 4.5. Signatures

## 4.6. Key compromise

## 4.7. Mail server trust

## 4.8. Identity binding 

...
