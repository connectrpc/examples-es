# connect-web-integration
Connect Web Integration tests the integration of connect-web in various JS frameworks and tooling

## Frameworks

### React
- Technologies used
    - Bundler: Webpack
    - Package Manager:  npm
    - Testing:  Jest

- Issues
    - When using TypeScript with Webpack, you will need the resolve-typescript plugin 

### Remix
- Technologies used
    - Bundler: Remix Compiler (ESBuild)
    - Package Manager:  pnpm

### Svelte
- Technologies used
    - Bundler: Vite
    - Package Manager:  npm
    - Testing:  Playwright

###  Vue
- Technologies used
    - Bundler: Vite
    - Package Manager:  npm
    - Testing:  Cypress

### Overall Notes
- When using a TypeScript project, the `buf.gen.yaml` file should be configured with `opt: target=ts`
