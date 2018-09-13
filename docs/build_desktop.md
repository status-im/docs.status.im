---
id: build_desktop
title: Build Desktop
---

## Prerequisites:
lein, node.js v.8 , cmake, cmake-extra-modules, Qt 5.9.1, Qt's qmake available in PATH

cmake-extra-modules can be installed by running:
```
Linux:
sudo apt install extra-cmake-modules

MacOS:
brew install kde-mac/kde/kf5-extra-cmake-modules
```

Note: add qmake to PATH via:
```
Linux:
export PATH=<QT_PATH>/gcc_64/bin:$PATH

MacOS:
export PATH=<QT_PATH>/clang_64/bin:$PATH
```

Caveats:
  - if npm hangs at some step, check the version. If it's 5.6.0, try downgrading to 5.5.1 via `npm install -g npm@5.5.1`

# To install react-native-cli with desktop commands support:
1. git clone https://github.com/status-im/react-native-desktop.git
2. cd react-native-desktop/react-native-cli
3. npm update
4. npm install -g

# To setup re-natal dev builds of status-react for Desktop:
1. git clone https://github.com/status-im/status-react.git
2. cd status-react
3. scripts/prepare-for-platform.sh desktop
4. npm install
5. lein deps
6. ./re-natal use-figwheel (run `ln -s node_modules/re-natal/index.js re-natal` if you don't have `re-natal`)
7. ./re-natal enable-source-maps
8. In separate terminal tab: `npm start` (note: it starts react-native packager )
9. In separate terminal tab: node ./ubuntu-server.js
10. In separate terminal tab: lein figwheel-repl desktop (note: wait until sources compiled)
11. In separate terminal tab: react-native run-desktop