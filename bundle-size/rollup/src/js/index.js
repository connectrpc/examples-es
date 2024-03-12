import { compressedFlag } from "@connectrpc/connect/protocol";
import { SayRequest } from "./gen/connectrpc/eliza/v1/eliza_pb.js";

if (compressedFlag === 1 && SayRequest !== undefined) {
  console.log("rollup (js) OK");
}
