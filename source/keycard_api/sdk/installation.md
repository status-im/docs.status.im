---
id: sdk_installation
title: Java SDK
---

# Installation

You can import the SDK in your Gradle or Maven project using [Jitpack.io](https://jitpack.io). If using Gradle, to use
JitPack all you have to do is insert these lines in you `build.gradle` file

```groovy
allprojects {
  repositories {
    maven { url 'https://jitpack.io' }
  }
}
```

Then, you must import the correct dependency. In case you are building an Android-based project, you need to add this line

```groovy
dependencies {
  implementation 'com.github.status-im.status-keycard-java:android:2.0.0'
}
```

If you are working on the desktop, then you need this line instead

```groovy
dependencies {
  implementation 'com.github.status-im.status-keycard-java:desktop:2.0.0'
}
```

In both case, you will have the same SDK, except for the way connection with the card is established.
