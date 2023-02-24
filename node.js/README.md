# Eliza

This project shows an example of Connect for Node.js working in concert with Connect for Web.

## Getting Started

### `npm install`
### `npm start`

Starts a vanilla Node `http` server running at `localhost:3000`. Note that this server uses plaintext HTTP/1.1.  
If you'd like to use gRPC over HTTP/2, visit the [Connect for Node docs](https://connect.build/docs/node/getting-started#use-the-grpc-protocol-instead-of-the-connect-protocol)
for details on how to do so.

Visit [http://localhost:3000](http://localhost:3000) to view it in a browser using Connect for Web.

Additionally, run `npm run client` to start a terminal client using Connect for Node.js.

## Helpful Commands

### `npm run test`

Run the unit tests via Jasmine.

### `npm run buf:generate`

Use `buf` to generate the compiled protos via Protobuf-ES.

