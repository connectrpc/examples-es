import { geolocation } from "@vercel/edge";
import {
  createEdgeFunctionHandler,
  createConnectTransport,
} from "../../lib/connect";
import { GeoLocationService } from "../../lib/gen/geolocation/v1/geolocation_connect";
import { kGeo } from "../../lib/geo-context";
import { createContextValues, createPromiseClient } from "@connectrpc/connect";
import { ElizaService } from "../../lib/gen/connectrpc/eliza/v1/eliza_connect";
import { createTransport } from "@connectrpc/connect/protocol-connect";

export const config = {
  runtime: "edge",
};

export default createEdgeFunctionHandler({
  stripPrefixPath: "/api",
  contextValues(req) {
    return createContextValues().set(kGeo, geolocation(req));
  },
  routes({ service }) {
    const eliza = createPromiseClient(
      ElizaService,
      createConnectTransport({
        baseUrl: "https://demo.connectrpc.com",
      })
    );
    service(GeoLocationService, {
      async getGeoLocation(_, { values }) {
        const geo = values.get(kGeo);
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
        for await (const next of eliza.introduce(req)) {
          yield {
            sentence: `${next.sentence} | Sent via Vercel Edge Function`,
          };
        }
      },
    });
  },
});
