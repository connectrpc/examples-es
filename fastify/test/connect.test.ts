import t from "tap";
import { build } from "../server.js";
import { ElizaService, SayResponseSchema } from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import { ConverseRequest, IntroduceRequest, SayRequest, SayRequestSchema, SayResponse } from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import { createConnectTransport } from "@connectrpc/connect-node";
import { createClient, createRouterTransport, ServiceImpl } from "@connectrpc/connect";
import routes from "../connect.js";
import assert from "node:assert";
import { create, fromJsonString } from "@bufbuild/protobuf";

t.test("testing the eliza service with an in-memory server", async () => {
    // Create an in-memory transport with the routes from connect.ts
    const transport = createRouterTransport(routes);
    const client = createClient(ElizaService, transport);
    const { sentence } = await client.say({ sentence: "hello" });
    t.equal(sentence, "You said hello");
});

t.test("testing the eliza service with a running server", async (t) => {
    const app = await build();
    await app.listen();
    t.teardown(() => app.close());
    const transport = createConnectTransport({
        baseUrl: `http://localhost:${app.addresses()[0].port}`,
        httpVersion: "1.1",
    });

    const client = createClient(ElizaService, transport);
    const res = await client.say({ sentence: "hello" });
    t.same(res.sentence, "You said hello");
});

t.test("testing the eliza service with fastify.inject()", async (t) => {
    // Note: fastify.inject() is a great tool, but using it means you have to
    // handle details of the protocol like content-types and status codes
    // yourself. This is rather straight-forward for Connect unary, but much
    // less so for streaming RPCs, or the gRPC or gRPC-web protocols.
    const app = await build();
    const res = await app.inject({
        method: "POST",
        url: `${ElizaService.typeName}/${ElizaService.method.say.name}`,
        body: create(SayRequestSchema, { sentence: "hello" }),
        headers: {
            "content-type": "application/json"
        },
    });
    t.same(res.statusCode, 200);
    t.same(res.headers["content-type"], "application/json");
    const sayRes = fromJsonString(SayResponseSchema, res.body);
    t.same(sayRes.sentence, "You said hello");
});

t.test("unit testing the eliza service", async (t) => {

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

    const eliza = new Eliza();
    const { sentence } = await eliza.say(create(SayRequestSchema, { sentence: "hello" }));
    assert.strictEqual(sentence, "You said hello");
});
