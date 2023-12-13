Dual Package Hazard Testing
===================================

This example tests the dual package hazard for `@connectrpc/connect`.

`intermediary` is a CommonJS-only package that re-exports from `@connectrpc/connect`.

`consumer-*` are ESM packages that directly import from `@connectrpc/connect`, but
also from the intermediary.

In previous versions of Connect, this caused duplicated identities: `instanceof` did not work as expected, and
bundle size would unnecessarily increase in a web project.

This was fixed in v1.1.2 of Connect ([PR #842](https://github.com/connectrpc/connect-es/pull/842)). The tests
in this directory are meant to verify no regressions occur.

### How to run

We have 5 test cases, from a to e. They simply do a strict comparison (`===`)
between imports from `@connectrpc/connect` and imports from `intermediary`.

To run the tests in several versions of Node.js, and also with various bundlers,
run:

```bash
$ npm ci
$ bash test.bash
```

Expected output for test is:

```
a OK
b OK
c OK
d OK
e OK
```

### Testing regressions with local changes

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

Expected output for every test should still be:

```
a OK
b OK
c OK
d OK
e OK
```
