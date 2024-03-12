import { compressedFlag } from "@connectrpc/connect/protocol";
import { SayRequest, Test } from "./gen/connectrpc/eliza/v1/eliza_pb.js";

if (compressedFlag === 1 && SayRequest !== undefined) {
  console.log("esbuild (js) OK");
}
