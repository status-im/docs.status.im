---
id: Desktop Beta Installation
title: Desktop Beta Installation Instructions
layout: tutorials
---

Due to the app being still in Beta, some manual steps are required to install or upgrade the App.

## MacOS

* Download the <a href="{% get_build_url 'official' 'DIRECT_MAC' %}">Status DMG file</a>.
* If you are upgrading from a previous version:
    - Open Finder and in the menu bar click `Go`.
    - Select `Go To Folder...`, type or paste `~/Library/Application Support/Status` and then press Return.
    - Backup this Status folder somewhere else if you need it then delete it.
* Open the downloaded `.dmg` file and copy Status.app to the Applications folder. If prompted, click `Replace` to overwrite a previous version.
* When opening the newly copied app for the first time: `control+click -> Open -> OK` then `control+click -> Open -> Open`.

## Linux

* Download the <a href="{% get_build_url 'official' 'DIRECT_NIX' %}">Status AppImage file</a>.
* If you are upgrading from a previous version, backup the `~/.config/Status` directory somewhere else if you need it then delete it.
* Make the downloaded `.AppImage` file executable: `chmod +x StatusIm-Desktop*.AppImage`.

## Windows

* Download the <a href="{% get_build_url 'official' 'DIRECT_WIN' %}">Status ZIP file</a>.
* If you are upgrading from a previous version:
    - Press the Start button and select `Run` (or press the Windows Key + R), type or paste `%LOCALAPPDATA%\Status` and then press Enter.
    - Backup this Status folder somewhere else if you need it then delete it.
* Extract contents of the downloaded `.zip` file and copy the extracted Status folder to your preferred location.
* When opening Status.exe, if a dialog reports *"Microsoft Defender SmartScreen prevented an unrecognized app from starting"* then you will need to partially disable SmartScreen:
    - Press the Start button (or press the Windows Key), type or paste `Windows Security` and then press Enter.
    - Open the `App & browser control` panel and toggle off `Check apps and files`.
* When opening Status.exe, if a dialog warns *"The publisher could not be verified. Are you sure you want to run this software?"* you can press the `Run` button to safely proceed. You may be prompted twice. This warning is expected for beta releases of the Status Desktop app for Windows.
* When opening Status.exe, if a dialog reports a missing DLL then you will need to run `bin\vc_redist.x64.exe` inside the extracted Status folder to install the missing Microsoft component. This is usually necessary only for older versions of Windows.
