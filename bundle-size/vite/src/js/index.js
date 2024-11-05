import { compressedFlag } from "@connectrpc/connect/protocol";
import {
  SayRequestSchema,
  SayVolumeSchema,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";

if (
  compressedFlag === 1 &&
  SayRequestSchema.typeName === "connectrpc.eliza.v1.SayRequest" &&
  SayVolumeSchema.typeName === "connectrpc.eliza.v1.SayVolume"
) {
  console.log("vite (js) OK");
}
