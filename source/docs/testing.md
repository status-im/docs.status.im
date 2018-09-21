---
id: testing
title: How To Help With Testing
---

## Check if you are ready to help

| Summary                |	Detailed Explanation                                  |
| -------------------- | ---------------------------------------------------------|
| The app is unstable | If you are not ready to deal with unstable/crashing/weird and other typical traits of the untested app then you should probably avoid testing. |
| Create backup of the device BEFORE testing | If you are ready to help with testing then make sure you have a recent backup of your device as there is no guarantee that next build will not introduce critical issues that cause complete device reset and data loss. |
| Use 2 devices for testing | This is app with lot's of messaging functionality, so you need at least 2 devices to test it. Ideally, it's 2 real devices. Ok: 1 real and 1 emulator like Android emulator or Genymotion. |
| Test on wifi | Current versions consume lots of traffic and battery, make sure you are using wifi for testing. |
| Do not send real ETH or SNT to the app | We test mostly on Testnets (Ropsten and Rinkeby). Test ether should be used to check transactions are working. We will never ask you to send real SNT or ETH for testing. |
| Test all features in the nightly develop build | The most useful would be to check nightly develop build on Android. We expect that features merged in the develop build are stable enough and this build is free of obvious bugs. This is of course just an assumption and should be verified. There are end-to-end tests that cover some common scenarios. |

If this sounds good, we test manually once in 2-3 days, so anyone who can find and report not-known issue is welcome to the club. 

Each European night there is a new nightly build created and it’s very important to take the latest because issues you will find in 2-days old build might be already fixed in the recent build. The [list of the builds](http://artifacts.status.im:8081/artifactory/nightlies-local/) is not sorted by the latest date, so to find the latest search by the date, e.g. 06-dec

When you report an issue it’s also important to mention that nightly build X was used. Just add an info about the date and link to the apk you’ve used in section Additional Information of the issue. When reporting an issue, please follow the guidelines from [How to report a Bug](report_a_bug.md).

## Suggestions on the procedure to check dev build:

1. Perform a fresh install to see that the build works. "Fresh install" means that the previous build was uninstalled or never installed on the device and the new version is installed. There is no old data from the previous version available in the app (user profile, chats etc).
2. Do not install a new build on top of previously installed develop or PR build.
3. Test basic flows that typical users would do. You can use our Smoke Tests checklist for this.
4. Then, upgrade to see that older version can be upgraded using the build under testing. "Upgrade" means that the released version from the TestFlight/PlayStore was installed on the device and "build under test" is installed on top of it. No uninstall was performed, so old data like user profile, chats, contacts is available.
5. The data for an upgrade is listed in Smoke Test checklist Before making upgrade: record (video or pictures) the state of the data as anything can be broken after upgrade. For example, if there is "requesting ether" message sent before you upgrade then chat will contain empty boxes instead of this message, To identify and prove what was there you need to record initial state with video/screenshots.
6. After upgrading - check that old data is visible/usable. Test basic flows that typical user will do using old data and new data
7. Fresh install - do "crazy" things, not typical flows
8. Upgrade - do "crazy" things, not typical flows

## Find and report issues in the stable released versions on iOS or Android

If you don’t want to install the nightly apk build then you can help by finding and reporting issues in the released Android version available on PlayStore or in iOS version from TestFlight. This is less useful as we continue to fix known issues and modify existing areas, so it might happen that an issue you find is already fixed or that the area is being re-designed in the current develop build. When reporting an issue, please follow the guidelines from [How to report a Bug](report_a_bug.md).

## Reproduce issues with "Help to reproduce" label and add extra info

Sometimes we see issues or get bug reports but can't find the exact steps/model/condition to reproduce them. You can search in the Github repo by using the label ["Help to reproduce"](https://github.com/status-im/status-react/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+to+reproduce%22) to see the list and try to reproduce bugs. If you can then add as much info as possible: exact steps, logs, video, info about the phone model/OS, anything else that can help us to reproduce and then to fix a bug.

## Test new features in PR builds

The team is working on providing an access to the PR builds to all community contributors, including testers. However, PR builds are expected to be tested faster and thoroughly by someone who is very familiar with the app. This is what the core test team is doing daily: testing PR builds that introduce changes/fixes/features. So, if you are just starting to help it would not be the best option to choose.

## Check the Python end-to-end test suite and create new tests

Setup and run existing automated tests. Review the tests and create new ones in PR. You might also like to [create an issue in our Github repo](https://github.com/status-im/status-react/issues) entitled Autotests and explain which test you want to automate, so that the core test team can verify you have the correct assumptions about expected results.


