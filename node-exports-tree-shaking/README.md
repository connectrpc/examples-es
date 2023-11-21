Tree-shaking tests with various bundlers
========================================

For our tree-shaking tests, we import `compressedFlag` from `@connectrpc/connect/protocol`.
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
| parcel | 3,654 bytes | dist/index.e621422a.js |
<!--- RESULTS-END -->

To run all tests, and update the table above:

```bash
$ npm ci
$ bash test.bash
```

### Applying the Node exports fix

Clone branch `sayers/node_exports` from https://github.com/connectrpc/connect-es.

```bash
cd packages/connect
npm run build
npm pack
```

Install the fix in this example:

```bash
tar -xvf <PATH_TO_CONNECT_ES>/packages/connect/connectrpc-connect-1.1.3.tgz
rm -rf node_modules/@connectrpc/connect
mv package node_modules/@connectrpc/connect
```

Run the tests again:

```bash
$ bash test.bash
```
