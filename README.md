# Connect Web Integration

Connect Web Integration is a repository of example projects using Connect-Web with various JS frameworks and tooling.
It provides numerous examples for integrating Connect-Web into a project.

All projects test Connect-Web against the Eliza demo running at https://demo.connect.build.  Each project illustrates an example
of unary and server-streaming with the exception of React Native (see [Connect-Web docs](https://connect.build/docs/web/supported-browsers-and-frameworks) for an explanation why).

## Pre-requisites

Before running any example project, make sure you have [Buf](https://docs.buf.build/installation) installed.

## Projects

### Angular

The [Angular](https://angular.io) application was generated with the [Angular CLI](https://github.com/angular/angular-cli).

### Next.js

The [Next.js](nextjs) application was generated with `npx create-next-app buf-nextjs --use-npm --ts` and all suggested defaults.

### Plain

The [Plain](plain) application was built from scratch with no frameworks at all using just vanilla JavaScript.

### React

All applications underneath this directory use [React](https://reactjs.org) as the framework.  Each is divided by the various
tooling differences the related projects were constructed with:

* [cra](react/cra) - Generated with [Create React App](https://github.com/facebook/create-react-app) and all associated defaults.
* [esbuild](react/esbuild) - Built from scratch with [esbuild](https://esbuild.github.io) as the bundler.
* [parcel](react/parcel) - Built from scratch with [Parcel](https://parceljs.org) as the bundler.
* [rollup](react/rollup) - Built from scratch with [Rollup](https://rollupjs.org) as the bundler.
* [vite](react/vite) - Generated with [Vite](https://github.com/vitejs/vite) and all associated defaults.
* [webpack](react/webpack) - Built from scratch with [Webpack](https://webpack.js.org) as the bundler.
* [yarn3-unplugged](react/yarn3-unplugged) - Built from scratch with [Yarn 3](https://yarnpkg.com) in [unplugged mode](https://yarnpkg.com/getting-started/migration#step-by-step).
* [yarn3](react/yarn3) - Built from scratch with [Yarn 3](https://yarnpkg.com) and [PnP mode](https://yarnpkg.com/features/pnp).


Each project also uses various tools for testing, linting, etc.  These variances are noted in each project README.

### React Native

The [React Native](react-native) application was generated with the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) and all suggested defaults.

### Remix

The [Remix](remix) application was generated with `npx create-remix@latest` and all suggested defaults.

### Svelte

The [Svelte](svelte) application was generated with `npm create svelte <app name>` and all suggested defaults.

### Vue

The [Vue](vue) application was generated with `npm init vue@latest` and all suggested defaults.
