---
id: build_desktop
title: Build Desktop
---

# Prerequisites

You will need the following tools installed:
  - Leiningen (Clojure build tool, get it from https://leiningen.org)
  - Node.js v.8
  - CMake 3.1.0 or higher
  - Qt 5.11.2. You'll only need macOS and QtWebEngine components installed. 


## Qt setup

Set Qt's environment variables: 
  - `QT_PATH` should point to the location of Qt's distribution, e.g. `/Users/<user_name>/Qt/5.11.2`. It should not end with a slash.
  - add qmake to PATH via 
    - On MacOS: `export PATH=<QT_PATH>/clang_64/bin:$PATH`
    - On Linux: `export PATH=<QT_PATH>/gcc_64/bin:$PATH`

Qt 5.11.2 for Linux is available here: https://download.qt.io/archive/qt/5.11/5.11.2/qt-opensource-linux-x64-5.11.2.run

## Caveats

- If npm hangs at some step, check the version. If it's 5.6.0 or higher, try downgrading to 5.5.1 via `npm install -g npm@5.5.1`

# Building a release package

Run the following commands to build a Desktop package for the host environment (Linux or Mac OS):

``` bash
git clone https://github.com/status-im/status-react.git
cd status-react
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

### Install dependencies

Usage of snorenotify introduced dependency on additional dev package to be installed in development environment:

Linux:
```sudo apt install extra-cmake-modules```

MacOS:
```brew install kde-mac/kde/kf5-extra-cmake-modules```

## To setup re-natal dev builds of status-react for Desktop

1. Run the following commands:
    ``` bash
    git clone https://github.com/status-im/status-react.git
    cd status-react
    make dev-desktop
    ```
1. In separate terminal tab: `npm start` (note: it starts react-native packager )
1. In separate terminal tab: `node ./ubuntu-server.js`
1. In separate terminal tab: `lein figwheel-repl desktop` (note: wait until sources are compiled)
1. In separate terminal tab: `react-native run-desktop`

### Notes: ###
 - in order to run both release and dev versions of Status Desktop, please specify a value for `REACT_SERVER_PORT` environment variable that will be different from default 5000. E.g.:
   ```
   export REACT_SERVER_PORT=5001
   ```
  - for complete cleanup of generated files and Realm data, issue:
    ```
    git clean -fdx
    rm -rf desktop/modules
    ```

## Clean up data

To completely clean up data from previous development sessions, such as accounts, you need to do the following:

### On Linux

``` bash
# First kill the `ubuntu-server` process because it has a cache of realm db
killall ubuntu-server

# Then remove data and cache folders
rm -rf ~/.local/share/StatusIm \
       ~/.cache/StatusIm \
       $STATUS_REACT_HOME/status-react/default.realm*
```

### On a Mac

Go to `~/Library/Application Support/` and delete any Status directories. Delete the app in `/Application`. Then reinstall.

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
    (cider-jack-in '())))

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

Note: on my setup I had to rename the repl buffer with `rename-buffer` to "*cider-repl status-react*", then
rename it again after running `start-figwheel-cljs-repl`.

### vim-fireplace

For some reason there is no `.nrepl-port` file in project root, so `vim-fireplace` will not be able to connect automatically. You can either:

- run `:Connect` and answer a couple of interactive prompts
- create `.nrepl-port` file manually and add a single line containing `7888` (or whatever port REPL is running on)

After Figwheel has connected to the app, run the following command inside Vim, and you should be all set:

``` clojure
:Piggieback (figwheel-sidecar.repl-api/repl-env)
```
