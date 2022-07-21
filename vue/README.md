# Eliza

This project was bootstrapped as a [Vue](https://vuejs.org/) project with the command:

`vue create eliza`

All default tooling setup via the above command is used, which includes:

* [Vite](https://vitejs.dev) (Module Loader)
* [Vitest](https://vitest.dev) (Unit Test Framework)
* [Cypress](https://www.cypress.io/) (e2e Test Framework)

## Getting Started

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Helpful Commands

### `npm run build`

Type-check using vue-tsc and build the app using Vite.

### `npm run test`

Run unit tests via the Vitest framework.

**Note that if you ran `export NODE_OPTIONS=--openssl-legacy-provider` prior to this while working with the 
[React Native project](../react-native/), you will need to run `unset NODE_OPTIONS` to before running tests.  Otherwise, you will see an 
error similar to the following:**

`Error: Initiated Worker with invalid NODE_OPTIONS env variable: --openssl-legacy-provider is not allowed in NODE_OPTIONS`

### `npm run buf:generate`

Use `buf` to generate the compiled protos via protobuf-es.

## Bonus Commands

The following commands are also available via the Vue starter project:

### `npm run preview`

Previews a built application on port 4173.

### `npm run test:e2e`

Runs e2e tests in interactive mode using Cypress.

### `npm run test:e2e:ci`

Runs tests in CI mode using Cypress.

### `npm run build-only`

Build the app using Vite.

### `npm run type-check`

Runs type-check using vue-tsc.

### `npm run lint`

Runs eslint against codebase.


