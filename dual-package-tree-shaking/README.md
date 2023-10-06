Tree-shaking tests with various bundlers
========================================

For our tree-shaking tests, we import `compressedFlag` from `@connectrpc/connect/protocol`.
`compressedFlag` is a simple numeric constant, but the file it is defined in contains other
symbols as well. We are intentionally importing from a subpath, because this requires bundlers
to honor the "exports" fields.

<!--- RESULTS-START -->
| Name | Size | Artifact |
|------|-----:|----------|
| esbuild | 165 bytes | dist/index.js |
| webpack | 38 bytes | dist/main.js |
| webpack-ts | 38 bytes | dist/bundle.js |
| vite | 16 bytes | dist/consumer-vite.js |
| rollup | 93 bytes | dist/index.js |
| parcel | 3,654 bytes | dist/index.e621422a.js |
| snowpack | 342 bytes | build/_snowpack/pkg/@connectrpc/connect/protocol.js |
<!--- RESULTS-END -->
