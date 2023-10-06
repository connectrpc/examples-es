set -x

npm start -w consumer-esbuild
npm start -w consumer-webpack
npm start -w consumer-webpack-ts
npm start -w consumer-vite
npm start -w consumer-rollup
npm start -w consumer-parcel
npm start -w consumer-snowpack

node README.mjs
