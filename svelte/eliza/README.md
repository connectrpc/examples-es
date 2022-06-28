# Svelte

The example projects in this directory were all bootstrapped with 

`npm create svelte eliza`

## Issues Found
 - Usage of BigInteger requires specifying the following in `vite.config.js`
 ```
build: {
    target: [ 'es2020' ]
}
```
