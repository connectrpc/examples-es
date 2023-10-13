import { after, test } from "node:test";
import * as assert from "node:assert";
import { createConnectTransport } from "@connectrpc/connect-node";
import { GeoLocationService } from "./lib/gen/geolocation/v1/geolocation_connect.js";
import { ElizaService } from "./lib/gen/connectrpc/eliza/v1/eliza_connect.js";
import { createPromiseClient } from "@connectrpc/connect";
import { spawn } from "node:child_process";
import * as net from "net";

test("edge", async (t) => {
  const serverProcess = spawn("npx", ["vercel", "dev", "--listen", "3000"], {
    shell: false,
    detached: true,
  });
  after(() => serverProcess.kill());
  serverProcess.once("error", (err) => {
    throw err;
  });
  await new Promise<void>((resolve, reject) => {
    function checkServer() {
      const conn = net.createConnection(
        {
          host: "127.0.0.1",
          port: 3000,
        },
        () => {
          conn.destroy();
          resolve();
        }
      );
      conn.unref();
      conn.once("error", (err) => {
        if ("code" in err && err.code === "ECONNREFUSED") {
          process.nextTick(checkServer);
          return;
        }
        reject(err);
      });
    }
    checkServer();
  });
  const serverUrl = "http://127.0.0.1:3000";
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
