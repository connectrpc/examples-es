import { ConnectError as a } from "@connectrpc/connect";
import { createFetchClient as b } from "@connectrpc/connect/protocol";
import { createTransport as c } from "@connectrpc/connect/protocol-grpc";
import { createTransport as d } from "@connectrpc/connect/protocol-grpc-web";
import { createTransport as e } from "@connectrpc/connect/protocol-connect";

export const direct = {
  a,
  b,
  c,
  d,
  e,
};
