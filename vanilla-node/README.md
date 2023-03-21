# Node.js

This directory shows examples of Connect for Node.js working in concert with Connect for Web.

There are many different server implementations that can be run.  All implementations serve both the Connect endpoints 
as well as the frontend Eliza interface.  

Note all servers use plaintext HTTP/1.1 and will listen at `localhost:3000`. If you'd like to use gRPC over HTTP/2, 
visit the [Connect for Node docs](https://connect.build/docs/node/getting-started#use-the-grpc-protocol-instead-of-the-connect-protocol)
for details on how to do so.

Available examples are:

* [express](express) - Uses [Express](https://expressjs.com) along with the Connect-ES server plugin [`@bufbuild/connect-express`](https://www.npmjs.com/package/@bufbuild/connect-express).
* [fastify](fastify) - Uses [Fastify](https://fastify.io) along with the Connect-ES server plugin [`@bufbuild/connect-fastify`](https://www.npmjs.com/package/@bufbuild/connect-fastify).
* [vanilla](vanilla) - Uses the `http` package in vanilla Node.js along with the `connectNodeAdapter` in [`@bufbuild/connect-node`](https://www.npmjs.com/package/@bufbuild/connect-node).
