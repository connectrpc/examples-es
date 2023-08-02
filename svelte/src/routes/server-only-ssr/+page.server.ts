import { ElizaService } from "../../gen/connectrpc/eliza/v1/eliza_connect";
import { SayRequest } from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@bufbuild/connect";
import { wrapFetch } from "../../utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const transport = createGrpcWebTransport({
    baseUrl: "https://demo.connectrpc.com",
    fetch: wrapFetch("calling from gRPC-web in server-only SSR", fetch),
  });

  const client = createPromiseClient(ElizaService, transport);

  const request = {
    sentence: "hi from the server",
  };

  const response = await client.say(new SayRequest(request));

  /**
   * The values on `response` (such as `sentence`) are regular JavaScript values.
   * This means that we can easily pass them directly.
   * The nice thing about doing this is that you retain full typing for `sentence: string`.
   */
  const plainProperty = response.sentence;

  /**
   * However, if we want to pass the entire response, we call `.toJson()` since what's passed through
   * the SSR boundary must be plain JSON.
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
