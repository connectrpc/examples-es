Example for the dual package hazard
===================================

This example demonstrates the dual package hazard for `@connectrpc/connect` v1.1.1
and earlier.

`intermediary` is a CommonJS-only package that re-exports from `@connectrpc/connect`.

`consumer-*` are ESM packages that directly import from `@connectrpc/connect`, but
also from the intermediary. 

This causes duplicated identities: `instanceof` does not work as expected, and 
bundle size would unnecessarily increase in a web project.


### How to run

We have 5 test cases, from a to e. They simply do a strict comparison (`===`) 
between imports from `@connectrpc/connect` and imports from `itermediary`.

To run the tests in several versions of Node.js, and also with various bundlers,
run:

```bash
$ npm ci
$ bash test.bash
```

Expected output for test is:

```
a FAIL
b FAIL
c FAIL
d FAIL
e FAIL
```

Vite is an exception: It is smart enough (?) to resolve the `require` calls in 
`intermediary` as ESM, avoiding the dual package hazard.


### Applying a fix

Clone branch `tstamm/esmwrapper` from https://github.com/connectrpc/connect-es.

```bash
cd packages/connect
npm run build
npm pack
```

Install the fix in this example:

```bash
tar -xvf <PATH_TO_CONNECT_ES>/packages/connect/connectrpc-connect-1.1.1.tgz
rm -rf node_modules/@connectrpc/connect
mv package node_modules/@connectrpc/connect
```

Run the tests again:

```bash
$ bash test.bash
```

Expected output for every test is:

```
a OK
b OK
c OK
d OK
e OK
```
