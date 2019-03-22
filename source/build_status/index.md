---
layout: build
id: index
title: Build Status Yourself
---

# #Buidl Status Yourself and Participate in a Better Web

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

We created a special script that leverages [Nix](https://nixos.org/nix) to install everything Status needs with minimal impact to the user's system. However, this script has only been tested on macOS and Ubuntu Linux 18.04. If it doesn't work for you on another Linux distribution, please install all dependencies manually (you can find the list below).
In order to make things as practical as possible, the script will auto-accept the Android SDK license agreements.

If you're on NixOS, please run the following to ensure you have the necessary prerequisites available:

```bash
nix-env --install git gnumake
```

**(Ignore this if you're on NixOS)** Just run this to install all dependencies (you might need to enter your account password, namely on Arch Linux):

```bash
make setup
```

At the end of the script, follow the instructions to ensure that Nix is properly set up on your system. From then on, in order to work with status-react, you need to be inside a Nix shell. You can get there by typing `make shell`.

The `make shell` script prepares and installs the following:

- Java 8
- Clojure and Leiningen
- Node.js (see note below)
- yarn
- React Native CLI and Watchman
- Android SDK (at `~/.status/Android/Sdk/`)
- Android NDK
- Maven
- Cocoapods
- CMake and extra-cmake-modules
- Go
- Python 2.7
- Conan (Linux-only)
- unzip
- wget

*Note 1:* It can take up to 20 minutes depending on your machine and internet connection speed.

*Note 2:* Specific tool versions used are maintained in the [.TOOLVERSIONS](https://github.com/status-im/status-react/blob/develop/.TOOLVERSIONS) file.

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
make react-native
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

Installation script installs Android SDK and Android NDK (if they are not present in `~/Android/Sdk/`).

- *Optional:* If you want to use AVD (Android Virtual Device, emulator), please, check [this documentation](https://developer.android.com/studio/run/emulator);
- *Optional:* If you don't like AVD, you can also use [Genymotion](https://genymotion.com);

Once Android SDK is set up, execute:

  ```bash
  make run-android
  ```

_Errors like `android-sdk-16 not found` usually mean that you simply need to install missing SDKs. Run `sdkmanager` for that._

Check the following docs if you still have problems:

- [macOS](https://gist.github.com/patrickhammond/4ddbe49a67e5eb1b9c03);
- [Ubuntu Linux](https://gist.github.com/zhy0/66d4c5eb3bcfca54be2a0018c3058931);
- [Arch Linux](https://wiki.archlinux.org/index.php/android) (can also be useful for other Linux distributions).

## Optional: Advanced build notes

### Locally built status-go dependency

If you need to test a mobile build with a custom locally built status-go dependency, you can build it by following this process:

1. Ensure the `STATUS_GO_HOME` environment variable is set to the path of your local status-go repo (see [Build status-go](https://status.im/build_status/status_go.html) page for more information on requirements);
2. From the root of the status-react repo, run `scripts/bundle-status-go.sh <platform>`, where `platform` can be `android` or `ios`;
3. This will generate a build artifact under the status-react repo, and will be considered prioritary in the dependencies until it is deleted (e.g. by running `make clean` or `make prod-build`).

*Note:* Desktop builds currently always download and build status-go locally.

## Debugging tips

### Inspecting app DB inside Clojure REPL

E.g. if you want to check existing accounts in the device, run this function in the REPL:

```clojure
(get-in @re-frame.db.app-db [:accounts/accounts])
```

### Inspecting current app state in re-frisk web UI

Assuming re-frisk is running in port 4567, you can just navigate to http://localhost:4567/ in a web browser to monitor app state and events.

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
cd ..

cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../

cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```

Now you should be able to compile again. The issue reference is [here](ttps://github.com/facebook/react-native/issues/21168#issuecomment-422431294).
