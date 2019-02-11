---
layout: build
id: index
title: Build Status Yourself
---

# #Buidl Status Yourself and Participate in a Better Web

## The easiest way

### Prerequisites

- Linux: git and make
  - Run `sudo apt install git make` on the terminal

### 1. Clone the repository

```bash
git clone https://github.com/status-im/status-react
cd status-react
```

### 2. Install the dependencies

We created a special script that installs everything Status needs. However, this script works only
for macOS and Ubuntu Linux. If you use another Linux distribution, please, install all dependencies manually (you can find the list below).

It's also better to make sure that you have [Node Version Manager](https://github.com/creationix/nvm) installed before running this script.
The reason is simple — NVM provides much more flexibility and allows to have several NPM versions installed.

Just run this to install all dependencies (you might need to enter your account password). In order to make things as practical as possible, the script will auto-accept the Android SDK license agreements:

```bash
make setup
```

At the end of the script, close the terminal and open a new one, so that the build environment is properly set up with your updated profile.

The `make setup` script prepares and installs the following:

- Homebrew
- Java 8 (from Homebrew on Mac and from `ppa:webupd8team/java` on Ubuntu)
- Clojure and Leiningen
- nvm (see note below)
- Node.js (see note below)
- yarn
- React Native CLI and Watchman
- Android SDK (at `~/Android/Sdk/` on Linux and `/usr/local/share/android-sdk` on MacOS)
- Android NDK (at `~/Android/Sdk/ndk` on Linux and `/usr/local/share/android-sdk/ndk` on MacOS)
- Maven
- Cocoapods

*Note 1:* It can take up to 20 minutes depending on your machine and internet connection speed.

*Note 2:* If you don't have `nvm` nor `node`, `nvm` will be installed, and then used to install the required version of `node`.
If you don't have `nvm` AND already have `node` installed on your machine then nothing will happen.

*Note 3:* Specific tool versions used are maintained in the [.TOOLVERSIONS](https://github.com/status-im/status-react/blob/develop/.TOOLVERSIONS) file. On Homebrew (MacOS) the scripts will attempt to upgrade/downgrade as required to ensure the environment matches the requirements.

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
make prepare-ios # first time only, or whenever you switch target platforms
make run-ios
```

If you wish to specify the simulator, just run `make run-ios SIMULATOR="iPhone 7"`.
You can check your available devices by running `xcrun simctl list devices` from the console.

You can also start XCode and run the application there. Execute `open ios/StatusIm.xcworkspace`, select a device/simulator and click **Run**.

*Note:* Of course, you need to install XCode first in both cases. Just go to Mac AppStore to do this.

### Android

Installation script installs Android SDK (if your environment doesn't define `ANDROID_SDK_ROOT`) and Android NDK.

Should you run into any issues getting the Android SDK set up, then you need to install it yourself. The easiest way to do this is to install Android Studio — it will install almost everything for you.
There is a difficult way for those who don't want/need Android Studio.

In this case you have to do the following:

- Install Android SDK from you package manager (`brew install android-sdk`, `sudo apt-get install android-sdk`, ...) or download it manually [here](https://developer.android.com/studio/#downloads);
- Add several env variables to your profile (.bashrc, .zshrc, ...) — installer should say what are these variables and their values;
- Run `android update sdk --no-ui` to update SDKs;
- Run `sdkmanager` from your machine and install the latest Android SDKs;
- *Optional:* If you want to use AVD (Android Virtual Device, emulator), please, check [this documentation](https://developer.android.com/studio/run/emulator);
- *Optional:* If you don't like AVD, you can also use [Genymotion](https://genymotion.com);

Once Android SDK is set up, execute:

  ```bash
  make prepare-android # first time only, or whenever you switch target platforms
  make run-android
  ```

_Errors like `android-sdk-16 not found` usually mean that you simply need to install missing SDKs. Run `sdkmanager` for that._

Check the following docs if you still have problems:

- [macOS](https://gist.github.com/patrickhammond/4ddbe49a67e5eb1b9c03);
- [Ubuntu Linux](https://gist.github.com/zhy0/66d4c5eb3bcfca54be2a0018c3058931);
- [Arch Linux](https://wiki.archlinux.org/index.php/android) (can also be useful for other Linux distributions).

## Optional: Advanced build notes

### Node.js

There are several ways of installing Node.js on your machine.
One of the most convenient and easy is by using [Node Version Manager (nvm)](https://github.com/creationix/nvm). Our setup script installs `nvm` if needed and `node` is not found on your system.

If `nvm` is already installed, `make setup` simply does the following:

```bash
nvm install 10
nvm alias status-im 10
nvm use status-im
```

### Custom Android SDK location

Some developers prefer to use Android SDK integrated in Android Studio. Of course, it doesn't matter
for the build process — just make sure that `ANDROID_SDK_ROOT` points to a right location and you have all the SDKs installed.

### Locally built status-go dependency

If you need to test a mobile build with a custom locally built status-go dependency, you can build it by following this process:

1. Ensure the `STATUS_GO_HOME` environment variable is set to the path of your local status-go repo (see [Build status-go](https://status.im/build_status/status_go.html) page for more information on requirements);
2. From the root of the status-react repo, run `scripts/bundle-status-go.sh <platform>`, where `platform` can be `android` or `ios`;
3. This will generate a build artifact under the status-react repo, and will be considered prioritary in the dependencies until it is deleted (e.g. by running `make clean` or `make prod-build`).

NOTE: Desktop builds currently always download and build status-go locally.

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

Some developers are experiencing errors compiling for iOS on Xcode 10 on MacOs Mojave:

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

### I get a compilation error when running `clj -R:dev build.clj watch`

Some developers see the error `Exception in thread "main" java.lang.NoSuchFieldError: VAR, compiling:((..)/status-react/build.clj:1:1)` when running the `clj -R:dev buid.clj watch` command (e.g., via `make startdev-android-avd`).

This happens when you are running an earlier version of Clojure that is incompatible with `cljs.build.api`. The solution is to upgrade to the latest version of Clojure. E.g., for macOS

```bash
$ brew upgrade clojure
==> Upgrading 1 outdated package:
clojure 1.9.0.302 -> 1.9.0.397
```
