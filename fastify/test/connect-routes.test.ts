import t from "tap";
import { build } from "../server.js";
import { ElizaService } from "../gen/connectrpc/eliza/v1/eliza_connect.js";
import { SayRequest, SayResponse } from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import { createConnectTransport } from "@connectrpc/connect-node";
import { createPromiseClient } from "@connectrpc/connect";

t.test("testing the eliza service with a running server", async (t) => {
    const app = await build();
    await app.listen();
    t.teardown(() => app.close());
    const transport = createConnectTransport({
        baseUrl: `http://localhost:${app.addresses()[0].port}`,
        httpVersion: "1.1",
    });

    const client = createPromiseClient(ElizaService, transport);
    const res = await client.say({sentence: "hello"});
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
        url: `${ElizaService.typeName}/${ElizaService.methods.say.name}`,
        body: new SayRequest({sentence: "hello"}),
        headers: {
            "content-type": "application/json"
        },
    });
    t.same(res.statusCode, 200);
    t.same(res.headers["content-type"], "application/json");
    const sayRes = SayResponse.fromJsonString(res.body);
    t.same(sayRes.sentence, "You said hello");
});
