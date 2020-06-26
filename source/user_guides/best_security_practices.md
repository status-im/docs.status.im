---
id: Security Best Practices
title: Status Security Best Practices
layout: tutorials
---

# Status Security Best Practices
This document is intended to provide you with the information you need to protect yourself while using Status and other blockchain technology. 

Remember - by removing unnecessary intermediaries, we are able to take control of our digital lives. We can communicate free of censorship. We can transact on our terms. Our data is ours and ours alone. However, this means we are responsible for protecting ourselves.
## Secure usage of the status app
### Status Account Setup
- **Remember your password!** Write it down and keep it in a safe place. Use a password manager like LastPass or 1Password. We don’t store your password anywhere. You and only you have access to your password so make sure you remember it. Don’t reuse passwords - Use unique, secure passwords that are 8+ characters and use a variety of uppercase letters, lowercase letters, numbers, and symbols. You will need this password to open the app and confirm transactions

- **Back up your 12 word recovery phrase.** You will only have one chance to write this down, so make sure you write it down on a piece of paper offline when you create your account. Don’t take a screenshot or type it somewhere online where it can be compromised. Write it down and store it offline in a secure place. Remember, this phrase is used to recover your entire account. Anyone who gains access to this can access your account and the funds held within it. Status does not store this phrase anywhere, so we can’t help you recover your account if you lose your recovery phrase. For all intents and purposes, this phrase is your Status wallet and identity.

### Status Wallet Setup
- **Remember your Three Word Signing Phrase** - remember this phrase and make sure you see it every time you send a transaction. You will be prompted to confirm these three words every time you sign a transaction. If you see a different three words, or no words at all, do NOT confirm the transaction. This three word signing phrase is to protect you from any phishing scam and sending funds to a malicious account.

### Sending & Receiving Crypto Transactions
- **Make sure you see your 3 Word Signing Phrase.** As mentioned above, everytime you send a transaction, you will be presented these three words. Only confirm the transaction if the three words are correct. If they are different words, or no words at all, do not confirm the transaction, and report this activity to security@status.im for further investigation.
- **Only send crypt payments to trusted sources.** You are able to send transactions directly from within Status. You can choose recipients from within your contacts, scanning a QR code, or manually entering a recipient wallet address. Be sure you know the source you are sending funds too.
- **Be sure you know who is sending you crypto transaction.** You are able to receive crypto funds directly from within Status. You can share your wallet address or the QR code from within the wallet to receive funds. Be sure you know who is scanning this code or taking this wallet address. NOTE - the wallet address is a different code from your contact code.
- **Do not store large quantities of crypto on your Status Wallet.** You should never store massive quantities of funds on your wallet. Think of it like a physical wallet. Only store what you need to interact. Keep large amounts of cryptocurrency offline in cold storage with a hardwallet such as a Ledger or Trezor.

## Personal Security Checklist

## Personal Devices
- Use hardware 2fa, such as yubikey
- User a hardware wallet, such as ledger or trezor


