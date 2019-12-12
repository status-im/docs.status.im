---
id: index
title: Build Status Yourself
---

# Build Status Yourself and Participate in a Better Web

## The easiest way

### Prerequisites

- Linux: `git`, `curl` and `make`
  - Run `sudo apt install -y git curl make` on the terminal
- macOS: Make sure you have `curl` installed

### 1. Clone the repository

```bash
git clone https://github.com/status-im/status-react
cd status-react
```

### 2. Install the dependencies

We created a special script that leverages [Nix](https://nixos.org/nix) to install everything Status needs with minimal impact to the user's system. However, this script has only been tested on macOS (with XCode 11.1), Ubuntu Linux 18.04 and Manjaro. If it doesn't work for you on another Linux distribution, please install all dependencies manually (you can find the list below).
In order to make things as practical as possible, the script will auto-accept the Android SDK license agreements.

If you're on NixOS, please run the following to ensure you have the necessary prerequisites available:

```bash
nix-env --install git gnumake
```

In order to work with status-react, you need to be inside a Nix shell. The makefile targets will ensure you are in a Nix shell, or start one for you implicitly. However, if you're going to be running multiple commands on the same terminal, you might want to start a dedicated Nix shell by running `make shell TARGET=android` (or using other `TARGET`).

The `make shell TARGET=<os>` script prepares and installs the following:

- Java 8
- Clojure and Leiningen
- Node.js (see note below)
- yarn
- React Native CLI and Watchman
- Android SDK
- Android NDK
- Maven
- Cocoapods
- CMake and extra-cmake-modules
- Go
- Python 2.7
- Conan (Linux-only)
- unzip
- wget

*Note 1:* It can take up to 60 minutes depending on your machine and internet connection speed.

*Note 2:* An environment variable called `TARGET` controls the type of shell that is started. If you want to limit the amount of dependencies downloaded, you could run `make shell TARGET=android`. Most of the makefile targets already include a sensible default.

*Note 3:* On macOS, the build environment is set up to rely on XCode 11.1. If you want to use an unsupported version, you'll need to edit the version in [nix/mobile/default.nix](https://github.com/status-im/status-react/blob/develop/nix/mobile/default.nix) file (`xcodewrapperArgs.version`).

## Running development processes

After you installed all the dependencies, you need to run two processes — the build process and React Native packager. Keep both processes running when you develop Status.

### 1. Build process

Just run **one** of these commands in the first terminal window:

```bash
make startdev-ios-simulator
make startdev-ios-real
make startdev-android-avd
make startdev-android-genymotion
make startdev-android-real
```

By doing this you will start the compilation of ClojureScript sources and run re-frisk (a tool for debugging). You should wait until it shows you `Prompt will show when Figwheel connects to your application` before running the React Native packager.

For additional information check the following:

- [clj-rn](https://github.com/status-im/clj-rn);
- [re-frisk](https://github.com/flexsurfer/re-frisk).

### 2. React Native packager

Do this in the second terminal window:

```bash
make react-native-android # (ios and desktop are also available targets)
```

## Build and run the application itself

### iOS (macOS only)

Just execute

```bash
make run-ios
```

If you wish to specify the simulator, just run `make run-ios SIMULATOR="iPhone 7"`.
You can check your available devices by running `xcrun simctl list devices` from the console.

You can also start XCode and run the application there. Execute `open ios/StatusIm.xcworkspace`, select a device/simulator and click **Run**.

*Note:* Of course, you need to install XCode first in both cases. Just go to Mac AppStore to do this.

### Android

Installation script installs Android SDK and Android NDK.

- *Optional:* If you want to use AVD (Android Virtual Device, emulator), please, check [this documentation](https://developer.android.com/studio/run/emulator);
- *Optional:* If you don't like AVD, you can also use [Genymotion](https://genymotion.com);

Once Android SDK is set up, execute:

```bash
make run-android
```

Check the following docs if you still have problems:

- [macOS](https://gist.github.com/patrickhammond/4ddbe49a67e5eb1b9c03);
- [Ubuntu Linux](https://gist.github.com/zhy0/66d4c5eb3bcfca54be2a0018c3058931);
- [Arch Linux](https://wiki.archlinux.org/index.php/android) (can also be useful for other Linux distributions).

## Optional: Advanced build notes

### Building and using forks of status-go

If you need to use a branch of a status-go fork as a dependency of status-react, you can have the scripts build it.

1. Make sure you are in the root of the `status-react` repo and start a Nix shell using `make shell TARGET=android`.
1. Run `scripts/update-status-go.sh <rev>`, where `rev` is a branch name, tag, or commit SHA1 you want to build.

The script will save the indicated commit hash along with other information in the `status-go-version.json` file.

If you are using a GitHub fork of `status-go` repo, export the `STATUS_GO_OWNER` environment variable when running the script.

### Building and using local source repository of status-go

If instead you need to use a locally checked-out status-go repository as a dependency of status-react, you can achieve that by defining the `STATUS_GO_SRC_OVERRIDE`
environment variable.

```sh
export STATUS_GO_SRC_OVERRIDE=$GOPATH/src/github.com/status-im/status-go
# Any command that you run from now on
# will use the specified status-go location
make release-android
```

or for a one-off build:

```sh
make release-android STATUS_GO_SRC_OVERRIDE=$GOPATH/src/github.com/status-im/status-go
```

## Debugging tips

### Inspecting app DB inside Clojure REPL

E.g. if you want to check existing accounts in the device, run this function in the REPL:

```clojure
(get-in @re-frame.db.app-db [:accounts/accounts])
```

### Inspecting current app state in re-frisk web UI

Assuming re-frisk is running in port 4567, you can just navigate to http://localhost:4567/ in a web browser to monitor app state and events.

## Updating dependencies

### iOS CocoaPods dependencies

Whenever the iOS NodeJS dependencies change, `make nix-update-pods` should be run in order to update `ios/Podfile` and `ios/Podfile.loc`.

### Android Gradle Maven dependencies

Whenever the Android project changes in terms of Gradle dependencies, `make nix-update-gradle` should be run in order to update `nix/mobile/android/maven-and-npm-deps/maven/maven-sources.nix`.

### Leiningen Maven dependencies

Whenever the Leiningen dependencies change, `make nix-update-lein` should be run in order to update `nix/lein/lein-project-deps.nix`.

### Fastlane Ruby dependencies

Whenever Fastlane and its modules need updating, `make nix-update-gems` should be run in order to update `fastlane/Gemfile.lock` and `fastlane/gemset.nix`.

## Troubleshooting

### I have issues compiling on Xcode 10

Some developers are experiencing errors compiling for iOS on Xcode 10 on macOS Mojave:

```txt
error: Build input file cannot be found:

'status-react/node_modules/react-native/third-party/double-conversion-1.1.6/src/cached-powers.cc'
```

To fix similar errors run the following commands:

```bash
cd ios
pod update
cd -

cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd -

cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd -
```

Now you should be able to compile again. The issue reference is [here](https://github.com/facebook/react-native/issues/21168#issuecomment-422431294).
