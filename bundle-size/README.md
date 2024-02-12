Bundle Size Testing
========================================

For our bundle size tests, we import `compressedFlag` from `@connectrpc/connect/protocol`.
`compressedFlag` is a simple numeric constant, but the file it is defined in contains other
symbols as well. We are intentionally importing from a subpath, because this requires bundlers
to honor the "exports" fields.

The results are:

<!--- RESULTS-START -->
| Name | Size | Artifact |
|------|-----:|----------|
| esbuild | 165 bytes | dist/index.js |
| webpack | 38 bytes | dist/main.js |
| webpack-ts | 38 bytes | dist/bundle.js |
| vite | 16 bytes | dist/consumer-vite.js |
| rollup | 93 bytes | dist/index.js |
| parcel | 10,438 bytes | dist/index.bce52f59.js |
<!--- RESULTS-END -->

To run all tests, and update the table above:

```bash
$ npm ci
$ bash test.bash
```

### Testing regressions with local changes

#### Connect-ES

First, clone the branch you would like to test from https://github.com/connectrpc/connect-es.

Then, run the following commands:

```bash
cd packages/connect
npm run build
npm pack
```

The above `pack` command will generate a tarball in the `packages/connect` directory named something like

```
connectrpc-connect-<CONNECT_VERSION>.tgz
```

Next, navigate back to this directory and install the local Connect-ES package:

```bash
tar -xvf <PATH_TO_CONNECT_ES>/packages/connect/connectrpc-connect-<CONNECT_VERSION>.tgz
rm -rf node_modules/@connectrpc/connect
mv package node_modules/@connectrpc/connect
```

Run the tests again:

```bash
$ bash test.bash
```

Verify that the bundle sizes have not changed significantly. It is possible that the bundle sizes have changed slightly
based on other coding changes, but the deltas should be minimal.
