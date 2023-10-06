import { geolocation } from "@vercel/edge";
import { createEdgeFunctionHandler } from "../lib/function-handler";
import { GeoLocationService } from "../lib/gen/geolocation/v1/geolocation_connect";
import { kGeo } from "../lib/geo-context";
import { createContextValues, createPromiseClient } from "@connectrpc/connect";
import { createFetchClient } from "@connectrpc/connect/protocol";
import { createTransport } from "@connectrpc/connect/protocol-connect";
import { ElizaService } from "../lib/gen/connectrpc/eliza/v1/eliza_connect";

export const config = {
  runtime: "edge",
};

export default createEdgeFunctionHandler({
  stripPrefixPath: "/edge",
  contextValues(req) {
    return createContextValues().set(kGeo, geolocation(req));
  },
  routes({ service }) {
    const eliza = createPromiseClient(
      ElizaService,
      createTransport({
        baseUrl: "https://demo.connectrpc.com",
        httpClient: createFetchClient(fetch),
        useBinaryFormat: true,
        interceptors: [],
        acceptCompression: [],
        sendCompression: null,
        compressMinBytes: 1024,
        readMaxBytes: 0xffffffff,
        writeMaxBytes: 0xffffffff,
      })
    );
    service(GeoLocationService, {
      async getGeoLocation(_, { values: { get } }) {
        const geo = get(kGeo);
        return {
          geoLocation: {
            ...geo,
          },
        };
      },
    });
    service(ElizaService, {
      async say(req) {
        return {
          sentence: `${await eliza.say(req)} | Sent via Vercel Edge Function`,
        };
      },
      async *introduce(req) {
        try {
          for await (const next of eliza.introduce(req)) {
            yield {
              sentence: `${next.sentence} | Sent via Vercel Edge Function`,
            };
          }
        } catch (e) {
          console.error(e);
        }
      },
    });
  },
});
