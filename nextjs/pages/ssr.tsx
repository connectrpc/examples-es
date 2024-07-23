import { createPromiseClient } from "@connectrpc/connect";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import {
  ElizaService,
  SayResponseSchema,
} from "../gen/connectrpc/eliza/v1/eliza_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import styles from "../styles/Eliza.module.css";
import { fromJson, toJson } from "@bufbuild/protobuf";

export const getServerSideProps = async () => {
  const transport = createConnectTransport({
    // Note: you cannot use a relative path like `/api` here because SSR requires absolute URLs.
    baseUrl: "https://demo.connectrpc.com",
  });
  const client = createPromiseClient(ElizaService, transport);
  const request = { sentence: "hi (from the server)" };
  const response = await client.say(request);

  return {
    props: {
      request,
      // The values on `response` (such as `sentence`) are regular JavaScript values.
      // This means that we can easily pass them below in `props` directly.
      // The nice thing about doing this is that you retain full typing for `sentence: string`.
      sentence: response.sentence,

      // However, if we want to pass the entire response, we call `.toJson()` since what's passed through the SSR boundary must be plain JSON.
      // The downside to this approach is that you lose all type information (but you can get it right back! see `SayResponse.fromJson` below).
      response: toJson(SayResponseSchema, response),
    },
  };
};

function Ssr({
  request,
  response,
  // ^?
  // The type of `response` is `JsonValue`, so we need to revive it below.
  sentence,
}: // ^?
// The type of `sentence` here is correctly inferred as `string` without any further work.
InferGetServerSidePropsType<typeof getServerSideProps>) {
  const sayResponse = fromJson(SayResponseSchema, response);
  //    ^?
  //    Now `sayResponse` is a full `SayResponse` class with all the normal `Message` methods.

  const data = {
    request,
    response,
    sentence,
    sayResponse,
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
          <Link href="/react-server-actions">
            React Server Components with Server actions
          </Link>
        </div>
      </header>

      <div className={styles.ssr}>
        <h4>Server Rendered Data</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Ssr;
