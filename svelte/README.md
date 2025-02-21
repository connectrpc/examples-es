# Eliza

This project was bootstrapped as a [Svelte](https://svelte.dev/) 5 project.

All default tooling setup via the above command is used, which includes:

- [Vite](https://vitejs.dev) (Module Loader)
- [Vitest](https://vitest.dev) (Unit Test Framework)
- [Playwright](https://playwright.dev) (e2e Testing Framework)
- [Svelte Kit](https://kit.svelte.dev/) (Application Framework)

The example includes server side rendering via a universal load function in [src/routes/universal-ssr](./src/routes/universal-ssr),
and a server-only load function in [src/routes/server-only-ssr](./src/routes/server-only-ssr). Run the app to see them
in action.

## Getting Started

### `npm install`

### `npm run dev`

Runs the app in development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Helpful Commands

### `npm run build`

Build the app using Vite.

### `npm run test`

Run unit tests via the Vitest framework and Svelte Testing Library.

### `npm run test:e2e`

Run e2e tests via the Playwright framework.

### `npm run generate`

Use `buf` to generate the compiled protos via protobuf-es.

## Bonus Commands

The following commands are also available via the Svelte starter project:

### `npm run preview`

Previews a built application on port 3000. Note that `npm run build` must be run initially or an error will occur.

### `npm run check`

Runs check against files for TypeScript errors.

### `npm run check:watch`

Runs check and also watches for changes.
