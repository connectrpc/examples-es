import { describe, it } from "node:test";
import assert from "node:assert";
import { setupTestServer } from "./setup-test-server.js";
import { build } from "./server.js";

describe("GET /", async () => {
    const serverInfo = setupTestServer(build);
    it("should return HTML", async () => {
        const response = await fetch(serverInfo().baseUrl);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers.get("Content-Type"), "text/html");
        const body = await response.arrayBuffer();
        assert.ok(body.byteLength > 0);
    });
});

describe("GET /webclient.js", async () => {
    const serverInfo = setupTestServer(build);
    it("should return JS", async () => {
        const response = await fetch(new URL("/webclient.js", serverInfo().baseUrl));
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers.get("Content-Type"), "application/javascript");
        const body = await response.arrayBuffer();
        assert.ok(body.byteLength > 0);
    });
});

