---
id: tutorial_basic_cli
title: Getting Started with Swarm
---

## Intro
In this tutorial we'll learn how to use Ethereum's Swarm protocol to host a simple website on Swarm. While everything happens in your console for this tutorial, you should have your console ready. you will be able to unsderstand how to setup, upload and access different kinds of files, as well as the beginnings of what it is possible to build with Swarm. 

This tutorial is intended to provide you with the skills needed to adapt Swarm to your needs. You will be larning about how to set up Swarm and use it.  


We have created this specific document specially for this tutorial. Please feel free to add additional tutorials if you would like to help the community out.

Swarm offers a DDoS-resistant peer - to - peer storage and service solution with zero downtime, fault tolerance and censorship resistance as well as self-sustainability due to an integrated incentive system that uses peer-to-peer accounting and allows trading resources for payment.Swarm offers a local HTTP proxy if installed on a machine, Which is helpful in creating Dapp's. 

Swarm is a **persistent data structure**. Persistent data structures always preserves the previous version of itself when it is modified. Such data structures are effectively as their operations do not (visibly) update the structure in-place, but instead always yield a new updated structure. 

**HAMT - Hash Array Mapped Trie** is one of the best examples for persistent data structures, As they will preserve previous versions of itself on any updates. It is often used to implement a general purpose persistent map data structure. HAMT'S composped of Ideal Hash Trees which are mutable. 

Before we get started, let's make sure all our dependencies are properly set up, especially [install `geth`](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)  and Swarm. We'll be using the latest version of Geth. 

#### Mac OSX
```
Install Homerew
 /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
 brew update 
 /* Just to upgrade */
 brew upgrade
 brew install go
 brew tap ethereum/ethereum 
 brew install ethereum
 brew install ethereum --devel 
 
```

After installing, run`geth account new`to create an account on your node. You can check other options `geth --help`. Alternatively you can build from the source code following the below mentioned instructions.

Clone the Github repo:
```
git clone https://github.com/ethereum/go-ethereum
brew install go
cd go-ethereum
make geth
```
You can now run`build/bin/geth`to start your node.


#### Linux
```
sudo apt-get install software-properties-common 
sudo add-apt-repository -y ppa:ethereum/ethereum 
sudo apt-get update sudo apt-get install ethereum
```

#### Windows
```
chdir <path to extracted binary> 
open geth.exe
```
After successful installtion of Geth, You need to [install Swarm](https://swarm-guide.readthedocs.io/en/latest/installation.html)

#### Install the 
```
go install ./cmd/geth
go install ./cmd/swarm
```
#### Getting Started with Swarm
One Swarm & Geth had successfully installed. A Geth account can be created using the following command

```
Geth account new
/* Set a password for your account */
Passpharse:
Repeat passphrase:
/* A new account will be created */
Address:{3acce0a2760799ad89883949f0332cb4e1052b7a}
```
Once your account is created you start swarm using the following command
```
swarm --bzzaccount 3acce0a2760799ad89883949f0332cb4e1052b7a
/* This will prompt for the passphrase, Pass your passphrase and your swarm will be started */
Passphrase: 
```
You can access the swarm on your browser at `http://localhost:8500`

#### Upload and Retrieve files on swarm
You can use swarm to upload files & Folders. In our case we can upload some files on to swarm with 
```
swarm up filepath
/* This will generate a swarm hash for your file, Which you can access via Your localhost or swarm-gateways*/
8fdc5065b87541c1daf247a15b18e60458d46f1c19a62c8fb35f6002b4f4033c
/* You can access the above swarm hash as shown below*/
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:8500/bzz:/8fdc5065b87541c1daf247a15b18e60458d46f1c19a62c8fb35f6002b4f4033c/
```
The Swarm Hash in the above example should return the following image.

![](https://swarm-gateways.net/bzz:/8fdc5065b87541c1daf247a15b18e60458d46f1c19a62c8fb35f6002b4f4033c/)


By following the same set of instruction you can be able to upload and retrive any files on Swarm. We can use the similar procedure for uploading static html websites. Now that we were able to know how to upload and access files on Swarm. Lets see how we can upload folders on Swarm.

```
swarm --recursive up <<folder path>>
9200062ff5f4c9cf9fee77e396f8e7db6b1ad1fcbd4492b34377aba2e2c82f98
```
Inorder to surpress the manifest you can set the manifest to false while uploading the files. On the other hand you can down load the files from swarm using the `swarm down bzz:/<hash>` command on CLI.

```
/* If you wish to download a directory from the swarm  */
swarm down --recursive bzz:/<hash>
```

Mainfests are used to address http api. Manifests can currently have the empty path as a 'default entry' - a hash that will be loaded when the manifest is addressed on the http api. Manifest entries are key/value pairs resolving keys to hashes; these hashes are either swarm hashes of files or of further manifests. In practice this often means that a manifest might have an empty path entry and an 'index.html' entry that resolve to the same hash. Current manifest implementation stores only the hash for the empty path. Manifest entry type that will allow us to describe metadata entries better and we can this in upcoming updates from swarm.

#### Hosting a website on Swarm
Uploading a website on Swarm is quite straight forward than you think.

```
/* Lets say our File directory is Named as Documents and it got two files Index.htm & swarmlogo.png */
swarm --defaultpath=/home/ubuntu/Documents/index.html --recursive up Documents/
0ed5277b2db1dd0b5b565dd4d09a436c6535953ef466a2a11e1fd17793aab23e
/* In the above instruction we are Passing the index.html which we need to serve when we querry, As a Default Path where as the Recursive up part of the instruction is helpful in uploading the entire file directory to Swarm. */
/* If we upload the directory itself to swarm */
swarm --recursive up Test/
a189e9099d458576e33b80f685d55d1cf866fca23279f4ea51f693910a9ed62c
```
The following manifest will be can be genrated for the Documents directory that we had uploaded.
```
{"entries":[{"hash":"855ed44578437cb0d4fe0ceec60a6badb85fd9ede51df8f94e8e9e4a35f3a87e","path":"index.html","contentType":"text/html; charset=utf-8","mode":420,"size":142,"mod_time":"2018-07-06T15:37:23+02:00"},{"hash":"fdbbdbbd6fcda18714cc7098e1ba64b1051c0a7cff777c4531be6f6fad57db37","path":"swarmlogo.png","contentType":"image/png","mode":420,"size":377098,"mod_time":"2018-04-04T16:15:42+02:00"}]}
```

Inorder for us to access the files we can access them as follows.

```
/* We can access the webpage that we uploaded via the swarm hash as we set the default path to index.html */
https://swarm-gateways.net/bzz:/0ed5277b2db1dd0b5b565dd4d09a436c6535953ef466a2a11e1fd17793aab23e/ 
/* The above url is when we set the default path to index.html the below url is when we upload a directory */
https://swarm-gateways.net/bzz:/a189e9099d458576e33b80f685d55d1cf866fca23279f4ea51f693910a9ed62c/index.html

```
