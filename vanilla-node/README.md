# Eliza

This directory shows examples of Connect for Node.js using the `http` package from Node.js

## Server

To start the server, run `npm start`

## Clients

Once a server is started, there are multiple variations of clients to interact with it.

### Browser

By default, the `http` server also serves the frontend Eliza interface. Visit [http://localhost:3000](http://localhost:3000) 
to view it in a browser. This is a full-stack example using Connect for Web.

### Terminal

Run `npm run client` to start a terminal client using Connect for Node.js.

### CORS example

To see the CORS setup in action, run `npm start 3001` and then visit [http://localhost:3001](http://localhost:3001)
in a browser. The browser client will send requests to localhost:3000, 
triggering CORS.


## Tests

This example comes with tests. We are using the Node.js [built in test runner](https://nodejs.org/api/test.html)
to show different approaches to testing, from integration tests with a
full HTTP server to unit tests. 

Run `npm test` to run all tests. 

- [connect.test.ts](./connect.test.ts) shows testing a service.
- [client.test.ts](./client.test.ts) shows testing a client application.



## Other helpful commands

Run `npm run buf:generate` to generate the compiled protos via Protobuf-ES.
