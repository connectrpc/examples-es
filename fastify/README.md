# Eliza

This directory shows examples of Connect for Node.js using the [Fastify](https://fastify.io) framework.

## Server

To start the server, run `npm start`

## Clients

Once a server is started, there are multiple variations of clients to interact with it.

### Browser

By default, the Fastify server also serves the frontend Eliza interface. Visit [http://localhost:3000](http://localhost:3000)
to view it in a browser. This is a full-stack example using Connect for Web.

### Terminal

Run `npm run client` to start a terminal client using Connect for Node.js.

#### CORS example

To see the CORS setup in action, run `npm start 3001` and then visit [http://localhost:3001](http://localhost:3001)
in a browser. The browser client will send requests to localhost:3000,
triggering CORS.


## Other helpful commands

### `npm run test`

Run the unit tests via Jasmine.

### `npm run generate`

Use `buf` to generate the compiled protos via Protobuf-ES.
