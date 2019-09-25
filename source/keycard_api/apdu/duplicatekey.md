---
id: apdu_duplicatekey
title: Protocol
---

# DUPLICATE KEY

* CLA = 0x80
* INS = 0xD5
* P1 = subcommand
* P2 = depends on subcommand
* Data = depends on phase
* Response SW = 0x9000 on success.
* Response Data = depends on subcommand
* Preconditions: depends on subcommand
* Capability: Key management

P1:
* 0x00: START DUPLICATE
* 0x01: ADD ENTROPY
* 0x02: EXPORT DUPLICATE
* 0x03: IMPORT DUPLICATE

## START DUPLICATE
This is the first step to start duplication. Requires an open secure channel and user PIN must be verified. Aborts any on-going duplication session. P2 is the number of entropy pieces to expect in total (including this command). The data contain the first piece of entropy. Returns no data. Must be performed with exactly the same parameters and data on all cards taking part in the duplication.

## ADD ENTROPY
This command uses the same one-shot secure channel scheme as defined in the INIT command. P2 is 00. Requires an ongoing duplicate session started with the START DUPLICATE subcommand. Must be performed once per device taking part in the duplication process, for a total number of devices equaling the P2 parameter of the START DUPLICATE subcommand (counting the device which sent the START DUPLICATE command as the first device). The data is a random 256-bit number. The same data must be sent to all the cards taking part in the duplication process.

## EXPORT DUPLICATE
This command must be sent to the card which you wish to duplicate. Requires an open secure channel and authenticated PIN. Works only if a duplication session is active and ADD ENTROPY has been performed the required number of times. Returns the encrypted duplicate of the master key and terminates the duplication session for this card. The format is exactly the same as the one defined in the LOAD KEY (TLV) command with omitted public key. It is however prepended by a 16-bytes IV and the entire TLV structure is encrypted.

## IMPORT DUPLICATE
This command must be sent to all the cards which are a target for duplication. The Data field must contain the output from the EXPORT DUPLICATE command performed on the source card. Returns the key UID. It follows exactly the same rules as the EXPORT DUPLICATE subcommand.
