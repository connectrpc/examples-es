# UrlShortener

This project was created using `npm create cloudflare@2`. It uses the [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) cli tool to manage the project.

## Server

To start the server, run `npm start`. This starts a local development server.

## Test

### `npm run test`

Run the unit tests via node. They also showcase the worker in action. See [`url-shortener.spec.ts`](src/url-shortener.test.ts) for more details.

## Other helpful commands

### `npm run generate`

Use `buf` to generate the compiled protos via Protobuf-ES and Connect.

### `npm run deploy`

Deploys the worker to Cloudflare. This requires `wrangler.toml` file with the appropriate credentials.
