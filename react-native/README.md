# Eliza

This project was created using the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) with the command:

`expo init <project-name>`

## Prerequisites:

* To view on a phone, download the [Expo Go](https://expo.dev/client) app, which will allow you to run the app on your
phone while hitting a server running on your computer.

## Getting Started

### `npm install`
### `npm start`

Starts the server locally using Expo.  You should then be able to see it running on a phone provided you have the above
app downloaded and configured.

Note that React-Native does not fully support the Fetch API when running on mobile and as a result, the Connect
transport does not work properly in that environment. Instead, we create a custom XHR transport for use in that
circumstance.

## Helpful Commands

### `npm run generate`

Use `buf` to generate the compiled protos via protobuf-es

### `npm run web`

Starts the app in Expo's `web` mode, which will allow you to see it running in a browser.

