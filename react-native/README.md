# Eliza

This project was created using the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) with the command:

`npx create-expo-app react-native`

## Prerequisites:

* To view on a phone, download the [Expo Go](https://expo.dev/client) app, which will allow you to run the app on your
phone while hitting a server running on your computer.

## Getting Started

### `npm install`
### `npm start`

Starts the server locally using Expo.  You should then be able to see it running on a phone provided you have the above
app downloaded and configured.

To update the React Native project, you have to check the 
[React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) for guidance.

## Helpful Commands

### `npm run generate`

Use `buf` to generate the compiled protos via protobuf-es

### `npm run web`

Starts the app in Expo's `web` mode, which will allow you to see it running in a browser.

## Metro

Connect-ES and Protobuf-ES use package exports. If you use [metro](https://github.com/facebook/metro), 
make sure to [enable them](https://metrobundler.dev/docs/package-exports/).

### `npm run ios`

Runs the app locally in iOS using a Simulator. You will need Xcode and the Simulator configured to get up and running. See the [Expo docs](https://docs.expo.dev/workflow/ios-simulator/) for more info.

### `npm run android`

Runs the app locally in Android using an emulator. You will need Android Studio and an emulator configured to get up and running. See the [Expo docs](https://docs.expo.dev/workflow/android-studio-emulator/) for more info.
