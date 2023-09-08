import { describe, it, expect } from "@jest/globals";
import { createPromiseClient, createRouterTransport } from "@connectrpc/connect";
import { ElizaService } from "../gen/connectrpc/eliza/v1/eliza_connect.js";
import routes from "../connect.js";

describe("testing the eliza service with an in-memory server", () => {
    it("say should repeat what we said", async () => {
        // Create an in-memory transport with the routes from connect.ts
        const transport = createRouterTransport(routes);
        const client = createPromiseClient(ElizaService, transport);
        const { sentence } = await client.say({ sentence: "hello" });
        expect(sentence).toBe("You said hello");
    });
});
