---
id: build_desktop
title: Build Desktop
---

# Prerequisites

lein, node.js v.8, cmake, Qt 5.9.1 (with QtWebEngine components installed), Qt's qmake available in PATH. If building on Ubuntu newer than 16.10, then Qt 5.10.1 is recommended (although not fully tested).

Qt 5.9.1 for Linux is available here: https://download.qt.io/archive/qt/5.9/5.9.1/qt-opensource-linux-x64-5.9.1.run

Note: add qmake to PATH via

- On MacOS: `export PATH=<QT_PATH>/clang_64/bin:$PATH`
- On Linux: `export PATH=<QT_PATH>/gcc_64/bin:$PATH`

Caveats:

- If npm hangs at some step, check the version. If it's 5.6.0 or higher, try downgrading to 5.5.1 via `npm install -g npm@5.5.1`

# Building a release package

Run the following commands to build a Desktop package for the host environment (Linux or Mac OS):

``` bash
make setup
make prepare-desktop
make release-desktop
```

# Development environment setup

## To install react-native-cli with desktop commands support

``` bash
git clone https://github.com/status-im/react-native-desktop.git
cd react-native-desktop/react-native-cli
npm update
npm install -g
```

## To setup re-natal dev builds of status-react for Desktop

1. Run the following commands:
    ``` bash
    git clone https://github.com/status-im/status-react.git
    cd status-react
    scripts/prepare-for-platform.sh desktop
    npm install
    ln -sf './node_modules/re-natal/index.js' './re-natal'
    ./re-natal use-figwheel
    ./re-natal enable-source-maps
    ```
1. In separate terminal tab: `npm start` (note: it starts react-native packager )
1. In separate terminal tab: `node ./ubuntu-server.js`
1. In separate terminal tab: `lein figwheel-repl desktop` (note: wait until sources are compiled)
1. In separate terminal tab: `react-native run-desktop`

## Editor setup

Running `lein figwheel-repl desktop` will run a REPL on port 7888 by default. Some additional steps might be needed to connect to it.

### emacs-cider

In order to get REPL working, use the below elisp code:

``` clojure
(defun custom-cider-jack-in ()
  (interactive)
  (let ((status-desktop-params "with-profile +figwheel repl"))
    (set-variable 'cider-lein-parameters status-desktop-params)
    (message "setting 'cider-lein-parameters")
    (cider-jack-in)))

(defun start-figwheel-cljs-repl ()
  (interactive)
  (set-buffer "*cider-repl status-react*")
  (goto-char (point-max))
  (insert "(do (use 'figwheel-api)
           (start [:desktop])
           (start-cljs-repl))")
  (cider-repl-return))
```

`custom-cider-jack-in` sets the correct profile for leiningen, and can be run as soon as emacs is open.
run `start-figwheel-cljs-repl` once you already have a cider repl session from the jack-in

### vim-fireplace

For some reason there is no `.nrepl-port` file in project root, so `vim-fireplace` will not be able to connect automatically. You can either:

- run `:Connect` and answer a couple of interactive prompts
- create `.nrepl-port` file manually and add a single line containing `7888` (or whatever port REPL is running on)

After Figwheel has connected to the app, run the following command inside Vim, and you should be all set:

``` clojure
:Piggieback (figwheel-sidecar.repl-api/repl-env)
```
