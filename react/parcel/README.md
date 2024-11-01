# Eliza

This project was created from scratch using React and [Parcel](https://parceljs.org/) as the underlying bundler/module loader.

## Getting Started

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Helpful Commands

### `npm run build`

Build the app using Parcel.

### `npm run generate`

Use `buf` to generate the compiled protos via protobuf-es

### Gotcha

Connect-ES and Protobuf-ES use package exports. To support them with Parcel, we 
enable them in package.json. See https://parceljs.org/features/dependency-resolution/#enabling-package-exports
