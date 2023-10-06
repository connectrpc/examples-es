# Vercel Edge Function

This project was created using:

```sh
npx create-next-app --example https://github.com/vercel/examples/tree/main/edge-functions/hello-world edge-hello-world
```

It relies on [`edge-runtime`](https://edge-runtime.vercel.app/packages/runtime) to run the function locally.

## Server

To start the server, run `npx vercel dev`. This starts a local development server but requires login to Vercel.

## Test

### `npm run test`

Run the unit tests via node. They also showcase the function in action. See [`geo.spec.ts`](src/url-shortener.test.ts) for more details.

## Other helpful commands

### `npm run generate`

Use `buf` to generate the compiled protos via Protobuf-ES and Connect.

### `npx vercel deploy`

Deploys the function to Vercel. This requires login to Vercel.
