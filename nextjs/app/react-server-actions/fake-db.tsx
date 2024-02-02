// The following is a very naive implementation of using cookies to store
// messages probably best stored in a database.

import { cookies } from "next/headers";
import { SayResponse } from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";

export interface ChatMessage {
  message: PlainMessage<SayResponse>;
  sender: "eliza" | "user";
}

// This is a plain json version of the chat message to make
// serialization to json easier.
interface StoredChatMessage {
  text: string;
  sender: ChatMessage["sender"];
}

export async function getMessages(): Promise<ChatMessage[]> {
  const cookie = cookies().get("messages");
  if (cookie) {
    const storedMessages = JSON.parse(cookie.value) as StoredChatMessage[];
    return storedMessages.map((message) => ({
      sender: message.sender,
      message: toPlainMessage(
        new SayResponse({
          sentence: message.text,
        })
      ),
    }));
  }
  return [];
}

export async function addMessage(message: ChatMessage) {
  const cookie = cookies().get("messages");
  if (cookie) {
    const messages = JSON.parse(cookie.value) as StoredChatMessage[];
    messages.push({
      text: message.message.sentence,
      sender: message.sender,
    });
    cookies().set("messages", JSON.stringify(messages), {
      // We store it as httpOnly to prove that js cannot access it.
      httpOnly: true,
    });
  } else {
    const newMessageToStore: StoredChatMessage = {
      text: message.message.sentence,
      sender: message.sender,
    };
    cookies().set("messages", JSON.stringify([newMessageToStore]), {
      httpOnly: true,
    });
  }
}
