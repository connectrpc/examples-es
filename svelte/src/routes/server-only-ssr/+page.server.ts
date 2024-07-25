import { create, toJson } from "@bufbuild/protobuf";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import type { PageServerLoad } from "./$types";
import {
  ElizaService,
  SayRequestSchema,
} from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { PayloadSchema } from "../../gen/payload_pb";

/**
 * This load function always runs on the server. The data it returns is
 * serialized, embedded into the page, and hydrated on page load.
 *
 * To learn about the distinction between universal load functions and
 * this server load function, see https://kit.svelte.dev/docs/load#universal-vs-server
 */
export const load: PageServerLoad = async ({ fetch }) => {
  const transport = createGrpcWebTransport({
    baseUrl: "https://demo.connectrpc.com",
    // We pass `fetch` provided by Svelte to the Transport. The function
    // behaves the same as native fetch(), but it inherits cookies, and
    // it can make relative requests, so you don't have to specify an
    // absolute baseUrl.
    // For more information, see https://kit.svelte.dev/docs/load#making-fetch-requests
    fetch,
  });

  const client = createPromiseClient(ElizaService, transport);

  const request = create(SayRequestSchema, {
    sentence: "hi from the server",
  });

  const response = await client.say(request);

  const payload = create(PayloadSchema, {
    str: "abc",
    double: Number.POSITIVE_INFINITY,
    largeNumber: 123n,
    bytes: new Uint8Array([0, 1, 2]),
  });

  return {
    // The messages `SayRequest` and `SayResponse` are simple proto3 messages.
    // They are plain objects in JavaScript, and Next.js can serialize them to JSON
    // to ship the server side props to the client.
    request,
    response,

    // The message `Payload` uses values that Svelte cannot serialize and embed -
    // bigint, Infinity, and typed arrays. proto2 messages use the prototype
    // chain to track field presence, which also isn't supported in Svelte.
    //
    // If you encounter such a case, you have the following options:
    // - If BigInt is the issue, consider to add the field option `[jstype = JS_STRING]`
    //   in Protobuf.
    // - Serialize to JSON and reparse using the schema.
    // - Use the plugin option `json_types=true` to get typed JSON from toJson().
    payloadJson: toJson(PayloadSchema, payload),
  };
};
