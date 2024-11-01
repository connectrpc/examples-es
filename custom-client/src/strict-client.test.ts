import { test } from "node:test";
import { createStrictClient } from "./strict-client.js";
import {
  ElizaService,
  IntroduceRequestSchema,
  SayRequestSchema,
} from "./gen/connectrpc/eliza/v1/eliza_pb";
import { createConnectTransport } from "@connectrpc/connect-node";
import { create } from "@bufbuild/protobuf";

test("strict client", async () => {
  const client = createStrictClient(
    ElizaService,
    createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "2",
    }),
  );
  // Note that these are just type errors, not a runtime error.
  // @ts-expect-error - missing required field
  await client.say({});
  // @ts-expect-error - unrelated fields
  await client.say({ name: "foo" });
  // @ts-expect-error - doesn't allow undefined
  await client.say({ sentence: undefined });
  // @ts-expect-error - wrong type even though it has the exact same fields
  await client.say(create(IntroduceRequestSchema));
  // Only accepts precise types.
  await client.say({ sentence: "foo" });
  // Can get back old behaviour by using the Message
  await client.say(create(SayRequestSchema));
});