### PC
- Get rid of clipboard managers
    - Reasoning [here](https://coinjournal.net/pc-malware-steals-funds-modifying-ethereum-addresses/)
- Get rid of cloud screenshot auto-upload
- Get rid of remote viewer
- Get a password manager (default: bitwarden)
    - secure with 2FA (YubiKey / Google Auth)
- Disable unused/infrequently used browser extensions
- If your computer is old, start fresh
    - fresh OS install
    - new computer
- Do not tamper with the integrity protection of your OS (OSX SIP, Linux App Armor)
- Run potentially compromosing apps in a vm.
- Review launch-on-startup software

### Mobile
- Get Trail of Bits iVerify.
    - Go through the tutorials and change the settings accordingly.
- Charge your phone only with a charger that is yours or from someone you trust.
- Get a phone that supports yubikey plugable/nfc
- Get a vpn for your phone.
- deactivate/uninstall smart keyboards such as switfkey
- Use a trusted messenger app such as status to take synced private notes as messages to yourself if you don't want Apple/Google to read them.
- Store critical contacts only on your simcard
- Don't download an untrusted apk.
- Make at habit of disabling bluetooth if you don't need it
- Get a second phone where you install only what's necessary. Candycrush saga waits on the
 other phone for you. 
- If you root your phone, here be dragons. 

### Online
    Review public information, think about how this can be used to target you or your device

- Audit cloud software
    - What is uploading automatically?
    - What is already saved there?
    - 2FA that shit
    - Change password if it isn't fresh or from you Password Manager
    - set up your hardware wallet / yubikey / U2F on it
    - If this is where you store you backup codes, regenerate them and handwrite / print on no-wifi printer.  Never put them on clouds again.
    - Audit Social Media accounts (Google, Github, Facebook, Skype, Twitter, etc)

- Audit Chrome/Brave Settings
    - Unsandboxed plugin access: Ask when a site wants to use a plugin to access your computer
    - Location: ask before accessing
    - Camera: ask before accessing
    - Microphone: ask before accessing
    - Flash: Block sites from running flash
    - Popups: Blocked
    - Set clear cookies, cache, history, etc to on "on exit"
- Encrypt all the things
    - Computer / Laptop
    - USB Drives
- Change all the old passwords
    - use Password Manager generator for new ones
    - DO.NOT.REUSE.PASSWORDS
- 2FA all the things
    - Don't use Authy
    - turn off _multi-device_
    - Remove phone number as backup option for ANYTHING

- authorized apps
    - remove the ones you don't use / recognize
    - review permissions on ones you do use
- Log out normally
- Remove "application specific passwords" that bypass auth
- **Google:** Remove phone number and email as backup option
    - Go to https://myaccount.google.com/security
    - Scroll down
    - Change your password.
    - Click “2 Step Verification”
    - Set up: Security key (Yubikey), Authenticator app, Backup codes.
    - Remove and/or do NOT set up: recovery phone or email, google prompt, voice or text message
    - Print or write the backup codes. Do NOT store in password manager. Do NOT store on computer.
    - Do not turn on recovery email. If there is a recovery email there, remove it.
    - Do not turn on recovery phone. If there is a recovery phone there, remove it.
    - Do not turn on “Google Prompt”
    - Do not turn on “Voice or Text Message”
    - At the very bottom, click “Revoke all” for “Devices you trust”
    - Return to https://myaccount.google.com/security
    - Under “Recently used devices” remove anything that isn’t your primary phone and computer.
    - Return to https://myaccount.google.com/security
    - Review “Apps with access to your account”. Remove anything you aren’t actively using.
- **Github:** Audit your auth’d apps, turn on 2FA
    - go [here](https://github.com/settings/applications)
    - Audit Install Github Apps => Remove anything you aren’t actively using.
    - Authorized GitHub Apps => Remove anything you aren’t actively using.
    - Authorized OAuth Apps => Remove anything you aren’t actively using.
    - 2FA via hardware device
- **Facebook:** Some of these are best-practices and related to privacy and not security.

    - Must Do! https://www.facebook.com/settings?tab=security

    - Turn on “Get alerts about unrecognized logins”
    - Change your password if you didn’t do it before
    - Turn on 2FA via Yubikey or Google Auth if you didn’t do it before
    - **Must Do!** https://www.facebook.com/settings?tab=privacy

        - Future posts: Friends
        - Review all posts and things you’re tagged in: On
        - Limit past posts: Friends
        - Who can see your friends list: Friends
        - Who can look you up using email / phone number: Friends
        - Do you want search engines…: NO!
    - **Must Do!** https://www.facebook.com/settings?tab=applications
        - Audit list, remove anything out of date or not actively in use.
    - **Must Do!** Turn off Profile Picture Login. Holy fucking shit what a security nightmare that “feature” is.

    - Recommended! Make sure “Trusted Contacts” was set up intentionally

        - This feature to allows you to regain access to your account via trusted friends. Make sure you use this feature very wisely.
    - Recommended! Make sure “Legacy Contact” was set up intentionally.

    - Similarly you can have an account transition to someone else upon memorialization (if Facebook receives proof that you’ve died). Make sure it is set up carefully.
    - Recommended! https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen
        - Go to “Your Information” w/ green icon. Toggle all switches OFF
        - Go to “Ad settings” w/ blue icon. Select: No, No, No one
        - Click X’s in Your Interests & Advertisers until you get bored
    - Recommended! https://www.facebook.com/settings?tab=timeline
        - Who can post on your timeline? Friends
        - Who can see what others post on your Timeline? Friends
        - Who can see posts you’re tagged in on your timeline? Friends
        - When you’re tagged in a post, who do you want to add to the audience Friends
        - Who sees tag suggestions when photos that look like you are uploaded? No One
        - Review posts you’re tagged in before the post appears on your timeline? On
        - Review tags people add to your posts before they appear on Facebook? On
- **Dropbox / Cloud Storage**
    - Turn on 2FA
    - Turn off any out-of-date phones or computers
    - Audit your https://www.dropbox.com/account/connected_apps

### Miscellaneous
- OAUTH > Email signup.
    - When in doubt authorize a service or app that you start using with your google or your
     github account. Don't create an account with your email (especially not with your private
      email!). Then add 2fa!

- move crypto funds from internet accessible areas to hardwallet/air-gapped storage.
    - Exchanges
    - Laptop
- Sign up for Keybase.io
    - verify profiles
    - share with at least 3 people
- Google yourself
    - Remove personal info you find
    - Remove Facebook profile indexed by Google in FB settings
    - Set up Google search alerts for you name, common usernames, etc [here](https://www.google.com/alerts)
- Look up yourself at haveibeenpwned.com
    - If anything compromised, take appropriate action
        - change password or anything that is breached
        - if bad, consider starting a new email address altogether
- Bookmark commonly accessed financial sites
    - mycrypto.com
    - exchanges
    - bank sites
