import {
    Code,
    ConnectError,
    createClient,
    createRouterTransport,
    MethodImpl,
    Transport
} from "@connectrpc/connect";
import { connectNodeAdapter, createConnectTransport } from "@connectrpc/connect-node";
import { describe, it } from "node:test";
import assert from "node:assert";
import * as readline from "node:readline/promises";
import http from "http";
import { setupTestServer } from "./setup-test-server.js";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import routes from "./connect.js";


// We do not use this abstraction in our client.ts, but this is how we could
// write it to support testing.
class ElizaApp {
    constructor(private io: Pick<readline.Interface, "question" | "write">, private transport: Transport) {
    }

    async run() {
        const name = await this.io.question("What is your name?\n>");
        const client = createClient(ElizaService, this.transport);
        try {
            for await (const res of client.introduce({ name })) {
                this.io.write(res.sentence + "\n");
            }
        } catch (e) {
            switch (ConnectError.from(e).code) {
                case Code.Unavailable:
                    this.io.write("Eliza is currently unavailable\n");
                    break;
                default:
                    this.io.write("Eliza had an error\n");
                    break;
            }
        }
    }
}

describe("unit testing an eliza app with a mocked server", () => {
    it("should ask for username and send it to the server", async (t) => {
        const io = {
            question: t.mock.fn<readline.Interface["question"]>(undefined, () => Promise.resolve("Joe")),
            write: t.mock.fn<readline.Interface["write"]>()
        };
        const introduce = t.mock.fn<MethodImpl<typeof ElizaService.method.introduce>>(
            async function* introduce() {
                //
            }
        );
        const transport = createRouterTransport(({ rpc }) => {
            rpc(ElizaService.method.introduce, introduce);
        });

        await new ElizaApp(io, transport).run();
        assert.strictEqual(io.question.mock.callCount(), 1);
        assert.strictEqual(introduce.mock.callCount(), 1);
        assert.deepStrictEqual(
            introduce.mock.calls[0].arguments[0].name,
            "Joe"
        );
    });
    it("should write server responses", async (t) => {
        const io = {
            question: t.mock.fn<readline.Interface["question"]>(undefined, () => Promise.resolve("Joe")),
            write: t.mock.fn<readline.Interface["write"]>()
        };
        const transport = createRouterTransport(({ rpc }) => {
            rpc(ElizaService.method.introduce, async function* () {
                yield { sentence: "a" };
                yield { sentence: "b" };
                yield { sentence: "c" };
            });
        });
        await new ElizaApp(io, transport).run();
        assert.deepStrictEqual(
            io.write.mock.calls.map(c => c.arguments),
            [
                ["a\n"],
                ["b\n"],
                ["c\n"]
            ]
        );
    });
    it("should catch server errors", async (t) => {
        const io = {
            question: t.mock.fn<readline.Interface["question"]>(undefined, () => Promise.resolve("Joe")),
            write: t.mock.fn<readline.Interface["write"]>()
        };
        const transport = createRouterTransport(({ rpc }) => {
            rpc(ElizaService.method.introduce, async function* () {
                throw new ConnectError("out of words", Code.Unavailable);
            });
        });
        await new ElizaApp(io, transport).run();
        assert.deepStrictEqual(
            io.write.mock.calls.map(c => c.arguments),
            [
                ["Eliza is currently unavailable\n"],
            ]
        );
    });
});

describe("integration testing an eliza app with an in-memory server", () => {
    it("should introduce herself", async (t) => {
        const io = {
            question: t.mock.fn<readline.Interface["question"]>(undefined, () => Promise.resolve("Joe")),
            write: t.mock.fn<readline.Interface["write"]>()
        };
        // Create an in-memory transport with the routes from connect.ts
        const transport = createRouterTransport(routes);
        await new ElizaApp(io, transport).run();
        assert.deepStrictEqual(
            io.write.mock.calls.map(c => c.arguments),
            [
                ["Hi Joe, I'm Eliza\n"],
                ["Before we begin, Joe, let me tell you something about myself.\n"],
                ["I'm a Rogerian psychotherapist.\n"],
                ["How are you feeling today?\n"]
            ]
        );
    });
});

describe("integration testing an eliza app with full HTTP server", () => {

    // For each test in this describe-block, set up a full HTTP server with the
    // routes from connect.ts
    // Of course we could spin up the entire server with all handlers here, not
    // just the Connect routes, and test whatever we need.
    const serverInfo = setupTestServer(() =>
        http.createServer(
            connectNodeAdapter({ routes })
        )
    );

    it("should introduce herself", async (t) => {
        const io = {
            question: t.mock.fn<readline.Interface["question"]>(undefined, () => Promise.resolve("Joe")),
            write: t.mock.fn<readline.Interface["write"]>()
        };
        const transport = createConnectTransport(serverInfo());
        await new ElizaApp(io, transport).run();
        assert.deepStrictEqual(
            io.write.mock.calls.map(c => c.arguments),
            [
                ["Hi Joe, I'm Eliza\n"],
                ["Before we begin, Joe, let me tell you something about myself.\n"],
                ["I'm a Rogerian psychotherapist.\n"],
                ["How are you feeling today?\n"]
            ]
        );
    });
});
