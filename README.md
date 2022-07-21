# Connect Web Integration

Connect Web Integration is a repository of example projects using Connect-Web with various JS frameworks and tooling.
It provides numerous examples for integrating Connect-Web into a project.

All projects test Connect-Web against the Eliza demo running at demo.connect.build. 

## Pre-requisites

Before running any example project, make sure you have [Buf](https://docs.buf.build/installation) installed.

## Projects

### React

All sample projects underneath the `React` directory use [React](https://reactjs.org) as the framework.  Each is divided by the various
tooling differences the related projects were constructed with:

* [cra](react/cra) - Built with [Create React App](https://github.com/facebook/create-react-app) and all associated defaults.
* [parcel](react/parcel) - Built from scratch with [Parcel](https://parceljs.org) as the bundler
* [rollup](react/rollup) - Built from scratch with [Rollup](https://rollupjs.org) as the bundler.
* [yarn3-unplugged](react/yarn3-unplugged) - Built from scratch with [Yarn 3](https://yarnpkg.com) in [unplugged mode](https://yarnpkg.com/getting-started/migration#step-by-step).
* [yarn3](react/yarn3) - Built from scratch with [Yarn 3](https://yarnpkg.com) and [PnP mode](https://yarnpkg.com/features/pnp).

Each project also uses various tools for testing, linting, etc.  These variances are noted in each project README.

### React Native

The [React Native](react-native) application was built with the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) and all suggested defaults.

### Remix

The [Remix](remix) application was created with `npx create-remix@latest` and all suggested defaults.

### Svelte

The [Svelte](svelte) application was created with `npm create svelte <app name>` and all suggested defaults.

### Vue

The [Vue](vue) application was created with `npm init vue@latest` and all suggested defaults.
