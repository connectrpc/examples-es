# Eliza

This project shows examples of Connect for Node.js working in concert with Connect for Web.

## Servers

There are two different server implementations that can be run.  All servers will not only serve Connect endpoints,
but will also serve the frontend Eliza interface.  

Note all servers use plaintext HTTP/1.1 and will listen at `localhost:3000`. If you'd like to use gRPC over HTTP/2, 
visit the [Connect for Node docs](https://connect.build/docs/node/getting-started#use-the-grpc-protocol-instead-of-the-connect-protocol)
for details on how to do so.

### Vanilla Node (using the `http` package)

To start the vanilla Node.js server, run `npm run start:vanilla`.

### Fastify

To start the Fastify server, run `npm run start:fastify`.

## Clients

### Browser

Once a server is started, visit [http://localhost:3000](http://localhost:3000) to view the Eliza demo in a browser 
using Connect for Web.

### Terminal

Additionally, run `npm run client` to start a terminal client using Connect for Node.js.

## Helpful Commands

### `npm run test`

Run the unit tests via Jasmine.

### `npm run buf:generate`

Use `buf` to generate the compiled protos via Protobuf-ES.

