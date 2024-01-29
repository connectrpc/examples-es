"use server";

import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "../../gen/connectrpc/eliza/v1/eliza_connect";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import {
  SayRequest as OrigSayRequest,
  SayResponse as OrgSayResponse,
} from "../../gen/connectrpc/eliza/v1/eliza_pb";

const elizaClient = createPromiseClient(
  ElizaService,
  createConnectTransport({
    // Must use full URL here because this is running on the server.
    baseUrl: "http://localhost:3000/api",
  })
);

export type SayResponse = PlainMessage<OrgSayResponse>;
export type SayRequest = PlainMessage<OrigSayRequest>;

export async function say(content: SayRequest) {
  const results = await elizaClient.say(content);
  return toPlainMessage(results);
}
