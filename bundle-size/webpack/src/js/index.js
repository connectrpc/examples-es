import { compressedFlag } from "@connectrpc/connect/protocol";
import { SayRequest, SayVolume } from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { proto3 } from "@bufbuild/protobuf";

const testEnum = proto3.getEnumType(SayVolume);

if (
  compressedFlag === 1 &&
  SayRequest.typeName === "connectrpc.eliza.v1.SayRequest" &&
  testEnum.typeName === "connectrpc.eliza.v1.SayVolume"
) {
  console.log("webpack (js) OK");
}
