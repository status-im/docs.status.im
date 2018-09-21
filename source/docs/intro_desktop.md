---
id: intro_desktop
title: Status Desktop (react-native-qt)
---

When you create a project with `react-native init SomeProject`, you have ios and android-specific files generated immediately. To add desktop platform files, you have to invoke `react-native desktop` command (in your project folder). `SomeProject/desktop` folder generated then. It contains `CMakeLists.txt` for building desktop Qt application.


## Participants

There are 3 participants in react-native-desktop application:
- Qt application
- Bundler
- JS server (right now called ubuntu-server, but this is subject to change)

`Qt application` - built from a project in `desktop` folder. When runs it establishes communication with JS server and shows appropriate UI. 

`Bundler` - this server runs on developer's machine and provides access to js files from the project. Also, it can generate "bundle" - single js file with all project code in it. Not needed for distribution. 

`JS server` - provides a sandbox for running javascript project code. It communicates with Qt Application.

## Steps on app start

![](/docs/assets/react-native-desktop-workflow.svg)

## Components Support


| React Native                | React Native Desktop |
|-----------------------------|----------------------|
| **Components**              |                      |
| ActivityIndicator           | +/-                  |
| Button                      | +/-                  |
| DatePickerIOS               |                      |
| DrawerLayoutAndroid         |                      |
| FlatList                    |                      |
| Image                       | +/-                  |
| KeyboardAvoidingView        |                      |
| ListView                    | +/-                  |
| Modal                       | +/-                  |
| NavigatorIOS                |                      |
| Picker                      | +/-                  |
| PickerIOS                   |                      |
| ProgressBarAndroid          |                      |
| ProgressViewIOS             |                      |
| RefreshControl              |                      |
| ScrollView                  | +/-                  |
| SectionList                 |                      |
| SegmentedControlIOS         |                      |
| Slider                      |                      |
| SnapshotViewIOS             |                      |
| StatusBar                   |                      |
| Switch                      |                      |
| TabBarIOS                   |                      |
| TabBarIOS.Item              |                      |
| Text                        | +/-                  |
| TextInput                   | +/-                  |
| ToolbarAndroid              |                      |
| TouchableHighlight          | +/-                  |
| TouchableNativeFeedback     |                      |
| TouchableOpacity            | +/-                  |
| TouchableWithoutFeedback    | +/-                  |
| View                        | +/-                  |
| ViewPagerAndroid            |                      |
| VirtualizedList             |                      |
| WebView                     |                      |
| **APIs**                    |                      |
| AccessibilityInfo           |                      |
| ActionSheetIOS              |                      |
| AdSupportIOS                |                      |
| Alert                       | +/-                  |
| AlertIOS                    |                      |
| Animated                    |                      |
| AppRegistry                 | +/-                  |
| AppState                    | +/-                  |
| AsyncStorage                |                      |
| BackAndroid                 |                      |
| BackHandler                 |                      |
| CameraRoll                  |                      |
| Clipboard                   |  +/-                 |
| DatePickerAndroid           |                      |
| Dimensions                  |                      |
| Easing                      |                      |
| Geolocation                 |                      |
| ImageEditor                 |                      |
| ImagePickerIOS              |                      |
| ImageStore                  |                      |
| InteractionManager          |                      |
| Keyboard                    |                      |
| LayoutAnimation             |                      |
| Linking                     |                      |
| NetInfo                     |                      |
|                             |                      |
| PanResponder                |                      |
| PermissionsAndroid          |                      |
| PixelRatio                  |                      |
| PushNotificationIOS         |                      |
| Settings                    |                      |
| Share                       |                      |
| StatusBarIOS                |                      |
| StyleSheet                  |                      |
| Systrace                    |                      |
| TimePickerAndroid           |                      |
| ToastAndroid                |                      |
| Vibration                   |                      |
| VibrationIOS                |                      |
| Layout Props                |                      |
| Shadow Props                |                      |
| ViewPropTypes               |                      |
| ViewStylePropTypes          |                      |
| TextStylePropTypes          |                      |
| ImageStylePropTypes         |                      |
| **From old React Native: ** |                      |
| Navigator (v0.43)           |                      |
