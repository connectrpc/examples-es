import { test } from "node:test";
import * as assert from "node:assert";
import { createConnectTransport } from "@connectrpc/connect-node";
import { GeoLocationService } from "./lib/gen/geolocation/v1/geolocation_connect.js";
import { ElizaService } from "./lib/gen/connectrpc/eliza/v1/eliza_connect.js";
import { createPromiseClient } from "@connectrpc/connect";

test("edge", async (t) => {
  const serverUrl = "http://localhost:3000";
  const transport = createConnectTransport({
    baseUrl: `${serverUrl}/api`,
    httpVersion: "1.1",
    useBinaryFormat: false,
  });
  await t.test("geo location", async () => {
    const client = createPromiseClient(GeoLocationService, transport);
    const geo = await client.getGeoLocation({});
    assert.ok(geo.geoLocation);
  });
  await t.test("eliza", { skip: true }, async (t) => {
    const client = createPromiseClient(ElizaService, transport);
    const suffix = " | Sent via Vercel Edge Function";
    await t.test("unary", async () => {
      const res = await client.say({ sentence: "Hello" });
      assert.ok(res.sentence.endsWith(suffix));
    });
    await t.test("server stream", async () => {
      for await (const next of client.introduce({ name: "Edge" })) {
        assert.ok(next.sentence.endsWith(suffix));
      }
    });
  });
});
