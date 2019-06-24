---
id: google_breakpad
title: Google Breakpad Integration
---

# Google Breakpad Integration

## Overview

Since Google's Breakpad library requires `depot` tools to checkout sources from source control and build dedicated tools used to analyze generated `minidumps` files, repackaged version with pure breakpad library source code to be compiled along with application sources was added into [repo](https://github.com/status-im/google-breakpad).

[google-breakpad repo](https://github.com/status-im/google-breakpad) also contains CMake files for easy integration with applications based on react-native-desktop.

After crash occurs and intercepted by breakpad it creates `minidump` file with useful crash related information. Extracting human readable information from minidump file format requires running of `minidump_stackwalk` tool with specially pre-generated symbol files on application binaries.

### Getting readable stack trace from user submitted files

1. Original breakpad repository should be checked out on dev machine and built locally. ( https://github.com/google/breakpad#getting-started-from-master )

2. Use `dump_syms` tool to generate symbols file from Status binary file submitted by user:

`$google-breakpad/src/tools/linux/dump_syms/dump_syms ./Status > Status.sym`  
`$head -n1 Status.sym`

Above command output may looks something like:

`MODULE Linux x86_64 6EDC6ACDB282125843FD59DA9C81BD830 Status`

To structure symbols file correctly you can do following next:

`$mkdir -p ./symbols/Status/6EDC6ACDB282125843FD59DA9C81BD830`  
`$mv Status.sym ./symbols/Status/6EDC6ACDB282125843FD59DA9C81BD830`

3. Generate readable stack trace pointing to the place with crash by running `minidump_stackwalk` tool on minidump file submitted by user with passing the path to previously generated symbol files:

`$google-breakpad/src/processor/minidump_stackwalk 09fd98ec-d55c-29e1-4ae067b0-4aaec0d6.dmp ./symbols`
