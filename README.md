# Connect-ES Integration

Connect-ES Integration is a repository of example projects using Connect with various TypeScript web frameworks and tooling.
It provides numerous examples for integrating Connect into a project, using both Connect for Web and Connect for Node.

## Web

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
* [webpack-cjs](react/webpack-cjs) - Built from scratch with [Webpack](https://webpack.js.org) as the bundler, using CommonJS import syntax.
* [yarn-unplugged](react/yarn-unplugged) - Built from scratch with [Yarn 3](https://yarnpkg.com) in [unplugged mode](https://yarnpkg.com/getting-started/migration#step-by-step).
* [yarn](react/yarn) - Built from scratch with [Yarn 3](https://yarnpkg.com) and [PnP mode](https://yarnpkg.com/features/pnp).

Each project also uses various tools for testing, linting, etc.  These variances are noted in each project README.

### Remix

The [Remix](remix) application was generated with `npx create-remix@latest` and all suggested defaults.

### Svelte

The [Svelte](svelte) application was generated with `npm create svelte <app name>` and all suggested defaults.

### Vue

The [Vue](vue) application was generated with `npm init vue@latest` and all suggested defaults.

## Mobile

### React Native

The [React Native](react-native) application was generated with the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) and all suggested defaults.

## Servers

### Node.js

The [Node.js](node.js) directory contains examples involving Connect for Node. There are various server implementations
that will serve both Connect endpoints and the Eliza frontend interface. There are server examples showing vanilla
Node.js (using the `http` package) and [Fastify](https://fastify.io).

In addition, there is a terminal client that can be run to interact with the servers.
