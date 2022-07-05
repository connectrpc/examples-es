# Eliza TS

The example projects in this directory were all bootstrapped with 

`npm create svelte eliza-ts`

## Issues Found
 - Usage of BigInteger requires specifying the following in `svelte.config.js`
 ```
build: {
    target: [ 'es2020' ]
}
```
