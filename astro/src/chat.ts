/* external dependencies */
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import type { Client } from "@connectrpc/connect";

/* local dependencies */
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_pb";
import { IntroduceRequestSchema } from "./gen/connectrpc/eliza/v1/eliza_pb";

import { addMessage } from "./chatStore";
import { create } from "@bufbuild/protobuf";

const client: Client<typeof ElizaService> = createClient(
  ElizaService,
  createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
  })
);

let firstInteraction = true;
let author = "?";

async function send(statement = "") {
  if (client) {
    addMessage({
      text: statement,
      author,
    });
    if (!firstInteraction) {
      await sendMessage(statement);
    } else {
      sendIntroductionMessage(statement);
    }
  }
}

async function sendMessage(statement: string) {
  const response = await client.say({
    sentence: statement,
  });

  addMessage({
    text: response.sentence,
    author: "Eliza",
  });
}

async function sendIntroductionMessage(statement: string) {
  const request = create(IntroduceRequestSchema, {
    name: statement,
  });
  author = statement;

  for await (const response of client.introduce(request)) {
    addMessage({
      text: response.sentence,
      author: "Eliza",
    });
  }
  firstInteraction = false;
}

export { send };
