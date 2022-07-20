# connect-web-integration
Connect Web Integration tests the integration of Connect-Web in various JS frameworks and tooling

All projects test Connect-Web against the Eliza demo running at demo.connect.build. 

## Pre-requisites

Before running any example project, make sure you have [Buf](https://docs.buf.build/installation) installed.

## Projects

### React

All sample projects underneath the `React` directory use React as the framework.  Each is divided by the various
tooling differences the related projects were constructed with:

* cra - Built with Create React App and all associated defaults.
* parcel - Built from scratch with Parcel as the bundler
* rollup - Built from scratch with Rollup as the bundler.
* yarn3-unplugged - Built from scratch with Yarn 3 in unplugged mode.
* yarn3 - Built from scratch with Yarn 3 and PnP mode.

Each project also uses various tools for testing, linting, etc.  These variances are noted in each project README.

### React Native

The React Native application was built with the Expo CLI and all suggested defaults.

### Remix

The Remix application was created with `npx create-remix@latest` and all suggested defaults.

### Svelte

The Svelte application was created with `npm create svelte <app name>` and all suggested defaults.

### Vue

The Vue application was created with `npm init vue@latest` and all suggested defaults.
