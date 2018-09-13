---
id: build_desktop_jenkins
title: Jenkins Setup for Desktop
---

## Mac OS

Qt 5.9.1 can be installed from brew receipt:

```
brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/a505729a8c75aa9e83f31fdcac0223746a88e8e9/Formula/qt.rb
brew link qt --force
ln -s /usr/local/Cellar/qt/5.9.1/mkspecs /usr/local/mkspecs && ln -s /usr/local/Cellar/qt/5.9.1/plugins /usr/local/plugins
```

If Qt is installed from brew package Qt libraries have rpaths which are not correctly processed by `macdeployqt` tool. To overcome `macdeploy` issues during Mac OS .app bundle creation, it's possible to run `macdeployqtfix.py` tool after `macdeployqt` finishes the work:

```
sh ('macdeployqt ' + packageFolder + '/StatusIm.app -always-overwrite -verbose=1 -qmldir="' + scriptPath + '/node_modules/react-native/ReactQt/application/src/" -qmldir="' + scriptPath + '/node_modules/react-native/ReactQt/runtime/src/qml/"')
sh ('python /Users/administrator/macdeployqtfix/macdeployqtfix/macdeployqtfix.py ' + packageFolder + '/StatusIm.app/Contents/MacOs/StatusIm /usr/local/Cellar/qt/5.9.1')

```

## General setup

### react-native-cli

Modified react-native-cli can be installed globally on Jenkins machine from some location.

```
cd ~/
git clone https://github.com/status-im/react-native-desktop.git
cd react-native-desktop/react-native-cli
npm install -g
```
