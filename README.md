# connect-web-integration
Connect Web Integration tests the integration of connect-web in various JS frameworks and tooling

Each of the below main frameworks have three separate projects underneath all integrating with the ELIZA Connect demo.

- eliza     (plain JavaScript)
- eliza-ts  (TypeScript)

In addition to the above, the `react` directory contains a  `bespoke` project which was pieced together with different
technologies.  Technologies used for each are specified in the directory's README.

## Frameworks

### React

The React applications were created with `create-react-app` and all suggested defaults.

- Technologies used
    - Bundler: Webpack
    - Package Manager:  npm
    - Testing:  Jest

- Issues
    - When using TypeScript with Webpack, you will need the [resolve-typescript-plugin](https://github.com/softwareventures/resolve-typescript-plugin) 

### Remix

The Remix applications were created with `npx create-remix@latest` and all suggested defaults.

- Technologies used
    - Bundler: Remix Compiler (ESBuild)
    - Package Manager:  pnpm

### Svelte

The Svelte applications were created with `npm create svelte <app name>` and all suggested defaults.

- Technologies used
    - Bundler: Vite
    - Package Manager:  npm
    - Testing:  Playwright

###  Vue

The Vue applications were created with `npm init vue@latest` and all suggested defaults.

- Technologies used
    - Bundler: Vite
    - Package Manager:  npm
    - Testing:  Cypress


## Overall Notes
- When using a TypeScript project, the `buf.gen.yaml` file should be configured with `opt: target=ts`
