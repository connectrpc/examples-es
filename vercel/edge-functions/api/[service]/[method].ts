import { RequestContext, geolocation } from "@vercel/edge";
import {
  createEdgeFunctionHandler,
  defaultTransportOptions,
} from "../../lib/functions";
import { GeoLocationService } from "../../lib/gen/geolocation/v1/geolocation_connect";
import { kGeo } from "../../lib/geo-context";
import { createContextValues, createPromiseClient } from "@connectrpc/connect";
import { ElizaService } from "../../lib/gen/connectrpc/eliza/v1/eliza_connect";
import { createTransport } from "@connectrpc/connect/protocol-connect";

export const config = {
  runtime: "edge",
};

const handler = createEdgeFunctionHandler({
  stripPrefixPath: "/api",
  contextValues(req) {
    return createContextValues().set(kGeo, geolocation(req));
  },
  routes({ service }) {
    const eliza = createPromiseClient(
      ElizaService,
      createTransport({
        ...defaultTransportOptions,
        baseUrl: "https://demo.connectrpc.com",
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
        for await (const next of eliza.introduce(req)) {
          yield {
            sentence: `${next.sentence} | Sent via Vercel Edge Function`,
          };
        }
      },
    });
  },
});

export default function POST(req: Request, ctx: RequestContext) {
  return handler(req, ctx);
}
