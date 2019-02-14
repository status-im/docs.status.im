---
id: desktop
title: Build Desktop
---

# Build Status Desktop for Yourself!

# Building a release package

Run the following commands to build a Desktop package for the host environment:

``` bash
git clone https://github.com/status-im/status-react.git
cd status-react
make setup
. ~/.nix-profile/etc/profile.d/nix.sh
make shell
make prepare-desktop
make release-desktop
```

For a Windows build cross-compiled from Linux, replace `make release-desktop` with `make release-windows-desktop`.

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
    make setup
    . ~/.nix-profile/etc/profile.d/nix.sh
    make shell
    make startdev-desktop # note: wait until sources are compiled
    ```

1. In separate terminal tab: `make react-native` (note: it starts react-native packager)
1. In separate terminal tab: `node ./ubuntu-server.js`
1. In separate terminal tab: `make run-desktop`

## Notes

- in order to run multiple Status Desktop instances, please specify values for the `REACT_SERVER_PORT`, `STATUS_NODE_PORT`, `STATUS_DATA_DIR` environment variables:

  ```bash
  export REACT_SERVER_PORT=5001 # any value different from default 5000 will work; this has to be specified for both the Node.JS server process and the Qt process
  export STATUS_NODE_PORT=12345 # no need to specify this if just running dev instance alongside release build
  export STATUS_DATA_DIR=~/status-files/data1 # this is where Realm data files, Geth node data, and logs will reside; also not strictly needed for dev alongside release
  ```

  Please be sure to run the instance with default parameters (without any explicit specification of variables above) first, as otherwise it will kill `ubuntu-server` processes that belong to other instances.

- for complete cleanup of generated files and Realm data, issue:

  ```bash
  git clean -fdx
  rm -rf desktop/modules
  ```

## Clean up data

To completely clean up data from previous development sessions, such as accounts, you need to do the following:

### On Linux

``` bash
# First kill the `ubuntu-server` process because it has a cache of realm db
pkill -f ubuntu-server

# Then remove data and cache folders
rm -rf ~/.local/share/Status \
       ~/.cache/Status \
       $STATUS_REACT_HOME/status-react/default.realm*
```

### On a Mac

Go to `~/Library/Application Support/` and delete any Status directories. Delete the app in `/Application`. Then reinstall.

### On Windows

``` bash
# First kill the `ubuntu-server` process because it has a cache of realm db
tskill ubuntu-server

# Then remove data folder
rd /S /Q %LOCALAPPDATA%\Status
```

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

- By default, application adds debug output into standard process output stream.
- The app data folder location varies per platform. It's usually at:
  - Linux: `~/.local/share/Status/`;
  - MacOS: `~/Library/Application Support/Status/`;
  - Windows: `%LOCALAPPDATA%\Status\`.
- App data folder location can also be specified via `STATUS_DATA_DIR` environment variable
- Passing `BUILD_FOR_BUNDLE` preprocessor make flag instructs application to redirect output to predefined log file. The log file is named `Status.log` in the app data folder;
- Setting env var `STATUS_LOG_FILE_ENABLED` to `1` enables redirection of logs into log file by predefined path. The log file is named `StatusDev.log` in the app data folder.
- Setting env var `STATUS_LOG_PATH` (along with `STATUS_LOG_FILE_ENABLED` to `1`) instructs app to write the logs into custom file path. Relative file paths can be used.
- Specific [react-native-desktop](https://github.com/status-im/react-native-desktop) output can be controlled with standard Qt environment variables, as documented in the [react-native-desktop FAQ](https://github.com/status-im/react-native-desktop/blob/master/docs/FAQ.md#how-do-i-control-qt-logging).
