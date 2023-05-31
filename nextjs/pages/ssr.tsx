import { createPromiseClient } from "@bufbuild/connect";
import { InferGetServerSidePropsType } from "next";
import { ElizaService } from "../gen/buf/connect/demo/eliza/v1/eliza_connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import styles from '../styles/Eliza.module.css';

export const getServerSideProps = async () => {
  const transport = createConnectTransport({
    // note: you cannot use a relative path like `/api` here because SSR will break.  SSR requires absolute URLs.
    baseUrl: "https://demo.connect.build",
  });
  const client = createPromiseClient(ElizaService, transport);
  const request = { sentence: "hi (from the server)" };
  const response = await client.say(request);

  return { props: { request, response: { sentence: response.sentence } } };
  //                         ^ note: you can use `response.toJson()` instead, but you will lose all type information.
};

function Ssr({
  request,
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <header className={styles.appHeader}>
        <h1 className={styles.headline}>Eliza</h1>
        <h4 className={styles.subtitle}>Next.js + SSR</h4>
      </header>

      <div className={styles.ssr}>
        <h4>Server Rendered Data</h4>
        <pre>{JSON.stringify({ request, response }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Ssr;
