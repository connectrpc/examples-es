# Eliza

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the command:

`npx create-react-app cra --template typescript`

All default tooling setup via Create React App is used, which includes:

* [Webpack](https://webpack.js.org/) (Bundler)
* [Jest](https://jestjs.io/) (Test Framework)

## Getting Started

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Helpful Commands

### `npm run build`

Build the app using Webpack.

### `npm run test`

Run unit tests via the Jest framework

### `npm run buf:generate`

Use `buf` to generate the compiled protos via protobuf-es

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

Also note that `eject` is not necessary since this uses `react-app-rewired` to override Create React App configs.  However, `eject` is here as a break-glass option.
