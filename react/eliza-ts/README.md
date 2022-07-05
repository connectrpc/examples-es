# eliza-ts

This project was bootstrapped with create-react-app using the command

`npx create-react-app eliza-ts --template typescript`

## Issues Found
 - If using `opt: target=ts` in `buf.gen.yaml`, project must also be configured to use TypeScript or imports won't work
 - When using `opt: target=ts`, you will also need the `ResolveTypeScriptPlugin` in webpack config because webpack 
  doesn't resolve imports with a `.js` extension.  Note that this will also require you to add a `.js` extension to your app
  file imports.


## Helpful Commands

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `buf generate buf.build/bufbuild/eliza`

Use `buf` to generate the compiled protos via protobuf-es

