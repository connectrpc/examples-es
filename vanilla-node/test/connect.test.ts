import * as http from "node:http";
import { createConnectTransport } from "@connectrpc/connect-node";
import { PromiseClient, createPromiseClient } from "@connectrpc/connect";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { beforeEach, expect, it } from "vitest";
import { ElizaService } from "../gen/connectrpc/eliza/v1/eliza_connect.js";

import routes from "../connect.js";

let client: PromiseClient<typeof ElizaService>;
beforeEach(async () => {
  const server = http.createServer(connectNodeAdapter({ routes }));
  await new Promise<void>((resolve, reject) => {
    server.listen((error: any) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  });

  const address = server?.address()
  if (typeof address !== "object" || address === null) {
    throw new Error("cannot get server port");
  }

  client = createPromiseClient(ElizaService, createConnectTransport({
    baseUrl: `http://0.0.0.0:${address.port}`,
    httpVersion: "1.1",
  }));

  return () => server.close();
});

it("should say hello", async () => {
  const { sentence } = await client.say({ sentence: "hello" });
  expect(sentence).toEqual("You said hello");
})

it("returns an `invalid argument` error on bad words", async () => {
  // NOTE: This doesn't work because the error doesn't pass the `instanceof ConnectError` check,
  // and therefore returns an `internal server error` instead because we've got two copies of
  // `@connectrpc/connect` at this point :-(.
  //
  // @see vitest.config.ts
  await expect(() => client.say({ sentence: "poo!" })).rejects.toThrowError('[invalid_argument] I do not like that word')
})
