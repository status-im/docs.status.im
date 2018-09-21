---
id: report_a_bug
title: How To Report A Bug
---

## Before reporting
1. Make sure you can reproduce an issue at least 3 times
2. Check that the issue you have found is not known yet. You can do this easily using a search in GitHub by the keywords:
    1. If there is an error message then search by its text or 3-4 first words from the message.
    2. If there is no error shown then search by some names of UI elements like profile, send, QR etc that are connected with issue you've found.
    3. Search by the screen/area title where issue occurs, e.g. Chats, Console, Popular statuses
    4. It's also useful just to read known issues (marked with label bug) and get used to the terminology and format of the bug report.
3. If the issue is not yet reported then create a new one in Github repo and follow the issue template. It's very important and, if you really want to help, then invest some time in creating a good title, description, steps, attaching video/pictures and logs.
4. One bug report must contain info about one issue. Do not mix several issues in one bug report. Even if they exist in one area. It's impossible to track the state of several issues in one bug report (first can be fixed and verified ok, second can fail verification, third can be in progress of fixing), so never put several issues in one bug report.

## Create A Good Bug Title

This is the first thing anyone reads about the found issue. This is the line that explains how your bug is different from all other bugs in the list. So, be specific and tell us exactly what’s wrong. No need to describe what’s not happening and what you don’t see. Tell us what happens and what you **can** see. Literally, describe physical objects you see on the screen. Pretend you are the mirror that shows some situation on the screen to the reader.

For example, this title is not good: "Location does not work in chat" because it does not explain what exactly is wrong and it does not tell us what you really see when the issue happens. There is definitely something strange going on, but the title does not give many clues as to what it really is. 

There might be 20 issues with a similar title, but the exact manifestation of the broken location would be different for each of them. So, describe clearly the things you can see on the app screen when the issue happens. This specific info will differentiate your report from the other 19 bugs where location does not work.

Let’s look again at the location title and ask yourself: what exactly happens that makes me think it’s a bug? What do I see on the screen? What I would expect to see?

For example, the location command is used, it shows your current location, you tap on the address, but the sent message shows other location. Describe this in the title: "Other location is shown instead of the selected current location in the sent message".

The pattern for a good title has 3 parts and only 1 is mandatory:

1. The exact problem description: "Other location is shown"
2. What was expected (optional): instead of the selected current location
3. Place/condition/details (optional): in the sent message

Do not create a title like "Fix location" or "Strange behavior in chat". You already reporting an issue that means it needs to be fixed. Behavior is already strange this why you are reporting it. The less specific info you provide the harder is to search for the bug and to understand it.

More examples:

| Bad   |	Good |
| ------| ----------- |
| Location does not work in chat. |	Empty box instead of the map is shown in 1-1 chat |
| Incorrect functioning while type | Previously sent text is automatically inserted in the input field if start typing new text |
| Weird things with emoji | Letter instead of flag emoji is shown in the emoji list and 1-1 chat |
| Red error in chat | "Recipient name must be specified" error is shown if tap on requesting message in group chat |

The bug title is the essence of the bug. It’s like a headline in the newspaper. You want to bring news about the problem, so tell about the exact problem in the beginning of the title and leave the details for the end or for the description.

## Good description

So, we are done with the title and now we have some attention from the reader, this is time to tell more details about the bug. There are different types of details.

Details must describe:
1. What the problem is;
2. Where the problem is: screen/area title where issue occurs. By mentioning the name of the screen/area you make it super easy to find the bug for anyone who will see issues on the same screen. By making a typo or not mentioning it - you are decreasing this chance;
3. How to replicate the issue
4. Whether it is reproducible on both iOS and Android or only on one of them. If you don't have both, then write that the issue was found on Android/iOS and you can't check on other.
5. Any special conditions that are needed to reproduce an issue. For example, bug happens only after some specific actions or only on the 1st app run.
6. How many times you tried to reproduce an issue.  E.g. can reproduce 3 times/3 attempts. If it happens sporadically then mention how many times you’ve seen it / how many times you’ve tried, e.g crash happened 3 times / 7 total attempts.

There are also some other important things you can think about including:
1. If there is a visual bug then add a screenshot with a problem area selected by red rectangle. A picture is always better than long description.
2. If there is no picture but reader needs to see a flow then add a link to a video (for example on youtube or google drive). Unfortunately, we might not follow links to other resources. Record only the important parts with shortest set of steps to reproduce, you don't want to waste 15 minutes of your life when the issue only occurs on 15:25. If you can't cut the video, then add info from what time there is anything important to watch.
3. If there is anything wrong with end result and it's visible, then add a picture even if you've added a video. When you review 20 issues, then it's much faster to see the picture then watch 20 videos even if each of them is only 2 minutes long.
4. If there is a popup with an error message, then type its text or at least the first 4-5 words. It’s important because a search will not find anything inside the screenshot of the message, so to make life easier for other testers, including you,clear error text is needed. If there are more than 4-5 words to type then attach a screenshot of the full error text too.


## Good expected and actual results

When reporting errors, you will see that our template has two different sections Expected, and Actual. 

When describing Expected:

1. Describe clearly what you expect to see, not what you did not expect that happened. Good example: "After sending location command there is new message in the chat with a map". Bad example: "No error shown"
2. Even if it's very obvious, please, tell us what you expect to happen. This will help our developers justify if the fix works and our testers to verify the bug fix.

For Actual:

1. Describe exactly what happens. Bad: "and it's broken" or "I can't type". Good: "after I tap in the input field there is no keyboard shown, input field stays at the bottom of the screen as if I didn't type inside it". 
2. It might seem extremely obvious but it's not. There are more reasons why you can't type: maybe the keyboard is shown but a tap on each key has no effect. Maybe you can't type because the keyboard is shown ok, you can tap on the key but the typed letter is not shown in the input field, etc.
3. Most likely this will be the second thing the reader will check after the title. So even if you need to repeat some info from description - repeat it. This is a brief on the actual manifestation of the bug. You'll read it first too when you'll start verifying the fix for the issue.

## Good Steps to Reproduce

1. Start from the beginning and document each step to get to the problem. Do not jump from the middle of nowhere with a step: "and send 2 more messages to that contact in any chat."
2. Even if you can reproduce the issue with any data in any chat, specify the exact data you've used. For example: "send any amount in any chat, in my case I've sent 0.004 ETH in the group chat."
3. Guide the reader. Ideally, each step that need some waiting or transition to other area/screen should mention it. Imagine your issue will be investigated 10 days later when some new screen is introduced and older one is removed. It will be hard for the reader to follow why suddenly there are some UI elements mentioned that he/she doesn't see in the app. If you explicitly tell that screen X is opened as a result of some action then it will help.

**For example:**

1. Open 1-1 chat with Jarrad
2. Tap on send command
3. In the input field after /send command type 0.1
4. Tap on send button. As a result, Sign a transaction screen should be shown
5. Type your password in the popup...

## Good Additional Info

It really helps to specify not only the OS, but also

1. Real device model or emulator, e.g real Samsung Galaxy S6 ; Genymotion emulator Galaxy S6
2. Build type used (release or nightly build)
3. Build version
4. Link to apk and date if it's a nightly build
5. Logs (logcat at least)
6. For nightly builds we record session info in the TestFairy (video and logs) if you are on WiFi, so you can specify exact time when issue happened, your country and build number - this will help to locate your session in TestFairy and tester from the core team can update your bug report with a link
