set -x

npm ci

# you'll need https://github.com/Schniz/fnm

fnm exec --using=v20 node consumer/index.js
fnm exec --using=v18 node consumer/index.js
fnm exec --using=v16 node consumer/index.js
fnm exec --using=v14 node consumer/index.js
fnm exec --using=v12 node consumer/index.js

npm run build:parcel && node parcel/dist/index.js
npm run build:webpack && node webpack/dist/main.js
npm run build:rollup && node rollup/dist/bundle.js
npm run build:vite && node vite/dist/bundle.mjs
npm run build:esbuild && node esbuild/dist/out.js
