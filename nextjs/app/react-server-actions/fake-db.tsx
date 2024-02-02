// The following is a very naive implementation of using cookies to store
// messages probably best stored in a database.

import { cookies } from "next/headers";
import { SayResponse } from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { PlainMessage } from "@bufbuild/protobuf";

export interface ChatMessage {
  message: PlainMessage<SayResponse>;
  sender: "eliza" | "user";
}

export async function getMessages() {
  const cookie = cookies().get("messages");
  if (cookie) {
    return JSON.parse(cookie.value) as ChatMessage[];
  }
  return [];
}

export async function addMessage(message: ChatMessage) {
  const cookie = cookies().get("messages");
  if (cookie) {
    const messages = JSON.parse(cookie.value) as ChatMessage[];
    messages.push(message);
    cookies().set("messages", JSON.stringify(messages), {
      // We store it as httpOnly to prove that js cannot access it.
      httpOnly: true,
    });
  } else {
    cookies().set("messages", JSON.stringify([message]), {
      httpOnly: true,
    });
  }
}
