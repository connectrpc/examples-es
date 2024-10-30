import {create} from "@bufbuild/protobuf";
import type {PageServerLoad} from "./$types";
import {type Payload, PayloadSchema} from "../../gen/payload_pb";
import {createConnectTransport} from "@connectrpc/connect-web";
import {createClient} from "@connectrpc/connect";
import {ElizaService} from "../../gen/connectrpc/eliza/v1/eliza_pb";

/**
 * This load function always runs on the server. The data it returns is
 * serialized, embedded into the page, and hydrated on page load.
 *
 * To learn about the distinction between universal load functions and
 * this server load function, see https://kit.svelte.dev/docs/load#universal-vs-server
 */
export const load: PageServerLoad = async ({ fetch }) => {
  const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
    // We pass `fetch` provided by Svelte to the Transport. The function
    // behaves the same as native fetch(), but it inherits cookies, and
    // it can make relative requests, so you don't have to specify an
    // absolute baseUrl.
    // For more information, see https://kit.svelte.dev/docs/load#making-fetch-requests
    fetch,
  });

  const client = createClient(ElizaService, transport);

  const sayResponse = await client.say({
    sentence: "hi",
  });

  const payload: Payload = create(PayloadSchema, {
    str: "abc",
    double: Number.POSITIVE_INFINITY,
    largeNumber: 123n,
    bytes: new Uint8Array([0, 1, 2]),
  });

  return {
    sayResponse,
    payload,
  };
};
