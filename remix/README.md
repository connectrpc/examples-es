# Eliza

This project was bootstrapped as a [Remix](https://remix.run) project with the command:

`npx create-remix@latest`

Other tools used:

* [Rollup](https://rollupjs.org/) (Bundler)
* [pnpm](https://pnpm.io/) (Package Manager)

## Getting Started

### `pnpm install`
### `pnpm start`

This starts your app in development mode, rebuilding assets on file changes.

## Helpful Commands

### `pnpm run generate`

Use `buf` to generate the compiled protos via protobuf-es

### `pnpm run build`

Build the app using Rollup.

### `pnpm run start:production`

Run the app in production mode.

## Making sure you're on the right `pnpm` version

Ensure that you've got corepack enabled:

```console
corepack enable
```

This should only be necessary once.

Verify that `pnpm --version` matches the `packageManager` version in `package.json`.
