set -x

npm ci

# you'll need https://github.com/Schniz/fnm

npm start -w consumer-esbuild
npm start -w consumer-node
npm start -w consumer-parcel
npm start -w consumer-rollup
npm start -w consumer-ts
npm start -w consumer-vite
npm start -w consumer-vite-ts
npm start -w consumer-webpack
