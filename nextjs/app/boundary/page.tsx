import { create } from "@bufbuild/protobuf";
import { PayloadSchema } from "../../gen/payload_pb";
import Client from "./client";


export default function Page() {

  // We can pass the Protobuf message `Payload` to a client side component as a
  // prop. Next.js can handle BigInt, floating point values such as Infinity, and
  // Uint8Array. Any Protobuf message with syntax proto3 (or the Editions equivalent)
  // can cross the boundary.
  //
  // Note that proto2 messages use the prototype chain to track field presence,
  // which Next.js does not support when crossing the boundary. If you encounter
  // such a case, you have the following options:
  // - Serialize to JSON and reparse using the schema.
  // - Use the plugin option `json_types=true` to get typed JSON from toJson().
  const payload = create(PayloadSchema, {
    str: "abc",
    double: Number.POSITIVE_INFINITY,
    largeNumber: 123n,
    bytes: new Uint8Array([0, 1, 2]),
  });

  return (
    <div>
      <Client payload={payload}></Client>
    </div>
  );
}
