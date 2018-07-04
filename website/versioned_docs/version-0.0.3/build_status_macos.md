---
id: version-0.0.3-build_status_macos
title: Building Status on macOS
original_id: build_status_macos
---

## The easiest way

### 1. Clone the repository

```shell
git clone https://github.com/status-im/status-react
cd status-react
```

### 2. Install the dependencies

We created a special script that installs everything Status needs.

However, it's better to make sure that you have [Node Version Manager](https://github.com/creationix/nvm) installed before running it. 
The reason is simple — NVM provides much more flexibility and allows to have several NPM versions installed.

Just run this to install all dependencies:

```shell
script/setup
```

This script prepares and installs the following:
* Homebrew
* Java 8 from Homebrew
* Clojure and Leiningen
* Node.js and Yarn (see note below)
* React Native CLI and Watchman
* Android SDK
* Maven
* Cocoapods

*Note 1:* it can up to 20 minutes depending on your machine and internet connection speed.

*Note 2:* If you don't have `nvm`, `node@8` will be installed from Homebrew. 
If you don't have `nvm` AND already have `node` installed on your machine then nothing will happen. 
Type `npm version` and make sure you don't use Node.js v10 because it's not supported by Realm.js (see **Troubleshooting** section for additional details).

## Running development processes

After you installed all the dependencies, you need to run two processes — the build process and React Native packager. Keep both processes running when you develop Status.

### 1. Build process

Just run this command in the first terminal window:

```shell
clj -R:repl build.clj figwheel --platform ios,android --ios-device simulator --android-device genymotion --nrepl-port 3456
```

This command starts the compilation of ClojureScript sources and runs re-frisk (a tool for debugging).

For additional information check the following:
* [clj-rn](https://github.com/status-im/clj-rn);
* [re-frisk](https://github.com/flexsurfer/re-frisk).


### 2. React Native packager

Do this in the second terminal window:

```shell
react-native start
```

## Build and run the application itself!

### iOS

There are two ways of running Status on iOS:

1. From XCode. Just open `ios/StatusIm.xcworkspace` in XCode, select a device/simulator and click Run.
2. From console. Just execute `react-native run-ios`.

*Note:* Of course, you need to install XCode first in both cases. Just go to Mac AppStore to do this.

### Android

Android SDK is already installed on your machine (`script/setup` installs it). However, you still have to do several manual steps to run Status:
* Add `export ANDROID_SDK_ROOT="/usr/local/share/android-sdk"` to your profile (.bashrc, .zshrc, ...);
* Make sure Android SDK is configured properly. Run `sdkmanager` from your machine and install Android SDKs;
* *Optional:* Use `avdmanager` to set up Android Virtual Devices;
* *Optional:* It's even better to use Genymotion for Android development;
* Execute `react-native run-android`.

Errors like `android-sdk-16 not found` usually mean that you simply need to install missing SDKs. Run `sdkmanager` for that.

## Optional: Advanced build notes

### Node.js and Yarn

There are several ways of installing Node.js on your machine. 
One of the most convenient and easy is by using [Node Version Manager (nvm)](https://github.com/creationix/nvm). However, our setup script installs `node` from Homebrew if `nvm` is not installed on your machine.

That's why we suggest to install `nvm` first if you want to have more flexible development environment.

If `nvm` is already installed, `scripts/setup` simply does the following:
```shell
nvm install 9
nvm alias status-im 9
nvm use status-im
```

### Custom Android SDK location

Some of developers prefer to use Android SDK integrated to Android Studio. Of course, it doesn't matter
for the build process — just make sure that `ANDROID_SDK_ROOT` points to a right location and you have all the SDKs installed.

## Troubleshooting

### I see lots of yarn errors while installing Realm.js!

Unfortunately, Realm doesn't support Node.js v10. Which means that you need to use Node < 10 to build Status.
One of the best ways to install any older version of Node.js is to use `nvm`.