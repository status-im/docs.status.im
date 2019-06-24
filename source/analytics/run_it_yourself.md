---
id: run_it_yourself
title: Run Our Analytics Yourself and See What You Discover
---

# Run Our Analytics Yourself and See What You Discover

### SETUP

sudo apt-get install python-pip
sudo pip install python-dateutil

TODO: -1 vs -2 trailing /

#### TODO: Should just work in dir and go everywhere there

```
./mac.py ~/git-analytics/crypto/bitcoin/ ~/git-analytics/crypto/ccxt/ ~/git-analytics/crypto/go-ethereum/ 
~/git-analytics/crypto/litecoin/ ~/git-analytics/crypto/lnd/ ~/git-analytics/crypto/mist/ 
~/git-analytics/crypto/parity/ ~/git-analytics/crypto/solidity/ ~/git-analytics/crypto/status-react/ 
~/git-analytics/crypto/web3.js/ > crypto-mac.csv
```
```
scp blue:~/git-analytics/crypto/crypto-mac.csv .
cat foo.csv | pbcopy
```
#### TODO

- TODO: Make absolute time graph 2 MAC automated with right time period (no manual excel stuff)
- TODO: Do MAC on biggest OSS like with Crypto OSS
- TODO: Write script for automatically checking M3 retention
- TODO: Do M3 retention check for Crypto/biggest OSS

#### Crypto OSS

oskarth@blue:~/git-analytics$ cat crypto-list.txt
https://github.com/bitcoin/bitcoin.git
https://github.com/ccxt/ccxt.git
https://github.com/litecoin-project/litecoin.git
https://github.com/lightningnetwork/lnd.git
https://github.com/status-im/status-react.git
https://github.com/ethereum/go-ethereum.git
https://github.com/ethereum/mist.git
https://github.com/ethereum/web3.js.git
https://github.com/paritytech/parity.git
https://github.com/ethereum/solidity.git
https://github.com/status-im/status-react.git

#### Big OSS

https://github.com/search?q=stars:%3E1&s=stars&type=Repositories

Selection of that seems to be real projects (not just random docs) and have lots of contributors. Based on first two pages quick scanning:

Also using: http://gitmostwanted.com/

https://github.com/twbs/bootstrap.git
https://github.com/tensorflow/tensorflow.git
https://github.com/facebook/react.git
https://github.com/facebook/react-native.git
https://github.com/torvalds/linux.git
https://github.com/electron/electron.git
https://github.com/jquery/jquery.git
https://github.com/nodejs/node.git
https://github.com/Microsoft/vscode.git
https://github.com/atom/atom.git
https://github.com/apple/swift.git
https://github.com/rails/rails.git
https://github.com/golang/go.git
https://github.com/angular/angular.js.git
https://github.com/opencv/opencv.git
https://github.com/git/git.git
https://github.com/Leaflet/Leaflet.git

TODO: Easy -24m do
TODO Manually clone: random:
https://github.com/llvm-mirror/llvm.git
https://github.com/freebsd/freebsd.git
https://github.com/chromium/chromium.git
https://github.com/mozilla/gecko-dev.git
https://github.com/aosp-mirror/platform_frameworks_base.git
https://github.com/apache/cassandra.git
https://github.com/apache/spark.git
https://github.com/apache/incubator-mxnet.git
https://github.com/apache/storm.git
https://github.com/clojure/clojurescript.git

`for i in $(cat list.txt); do git clone $i; done`


### Helpful Links

https://docs.google.com/spreadsheets/d/1B9rEC-pxS3-1c_FfevHi0TK9pNJRDLif5NtkpsFKJ30/edit#gid=0

http://startupclass.samaltman.com/courses/lec06/

https://en.wikipedia.org/wiki/Cohort_analysis