Bundle Size Testing
========================================

This directory is meant for testing only and is not intended to illustrate examples for
using Connect-ES. The purpose of this directory is to build a bundle with various bundlers
to test the effect of changes to Connect-ES and how those changes impact bundle size.

For our bundle size tests, we import two symbols to get effective coverage:

* `compressedFlag` from `@connectrpc/connect/protocol`, which is a simple numeric constant. However, the file it is 
defined in contains other symbols as well. We are intentionally importing from a subpath, because this requires bundlers
to honor the `exports` fields.
* `SayRequest` from code generated from the Eliza protos. This allows us to test tree-shaking with generated code.

The results are:

<!--- RESULTS-START -->
| Name | Size | Artifact |
|------|-----:|----------|
| esbuild | 82,796 bytes | dist/index.js |
| webpack | 33,817 bytes | dist/main.js |
| webpack-ts | 33,817 bytes | dist/bundle.js |
| vite | 54,732 bytes | dist/consumer-vite.js |
| rollup | 2,809 bytes | dist/index.js |
| parcel | 72,685 bytes | dist/index.bfe2d88b.js |
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
