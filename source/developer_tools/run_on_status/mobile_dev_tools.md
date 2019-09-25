---
title: Mobile Dev Tools
id: tutorial_1_dev_tools
---

# Mobile Developer tools 

Let us begin at the beginning. These tutorials assume the following set up. You have a mobile device or something similar and representative. You will use this to load Status and test your DApp. The client must be connected to the Internet and your web server. Your web server does not need to be on the internet, but it must be reachable from the client device. 

Many variations of this setup are possible. We will briefly cover some options to help you get started. 

![](/developer_tools/img/topology.png)

*Figure 1: You will need mobile devices or emulators with connectivity to a web server and the internet.* 

## The Client
**Option 1**: Physical Devices. The simplest arrangement is to use a physical Android or iOS device connected to the web server and the Internet. In figure 1, the client is connected to the same local network as the development web server. 

You may wish to test your DApp on a variety of OS versions and hardware form factors.

**Option 2**: Android Studio is an IDE based on IntelliJ. It includes an AVD Manager that offers a selection of emulators that closely simulate Android devices. 

![](/developer_tools/img/findAVD.png)

*Figure 2: Locating the AVD (Android Virtual Device) Manager.*

The emulated hardware will start with the first boot experience and can be controlled with your computer mouse. Proceed to the Play Store and install Status.

![](/developer_tools/img/avdUbuntu.png)

*Figure 3: Android Virtual Device (AVD) in Android Studio on Ubuntu 18.*

The virtual Android devices (AVD) use hardware virtualization acceleration, VT-x (Intel) or AVD (AMD processors). Most modern CPUs support this technology, but you must enable virtualization in the BIOS/EFI. Note that the feature may be labeled differently, depending on your BIOS or EFI. 

**Option 3**: Android-x86 is a virtual machine for VMware or VirtualBox. You would install either VMware or VirtualBox and then create virtual hardware for AndroidOS. You can download the official ISO installer from [https://www.android-x86.org/](https://www.android-x86.org/) or pre-installed OFA images from [https://www.osboxes.org/android-x86/](https://www.osboxes.org/android-x86/). Note that Android itself is available in multiple versions. A known limitation of this approach is the fixed screen dimensions. 

![](/developer_tools/img/android-x86.png)

*Figure 4: Android-x86 running on VMware.*

To run Android-x86, you will need one of VirtualBox or VMware and you will need hardware virtualization acceleration enabled at the BIOS/EFI level. 

**Option 4**: XCode is an iOS simulator for Mac and Ubuntu. This tool is popular among developers who work on the Status client. You can also use it to test your DApp in a simulated iOS environment. 

Visit the Status technical documentation for setup instructions: [https://status.im/build_status/status_react_quickstart.html](https://status.im/build_status/status_react_quickstart.html). 

**Option 5**: TeamViewer Quick Support is a remote viewer available for Windows and Mac. Get TeamViewer Quick Support from https://www.teamviewer.com/en/solutions/support-mobile-devices/ for Windows or Mac and use it to control Android and iOS devices using your workstation’s keyboard, display, and mouse. 

Watch Rob install TeamViewer on a simulated Android device using Android Studio running on Ubuntu 18, then take control of the Android device using TeamViewer on Windows 10. 

<div class="video-wrapper">
	<iframe class="video-iframe" src="https://www.youtube.com/embed/upIi3BQlXg8?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Debug with Chrome

Debugging code can be a struggle on mobile devices. You can use Chrome on a workstation to debug a DApp on an android device or AVD. 

For this work, you will need to enable developer mode and USB-debugging on the Android device and then connect it to your workstation.  

Follow this Google guide for details: [https://developers.google.com/web/tools/chrome-devtools/remote-debugging/](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)

## The Host

You will likely already have a web server for working on the DApp away from your production environment. Most existing arrangements should be acceptable. It may be helpful to know something about a basic setup we used to host DApps while we created these tutorials. 

- Ubuntu 18 LTS in VirtualBox on Windows 10
- Installed NodeJS version 12.x and NPM
- Installed Git

The virtual hardware is configured with:

- 4 GB RAM
- 50GB Disk, Dynamically Allocated
- 4 Virtual Processor cores
- Bridged Networking

Generally speaking, any web server will suffice as long as it can serve the DApp and is reachable by the client running Status.

## Install Status, Create an Account and Switch to Testnet

On Android, visit the Play Store. On iOS, visit the App Store. 

Search for Status.im and install the app.

![](/developer_tools/img/playStore.png)

*Figure 5: Status.im in the Play Store*

A good first step is to install Status on your mobile device and play around. In particular, explore Profile, Chat, Wallet, and the Dapp Store, [https://dap.ps](https://dap.ps). Familiarize yourself with how it looks and feels from a user perspective. 

When Status first loads, you will either:

- Create a new account, or
- Configure an existing account using a 12-word mnemonic generated from another installation. 

![](/developer_tools/img/statusFirstLaunch.png)

*Figure 6: Status first-launch screen.*

Follow the prompts to create a new account or configure an existing account. Remember your password. You will need it when you return later. 

## Switch to Ropsten

You will probably not want to use the Ethereum mainnet for your development and testing. 

Proceed to Profile and click the Advanced button. 

![](/developer_tools/img/advancedButton.png)

*Figure 7: Profile, Advanced Button*

On the Advanced panel, switch on the Development Mode toggle. 

![](/developer_tools/img/developmentMode.png)

*Figure 8: Select Development Mode.*

Select Ropsten with Upstream RPC and press Connect when prompted.

## Get Some Test Ether

Since we’re on Ropsten, you’ll need some Ropsten test ether to pay for gas. 

Open `simpleDapp.eth` in Status and give it access to your wallet and Profile. 

SimpleDapp is a demonstration DApp you can use to explore Status feature and examine the code that makes them happen. The code is available from https://github.com/status-im/status-dapp. 

On the Assets tab:

- Request Ropsten ETH
- Request STT

![](/developer_tools/img/simpleDapp.png)

*Figure 9: Request Ropsten ETH and STT*

## Congratulations!

You have: 

- a client for testing the DApp in Status
- a server that will present the DApp resources
- Status running on a testnet
- Some test ether to pay for gas and other things

## Links

- Android Studio and Android SDK: [https://developer.android.com/studio/](https://developer.android.com/studio/)
- VirtualBox Hypervisor: [https://www.virtualbox.org/](https://www.virtualbox.org/)
- AndroidOS installers and images and installers: [https://www.android-x86.org/](https://www.android-x86.org/), [https://www.osboxes.org/android-x86/](https://www.osboxes.org/android-x86/).
- Team Viewer Quick Support: [https://www.teamviewer.com/en/solutions/support-mobile-devices/](https://www.teamviewer.com/en/solutions/support-mobile-devices/) 
- Status Dapp Store: [https://dap.ps](https://dap.ps)
- Remote Android debugging with Chrome: [https://developers.google.com/web/tools/chrome-devtools/remote-debugging/](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)

