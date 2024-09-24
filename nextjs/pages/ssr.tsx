import { createClient } from "@connectrpc/connect";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import styles from "@/styles/Eliza.module.css";
import { createConnectTransport } from "@connectrpc/connect-web";
import { create, fromJson, toJson } from "@bufbuild/protobuf";
import {
  ElizaService,
  SayRequestSchema,
} from "@/gen/connectrpc/eliza/v1/eliza_pb";
import { PayloadSchema } from "@/gen/payload_pb";

export const getServerSideProps = async () => {
  const transport = createConnectTransport({
    // Note: you cannot use a relative path like `/api` here because SSR requires absolute URLs.
    baseUrl: "https://demo.connectrpc.com",
  });
  const client = createClient(ElizaService, transport);
  const request = create(SayRequestSchema, {
    sentence: "hi (from the server)",
  });
  const response = await client.say(request);
  const payload = create(PayloadSchema, {
    str: "abc",
    double: Number.POSITIVE_INFINITY,
    largeNumber: 123n,
    bytes: new Uint8Array([0, 1, 2]),
  });

  return {
    props: {
      // The messages `SayRequest` and `SayResponse` are simple proto3 messages.
      // They are plain objects in JavaScript, and Next.js can serialize them to JSON
      // to ship the server side props to the client.
      request,
      response,

      // The message `Payload` uses values that Next.js cannot serialize to JSON -
      // bigint, Infinity, and typed arrays. proto2 messages use the prototype
      // chain to track field presence, which also isn't supported in Next.js.
      //
      // If you encounter such a case, you have the following options:
      // - If BigInt is the issue, consider to add the field option `[jstype = JS_STRING]`
      //   in Protobuf.
      // - Serialize to JSON and reparse using the schema.
      // - Use the plugin option `json_types=true` to get typed JSON from toJson().
      payloadJson: toJson(PayloadSchema, payload),
    },
  };
};

function Ssr({
  request, // type is `SayRequest`
  response, // type is `SayResponse`
  payloadJson, // type is `JsonValue` - we revive it below
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = {
    request,
    response,
    payload: fromJson(PayloadSchema, payloadJson), // Now `payload` is a full `Payload` message.
  };

  console.log(data);

  return (
    <div>
      <header className={styles.appHeader}>
        <h1 className={styles.headline}>Connect with Next.js</h1>
        <h4 className={styles.subtitle}>SSR</h4>
        <div className={styles.links}>
          Choose an example:
          <Link href="/">Unary Calls</Link>
          <Link href="/server-streaming">Server Streaming Calls</Link>
          <Link href="/ssr">SSR</Link>
          <Link href="/react-server-actions">Server actions</Link>
          <Link href="/boundary">Boundary</Link>
        </div>
      </header>

      <div className={styles.ssr}>
        <h4>Server Rendered Data</h4>
        <h5>Request</h5>
        <pre>{JSON.stringify(data.request, null, 2)}</pre>
        <h5>Response</h5>
        <pre>{JSON.stringify(data.response, null, 2)}</pre>
        <h5>Payload&apos;s large number</h5>
        <pre>{data.payload.largeNumber.toString()}</pre>
      </div>
    </div>
  );
}

export default Ssr;
