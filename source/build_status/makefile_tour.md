---
id: makefile_tour
title: An overview of the Makefile targets
---

# What are the Makefile targets

If you're familiar with Makefiles, feel free to skip ahead.  Otherwise, what is a Makefile?  In simple terms, think of the Status Makefile as the recipe book for all the various tasks you might need to do within the build environment such as building the app, running tests, refreshing the entire environment, etc.  

Below are some of the more useful Makefile targets that will help you with the development process when contributing to the Status app.

# Development Shell

`make shell` is the most fundamental target in the Makefile.  At its core, it will either build or launch a [Nix](https://github.com/status-im/status-react/tree/develop/nix) shell preconfigured to build Status.  If this is your first time building status, this is where you'll start.  Run `make shell TARGET={os_name}` where `os_name` is `android`/`ios`/`linux`/`macos`/`windows` and the Makefile will build out the Nix environment and get you ready to start coding.  Now, go get a cup of coffee.  It'll take a while to finish this process.

Valid target OS options are available in the [`nix/platforms.nix`](https://github.com/status-im/status-react/blob/develop/nix/platform.nix) file.

Note 1: After you've run this command once, it will just enter the already configured Nix shell and allow you to run commands within that environment like `lein cljfmt fix` (which runs the linter).
Note 2: Note: Theis target will not work on MacOS Catalina. Please follow [these instructions for a workaround](https://github.com/status-im/status-react/tree/develop/nix#macos-1015-catalina).

# Development Targets

You will need to run one of each target in separate terminals from the following three subsections to start development.

## Building Clojure

`make startdev-**` is the set of targets that starts up Figwheel and the Clojurescript REPL.  Depending on what environment you're coding on, you'll use one of the following targets.

* `make startdev-android-real` - For using a real Android device for development
* `make startdev-android-avd` - For using a virtual Android device for development
* `make startdev-android-genymotion` - For using the Genymotion simulator for Android development
* `make startdev-ios-real` - For using a real iOS device for development
* `make startdev-ios-simulator` - For using the XCode IOS simulator for development
* `make startdev-desktop` - For developing for Status Desktop

Note: If developing with a real Android device, make sure to also run `make android-ports` or the REPL won't connect to your device.

## Building React Native

`make react-native-**` is the set of targets that sets up the react-native code manager for development.  Run this in a separate terminal after you run `make-startdev-**` with your preferred device/simulator.  

OS targets

* `make react-native-android`
* `make react-native-ios`
* `make react-native-desktop`

## Building the App

`make run-**` will build the app in development mode based on your current code base and push it to your designated device/simulator.  Run this only after you've run the `make startdev-**` and `make react-native-**` commands in separate terminals.

OS targets

* `make run-android`
* `make run-desktop`
* `make run-ios`

## Build for Release

`make release` builds a release version of the app that is ready for install on Android and iOS.

OS targets
* `make release-android` - Builds the Android version of the app
* `make release-ios` - Builds the iOS version of the app
* `make release-desktop` - Builds a desktop version of the app
* `make release-windows-desktop` - Builds a Windows desktop version of the app (available on Linux hosts)

# Additional Targets

## Testing

There are three targets related to testing.

* `make test` - Runs all the NodeJS unit tests once and print the output to the screen.
* `make test-auto` - Runs all the NodeJS unit tests in interactive mode, monitoring the code base for any changes and then re-running the test suite when changes are detected.
* `make coverage` - Runs the NodeJS unit tests once and generate a coverage report.
* `make lint` - Runs the linter and reports any formatting issues.
* `make lint-fix` - Runs the linter and automatically fixes any formatting issues.

## Android Targets

* `make android-ports` - Sets up the ADB proxy ports to make sure the REPL/development server can connect to the device/simulator.
* `make android-logcat` - Run this in a separate terminal and it will continuously print the logs from ADB that are specific to the Status app
* `make android-clean` - Cleans up the android development environment, causing Gradle to rebuild the entire app the next time you run `make run-android`

## Nix Targets

Note: These targets will not work on [MacOS Catalina](https://github.com/status-im/status-react/tree/develop/nix#macos-1015-catalina).

* `make nix-purge` - Sometimes, your dev environment gets hosed and you just need to start over.  This target will completely purge the entire Nix build environment.  If you run this command, you will need to run `make shell TARGET={preferred OS}` before you can continue developing.
* `make nix-clean` - Cleans up all the Status build artifacts.  This isn't as extreme as `make nix-purge` but will still give you a fresh start on building the app if something goes awry in your dev environment.
* `make nix-gc` - Removes from the Nix store all packages older than 20 days. Great way to recover some lost disk space.
