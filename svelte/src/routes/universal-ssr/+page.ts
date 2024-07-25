import { create } from "@bufbuild/protobuf";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import type { PageLoad } from "./$types";
import {
  ElizaService,
  SayRequestSchema,
} from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { PayloadSchema } from "../../gen/payload_pb";

/**
 * This load function runs on the server on first page load. The fetch call it
 * makes is recorded, and the response is serialized and embedded into the page.
 * When the page loads in the browser, the function runs again, but the fetch call
 * does not hit the network, and returns the serialized and embedded response
 * instead.
 *
 * This load function always returns type-safe data, even if your messages use
 * bigint, typed arrays, or field presence (which is tracked by the prototype
 * chain).
 *
 * Note that your have to use the Connect transport for universal load functions.
 * With gRPC-web or any other binary data (this includes the protobuf binary
 * format and all streaming RPCs), Svelte falls back to always run the function
 * in the browser. For details, see https://github.com/sveltejs/kit/issues/8302
 *
 * To learn about the distinction between universal load functions and
 * this server load function, see https://kit.svelte.dev/docs/load#universal-vs-server
 */
export const load: PageLoad = async ({ fetch }) => {
  const transport = createConnectTransport({
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
    request,
    response,
    payload,
  };
};
