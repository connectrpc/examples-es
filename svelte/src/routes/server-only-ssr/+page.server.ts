import { ElizaService } from "../../gen/connectrpc/eliza/v1/eliza_connect";
import { SayRequest } from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import { wrapFetch } from "../../utils";
import type { PageServerLoad } from "./$types";

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
    fetch: wrapFetch("calling from gRPC-web in server-only SSR", fetch),
  });

  const client = createPromiseClient(ElizaService, transport);

  const request = {
    sentence: "hi from the server",
  };

  const response = await client.say(new SayRequest(request));

  /**
   * The values on `response` (such as `sentence`) are JSON serializable
   * JavaScript values. This means that we can easily pass them directly.
   *
   * The nice thing about doing this is that you retain full typing for `sentence: string`.
   */
  const plainProperty = response.sentence;

  /**
   * However, if we want to pass the entire response, we call `.toJson()` since
   * what's passed through the SSR boundary must be plain JSON.
   *
   * You may also need to do this if you use BigInts or byte array (byte arrays use UInt8Array).
   * The downside to this approach is that you lose all type information and get `JsonValue`.
   * (but you can get it right back! see `SayResponse.fromJson` in +page.svelte)
   */
  const fullResponseJson = response.toJson();

  return {
    request,
    plainProperty,
    fullResponseJson,
  };
};
