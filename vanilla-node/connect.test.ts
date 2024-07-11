import { createPromiseClient, createRouterTransport, ServiceImpl } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { describe, it } from "node:test";
import assert from "node:assert";
import { ElizaService, SayRequestSchema } from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { ConverseRequest, IntroduceRequest, SayRequest } from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import routes from "./connect.js";
import { setupTestServer } from "./setup-test-server.js";
import { build } from "./server.js";
import { create } from "@bufbuild/protobuf";

describe("testing the eliza service with an in-memory server", () => {
    it("say should repeat what we said", async () => {
        // Create an in-memory transport with the routes from connect.ts
        const transport = createRouterTransport(routes);
        const client = createPromiseClient(ElizaService, transport);
        const { sentence } = await client.say({ sentence: "hello" });
        assert.strictEqual(sentence, "You said hello");
    });
});

describe("testing the eliza service with a full HTTP server", () => {
    // For each test in this describe-block, set up the full HTTP server from server.ts
    const serverInfo = setupTestServer(build);
    // Alternatively, serve just the routes from connect.ts:
    // const serverInfo = setupTestServer(() => http.createServer(connectNodeAdapter({ routes })));
    it("say should repeat what we said", async () => {
        // create a transport for the test server
        const transport = createConnectTransport(serverInfo());
        const client = createPromiseClient(ElizaService, transport);
        const { sentence } = await client.say({ sentence: "hello" });
        assert.strictEqual(sentence, "You said hello");
    });
});

describe("unit testing the eliza service", () => {

    // We are not using this style in connect.ts, but services can also be
    // implemented as classes. This approach is useful for unit testing, making
    // it trivial to inject test-only dependencies via the constructor.
    class Eliza implements ServiceImpl<typeof ElizaService> {
        say(req: SayRequest) {
            return {
                sentence: `You said ${req.sentence}`,
            }
        }
        async * introduce(req: IntroduceRequest) {
            yield { sentence: `Hi ${req.name}, I'm Eliza` }
        }
        async * converse(reqs: AsyncIterable<ConverseRequest>) {
            for await (const req of reqs) {
                yield {
                    sentence: `You said ${req.sentence}`,
                }
            }
        }
    }

    it("say should repeat what we said", async () => {
        const eliza = new Eliza();
        const { sentence } = await eliza.say(create(SayRequestSchema, { sentence: "hello" }));
        assert.strictEqual(sentence, "You said hello");
    });
});
