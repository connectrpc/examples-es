Example for the dual package hazard
===================================

This example demonstrates the dual package hazard for `@connectrpc/connect` v1.0.0.

`intermediary` is a CommonJS-only package that re-exports from `@connectrpc/connect`.

`consumer` is a ESM package that directly imports from `@connectrpc/connect`, but
also from the intermediary. 

This causes duplicated identities: `instanceof` does not work as expected, and 
bundle size would unnecessarily increase in a web project.


### How to run

We have 5 test cases, from a to e. They simply do a strict comparison (`===`) 
between imports from `@connectrpc/connect` and imports from `itermediary`.

To run the tests in several versions of Node.js:

```bash
$ bash test.bash
```

Expected output for every version of Node.js is:

```
a FAIL
b FAIL
c FAIL
d FAIL
e FAIL
```


### Applying a fix

Clone branch `tstamm/esmwrapper` from https://github.com/connectrpc/connect-es.

```bash
cd packages/connect
npm run build
npm pack
ls connectrpc-connect-1.0.0.tgz
```

Install the fix in this example:

```bash
npm i <PATH_TO_CONNECT_ES>/packages/connect/connectrpc-connect-1.0.0.tgz
```

Run the tests again:

```bash
$ bash test.bash
```

Expected output for every version of Node.js is:

```
a OK
b OK
c OK
d OK
e OK
```
