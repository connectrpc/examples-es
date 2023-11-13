import { test } from "node:test";
import { createStrictClient } from "./strict-client.js";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_connect.js";
import { createConnectTransport } from "@connectrpc/connect-node";
import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";
import { Message, proto3, Timestamp, MethodKind } from "@bufbuild/protobuf";
import {
  IntroduceRequest,
  SayRequest,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { createRouterTransport } from "@connectrpc/connect";

export class TestRequest extends Message<TestRequest> {
  /**
   * @generated from field: string sentence = 1;
   */
  sentence?: Timestamp = undefined;

  constructor(data?: PartialMessage<TestRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "connectrpc.eliza.v1.ConverseRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "sentence",
      kind: "message",
      T: Timestamp,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): TestRequest {
    return new TestRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): TestRequest {
    return new TestRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): TestRequest {
    return new TestRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: TestRequest | PlainMessage<TestRequest> | undefined,
    b: TestRequest | PlainMessage<TestRequest> | undefined
  ): boolean {
    return proto3.util.equals(TestRequest, a, b);
  }
}

const TestService = {
  typeName: "TestService",
  methods: {
    unary: {
      I: TestRequest,
      O: Timestamp,
      kind: MethodKind.Unary,
      name: "unary",
    },
  },
} as const;

test("strict client", async () => {
  const client = createStrictClient(
    ElizaService,
    createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      httpVersion: "2",
    })
  );
  // Note that these are just type errors, not a runtime error.
  // @ts-expect-error - missing required field
  await client.say({});
  // @ts-expect-error - unrelated fields
  await client.say({ name: "foo" });
  // @ts-expect-error - doesn't allow undefined
  await client.say({ sentence: undefined });
  // @ts-expect-error - wrong type even though it has the exact same fields
  await client.say(new IntroduceRequest({}));
  // Only accepts precise types.
  await client.say({ sentence: "foo" });
  // Can get back old behaviour by using the Message
  await client.say(new SayRequest({}));

  const testClient = createStrictClient(
    TestService,
    createRouterTransport(({ service }) => {
      service(TestService, {
        async unary(req) {
          return { seconds: 1n };
        },
      });
    })
  );
  await testClient.unary({
    sentence: new Timestamp({ seconds: 0n, nanos: 0 }),
  });
  await testClient.unary({
    sentence: { seconds: 0n, nanos: 0 },
  });
});
