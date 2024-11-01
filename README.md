examples-es
===========

[![Build](https://github.com/connectrpc/examples-es/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/connectrpc/examples-es/actions/workflows/ci.yaml)

`examples-es` is a repository of example projects using Connect with various TypeScript web frameworks and tooling.
It provides numerous examples for integrating Connect into a project, using both Connect for Web and Connect for Node.

> [!IMPORTANT]  
> All examples in this branch use Connect packages in version 1.
> For examples for version 2, see [main](https://github.com/connectrpc/examples-es/).

## Web

### Angular

The [Angular](https://angular.io) application was generated with the [Angular CLI](https://github.com/angular/angular-cli).

### Astro

The [Astro](astro) application was generated with `npm create astro@latest -- --template basics` and all suggested defaults.

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
* [yarn-pnp](react/yarn-pnp) - Built from scratch with [Yarn 3](https://yarnpkg.com) and [PnP mode](https://yarnpkg.com/features/pnp).

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

The server examples make use of Connect for Node.js using various frameworks. All servers serve both Connect endpoints
and the Eliza frontend interface. There are multiple kinds of clients available that can be used to interact with the
server such as a terminal client and browser clients using both a full-stack setup as well as a CORS setup.

### Express

The [express](express) directory contains an example involving Connect for Node.js with the [Express](https://expressjs.com)
framework.

### Fastify

The [fastify](fastify) directory contains an example involving Connect for Node.js with the [Fastify](https://fastify.io)
framework.

### Vanilla Node.js

The [vanilla-node](vanilla-node) directory contains an example involving Connect for Node.js with vanilla Node.js using
the `http` package.

### Cloudflare Workers

The [cloudflare-workers](cloudflare-workers) directory contains an example involving Connect running on [Cloudflare Workers](https://workers.cloudflare.com).

## Misc

### Custom Client Signature

The [custom-client](custom-client) directory contains an example demonstrating how to create a custom client signature.

## Legal

Offered under the [Apache 2 license][license].

[license]: https://github.com/connectrpc/examples-es/blob/main/LICENSE.txt
