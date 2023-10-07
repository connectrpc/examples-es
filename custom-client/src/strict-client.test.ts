import { test } from "node:test";
import { createStrictClient } from "./strict-client.js";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_connect.js";
import { createConnectTransport } from "@connectrpc/connect-node";
import { SayRequest } from "./gen/connectrpc/eliza/v1/eliza_pb.js";

test("strict client", async () => {
  const client = createStrictClient(
    ElizaService,
    createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "2",
    })
  );
  // Note that these are just a type errors, not a runtime error.
  // @ts-expect-error - missing required field
  await client.say({});
  // @ts-expect-error - unrelated fields
  await client.say({ name: "foo" });
  // @ts-expect-error - wrong type
  await client.say({ sentence: undefined });
  // Only accepts precise types.
  await client.say({ sentence: "foo" });
  // Can get back old behaviour by using the Message
  await client.say(new SayRequest({}));
});
