import { describe, it, expect } from "@jest/globals";
import { createClient, createRouterTransport, ServiceImpl } from "@connectrpc/connect";
import { ElizaService, SayRequestSchema } from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import { ConverseRequest, IntroduceRequest, SayRequest } from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import routes from "../connect.js";
import { create } from "@bufbuild/protobuf";


describe("testing the eliza service with an in-memory server", () => {
    it("say should repeat what we said", async () => {
        // Create an in-memory transport with the routes from connect.ts
        const transport = createRouterTransport(routes);
        const client = createClient(ElizaService, transport);
        const { sentence } = await client.say({ sentence: "hello" });
        expect(sentence).toBe("You said hello");
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
        expect(sentence).toBe("You said hello");
    });
});
