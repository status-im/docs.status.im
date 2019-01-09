---
id: faq-desktop
title: Desktop Frequently Asked Questions
---

## Where do I get Status Desktop?

Release builds are available from https://status.im/get_desktop/. Nightly builds are available from https://status.im/nightly/

## I’m a Developer. How do I build Status Desktop?

Start here https://status.im/build_status/desktop.html

## How do I install Status Desktop?

### Mac

Download the app, then drag to the Applications folder.

### Linux

prerequisites:

App supports gnome-keyring or kwallet keychains (for db encryption key storage).

To have gnome-keyring keychain working install following package:

``` bash
sudo apt-get install libgnome-keyring0
```

Download AppImage; 
if required, rename it to be exactly “Status.AppImage” (If you would have another name, app will start fresh without previously stored data).

If you have high-DPI 4K resolution display, you should set `QT_AUTO_SCREEN_SCALE_FACTOR`, `QT_SCREEN_SCALE_FACTORS`, `QT_SCALE_FACTOR` env vars to work with your display’s DPI and resolution.

To set vars and start the app  you can go following way in new Terminal window:

``` bash
export QT_AUTO_SCREEN_SCALE_FACTOR=0
export QT_SCREEN_SCALE_FACTORS=2
export QT_SCALE_FACTOR=0.67
$DIR_WITH_STATUS_IM_APPIMAGE$/Status.AppImage
```

### Windows

Download the app, run the installer executable and follow the instructions.

## How do I upgrade?

### Mac

Quit Status, download a new release, and drag to Applications

### Linux 

Download new release and make sure it’s named “Status.AppImage” and executable permissions are added to the file (`chmod +x Status.AppImage`).

### Windows

Download the new release, and run new installer as done on initial install.

## What operating systems are supported?

Linux, and MacOS, and Windows 10 (Windows 7+ support planned).

## Can I use/recover my existing account?

Yes! Use your Status mobile account, or recover other mnemonic wallet accounts.

Note, that multi-device message and contact sync is currently in development.

## How do I share images and files?

Status doesn’t have file support yet, but there are some easy workarounds to share images and files.

For images and screenshots try using a program like [Droplr](https://droplr.com/lite/) or [Monosnap](https://monosnap.com/welcome) to quickly grab and host images, and then share the link it provides.

For files, Google Drive can be used to host files and provides a public share link.

## I found a bug. Where do I report it?

Check [Github issues](https://github.com/status-im/status-react/labels/desktop) with the `desktop` label for any reported issues. If your issue is new please create a new issue and tag it `desktop`.

It can also be reported in [#status](https://get.status.im/chat/public/status) in Status chat.

## Where are Logs Located?

Release builds do not log by default. When enabled logs can be found here:

### Mac 
`~/Library/Application Support/Status/Status.log`
`~/Library/Application Support/Status/ethereum/mainnet_rpc/geth.log`


### Linux 
`~/.local/share/Status/Status.log`
`~/.local/share/Status/ethereum/mainnet_rpc/geth.log`

### Windows
`%LOCALAPPDATA%\Status\Status.log`
`%LOCALAPPDATA%\Status\ethereum\mainnet_rpc\geth.log`


## Where is feature X from mobile?

Status desktop trails the mobile app in development and not all features from mobile are in desktop yet. But let us know what your favourite feature is and we can work to get it included.

In particular, Status Desktop is focused on Chat. Wallet and DApps support will come in the future.

## I’ve got more questions!

Check the Status [FAQ](/docs/FAQs.html) for general answers. Or submit a bug/issue on [Github](https://github.com/status-im/status-react/issues)



 


