---
id: desktop
title: Build Desktop
---

# Build Status Desktop for Yourself!

## Prerequisites

You will need the following tools installed:
  - Clojure CLI tool `clj` https://clojure.org/guides/getting_started#_installation_on_mac_via_code_brew_code
  - Node.js v.8.9.4, npm 5.5.1 (can be installed via `npm install -g npm@5.5.1`)
  - CMake 3.1.0 or higher
  - Additional packages: `extra-cmake-modules`; Keychain access on `Linux` requires `libgnome-keyring0`.
    - Linux: `sudo apt install extra-cmake-modules libgnome-keyring0`
    - MacOS: `brew install kde-mac/kde/kf5-extra-cmake-modules`
  - Qt 5.11.2 or higher. You'll only need macOS and QtWebEngine components installed. 
    - Linux: Qt 5.11.2 is available here: https://download.qt.io/archive/qt/5.11/5.11.2/qt-opensource-linux-x64-5.11.2.run

## Qt setup

Set Qt's environment variables: 
  - `QT_PATH` should point to the location of Qt's distribution, e.g. `/Users/<user_name>/Qt/5.11.2`. It should not end with a slash.
  - add qmake to PATH via 
    - On MacOS: `export PATH=<QT_PATH>/clang_64/bin:$PATH`
    - On Linux: `export PATH=<QT_PATH>/gcc_64/bin:$PATH`

# Building a release package

Run the following commands to build a Desktop package for the host environment (Linux or Mac OS):

``` bash
git clone https://github.com/status-im/status-react.git
cd status-react
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

## To setup dev builds of status-react for Desktop

1. Run the following commands:
    ``` bash
    git clone https://github.com/status-im/status-react.git
    cd status-react
    make prepare-desktop
    ```
1. In separate terminal tab: `npm start` (note: it starts react-native packager )
1. In separate terminal tab: `node ./ubuntu-server.js`
1. In separate terminal tab: `make watch-desktop` (note: wait until sources are compiled)
1. In separate terminal tab: `react-native run-desktop`

### Notes

in order to run both release and dev versions of Status Desktop, please specify a value for `REACT_SERVER_PORT` environment variable that will be different from default 5000. E.g.:

```bash
export REACT_SERVER_PORT=5001
```

for complete cleanup of generated files and Realm data, issue:

```bash
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
rm -rf ~/.local/share/Status \
       ~/.cache/Status \
       $STATUS_REACT_HOME/status-react/default.realm*
```

### On a Mac

Go to `~/Library/Application Support/` and delete any Status directories. Delete the app in `/Application`. Then reinstall.

## Editor setup

Running `make watch-desktop` will run a REPL on port 7888 by default. Some additional steps might be needed to connect to it.

### emacs-cider

In order to get REPL working, put the following config in `.dir-locals.el` :

``` elisp
((nil . ((cider-cljs-repl-types . ((figwheel-repl "(do (require 'figwheel-sidecar.repl-api) (figwheel-sidecar.repl-api/cljs-repl))"
                                                  cider-check-figwheel-requirements)))
         (cider-default-cljs-repl . figwheel-repl))))
```

Then connect to the repl with `cider-connect-cljs` (default is localhost on port 7888)

### vim-fireplace

For some reason there is no `.nrepl-port` file in project root, so `vim-fireplace` will not be able to connect automatically. You can either:

- run `:Connect` and answer a couple of interactive prompts
- create `.nrepl-port` file manually and add a single line containing `7888` (or whatever port REPL is running on)

After Figwheel has connected to the app, run the following command inside Vim, and you should be all set:

``` clojure
:Piggieback (figwheel-sidecar.repl-api/repl-env)
```

## Configure logging output destination

- Be default, application adds debug output into standard process output stream.
- Passing `BUILD_FOR_BUNDLE` preprocessor make flag instructs application to redirect output to predefined log file. On Linux usually it's `~/.local/share/Status/Status.log`; MacOS: `~/Library/Application Support/Status/Status.log`.
- Setting env var `STATUS_LOG_FILE_ENABLED` to `1` enables redirection of logs into log file by predefined path. On Linux usually it's `~/.local/share/Status/StatusDev.log`; MacOS: `~/Library/Application Support/Status/StatusDev.log`.
- Setting env var `STATUS_LOG_PATH` (along with `STATUS_LOG_FILE_ENABLED` to `1`) instructs app to write the logs into custom file path. Relative file path can be used.
