console.log('intermediary load')
const { ConnectError: a } = require("@connectrpc/connect");
const { createFetchClient: b } = require("@connectrpc/connect/protocol");
const { createTransport: c } = require("@connectrpc/connect/protocol-grpc");
const { createTransport: d } = require("@connectrpc/connect/protocol-grpc-web");
const { createTransport: e } = require("@connectrpc/connect/protocol-connect");

module.exports.intermediary = {
  a,
  b,
  c,
  d,
  e,
};
