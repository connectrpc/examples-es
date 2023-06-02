import { ElizaService } from '../../gen/buf/connect/demo/eliza/v1/eliza_connect';
import { SayRequest } from '../../gen/buf/connect/demo/eliza/v1/eliza_pb';
import { createConnectTransport } from '@bufbuild/connect-web';
import { createPromiseClient } from '@bufbuild/connect';
import { wrapFetch } from '../../utils';
import type { PageLoad } from './$types';

// Note: take a look at `hooks.server.js`.  There's a bit of configuration there that the universal fetch handler depends on.

export const load: PageLoad = async ({ fetch }) => {
  const transport = createConnectTransport({
    baseUrl: 'https://demo.connect.build',
    fetch: wrapFetch('calling from connect in universal SSR', fetch),
  });

  const client = createPromiseClient(ElizaService, transport);

  const request = {
    sentence: "hi from the server",
  };

  const response = await client.say(new SayRequest(request));

  /**
   * The values on `response` (such as `sentence`) are regular JavaScript values.
   * This means that we can easily pass them directly.
   */
  const plainProperty = response.sentence;
  //    ^?
  //    The nice thing about doing this is that you retain full typing for `sentence: string`.

  /**
   * However, if we want to pass the entire response, we call `.toJson()` since what's passed through the SSR boundary must be plain JSON.
   *
   * You may also need to do this if you use BigInts or byte array (byte arrays use UInt8Array).
   */
  const fullResponseJson = response.toJson();
  //    ^?
  //    The downside to this approach is that you lose all type information (but you can get it right back! see `SayResponse.fromJson` in +page.svelte).

  return {
    request,
    plainProperty,
    fullResponseJson,
  };
}