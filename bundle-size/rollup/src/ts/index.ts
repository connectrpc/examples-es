import { compressedFlag } from "@connectrpc/connect/protocol";
import { SayRequest, Test } from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { proto3 } from "@bufbuild/protobuf";

const testEnum = proto3.getEnumType(Test);

if (
  compressedFlag === 1 &&
  SayRequest !== undefined &&
  testEnum.typeName === "connectrpc.eliza.v1.Test"
) {
  console.log("rollup (ts) OK");
}
