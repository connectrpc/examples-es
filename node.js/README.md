# Eliza

This project shows examples of Connect for Node.js working in concert with Connect for Web.

## Servers

There are many different server implementations that can be run.  All implementations serve both the Connect endpoints 
as well as the frontend Eliza interface.  

Note all servers use plaintext HTTP/1.1 and will listen at `localhost:3000`. If you'd like to use gRPC over HTTP/2, 
visit the [Connect for Node docs](https://connect.build/docs/node/getting-started#use-the-grpc-protocol-instead-of-the-connect-protocol)
for details on how to do so.

### Vanilla Node (using the `http` package)

To start the vanilla Node.js server, run `npm run start:vanilla`.

### Fastify

To start the Fastify server, run `npm run start:fastify`.

### Express

To start the Express server, run `npm run start:express`.

## Clients

Once a server is started, there are multiple variations of clients to interact with it.

### Browser

#### Full-stack

Since all servers also serve the frontend Eliza interface, visit [http://localhost:3000](http://localhost:3000) to 
view the Eliza demo in a browser. This is a full-stack example using Connect for Web.

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

