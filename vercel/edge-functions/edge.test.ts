import { after, test } from "node:test";
import { EdgeRuntime, runServer } from "edge-runtime";
import type {} from "@edge-runtime/types";
import * as esbuild from "esbuild";
import * as assert from "node:assert";
import { createConnectTransport } from "@connectrpc/connect-node";
import { GeoLocationService } from "./lib/gen/geolocation/v1/geolocation_connect.js";
import { ElizaService } from "./lib/gen/connectrpc/eliza/v1/eliza_connect.js";
import { createPromiseClient } from "@connectrpc/connect";

test("edge", async (t) => {
  let bundle = await esbuild.build({
    entryPoints: ["./edge.ts"],
    bundle: true,
    format: "esm",
    target: "es2019",
    minify: true,
    write: false,
  });
  assert.strictEqual(bundle.errors.length, 0);
  assert.strictEqual(bundle.outputFiles?.length, 1);

  const runtime = new EdgeRuntime({
    initialCode: bundle.outputFiles![0].text,
  });
  const server = await runServer({ runtime });
  after(() => server.close());

  const transport = createConnectTransport({
    baseUrl: `http://localhost:3000/api`,
    httpVersion: "1.1",
    useBinaryFormat: true,
  });
  await t.test("geo location", async () => {
    const client = createPromiseClient(GeoLocationService, transport);
    const geo = await client.getGeoLocation({});
    assert.ok(geo.geoLocation);
  });
  await t.test("eliza", async (t) => {
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
