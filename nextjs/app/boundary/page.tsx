import { create } from "@bufbuild/protobuf";
import { PayloadSchema } from "../../gen/payload_pb";
import Client from "./client";


export default function Page() {

  // We can pass the Protobuf message `Payload` to a client side component as a
  // prop.
  //
  // Next.js can handle bigint, Infinity and typed arrays when crossing the
  // serialization boundary, since they are serializable by React. For details,
  // see https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization
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
