# Eliza

This project was created from scratch using React and [Yarn 3](https://yarnpkg.com) with [esbuild](https://esbuild.github.io/) as the bundler.

Note that while this project is using Yarn 3, it is running in [unplugged mode](https://yarnpkg.com/getting-started/migration#step-by-step), 
which does not use the Plug'n'Play configuration in Yarn 3.  This means that it is still compatible with the traditional `node_modules` setup.

Other tools used:

* [Vite](https://vitejs.dev/) (Bundler)

## Getting Started

### `yarn install`
### `yarn start`

Opens the index.html file in a browser, pointed to the `dist` directory built by esbuild.

## Helpful Commands

### `yarn run build`

Build the app using Vite.

### `yarn run buf:generate`

Use `buf` to generate the compiled protos via protobuf-es

