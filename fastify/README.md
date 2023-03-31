# Eliza

This directory shows examples of Connect for Node.js using the [Fastify](https://fastify.io) framework.

## Server

To start the server, run `npm start`

## Clients

Once a server is started, there are multiple variations of clients to interact with it.

### Browser

#### Full-stack

By default, the Fastify server also serves the frontend Eliza interface. Visit [http://localhost:3000](http://localhost:3000) 
to view it in a browser. This is a full-stack example using Connect for Web.

#### CORS example

It is also possible to run the frontend interface on a separate port to make use of the CORS setup. To do so, run the
command `npm run serve` and then visit [http://localhost:8080](http://localhost:8080) in a browser.

### Terminal

Run `npm run client` to start a terminal client using Connect for Node.js.

## Other helpful commands

### `npm run test`

Run the unit tests via Jasmine.

### `npm run buf:generate`

Use `buf` to generate the compiled protos via Protobuf-ES.
