import { createPromiseClient } from "@bufbuild/connect";
import { InferGetServerSidePropsType } from "next";
import Link from 'next/link'
import { ElizaService } from "../gen/connectrpc/eliza/v1/eliza_connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import styles from "../styles/Eliza.module.css";
import { SayResponse } from "../gen/connectrpc/eliza/v1/eliza_pb";

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
      response: response.toJson(),
    },
  };
};

function Ssr({
  request,
  response,
  // ^?
  // The type of `response` is `JsonValue`, so we need to revive it below.
  sentence,
  // ^?
  // The type of `sentence` here is correctly inferred as `string` without any further work.
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const sayResponse = SayResponse.fromJson(response);
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
        <h1 className={styles.headline}>Eliza</h1>
        <h4 className={styles.subtitle}>Next.js + SSR</h4>
        <Link href="/">View Client-side Fetching Example</Link>
      </header>

      <div className={styles.ssr}>
        <h4>Server Rendered Data</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Ssr;
