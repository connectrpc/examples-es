// The following is a very naive implementation of using cookies to store
// messages probably best stored in a database.

import { cookies } from "next/headers";

interface ChatMessage {
  text: string;
  sender: "eliza" | "user";
}

export async function getMessages(): Promise<ChatMessage[]> {
  const cookie = cookies().get("messages");
  if (cookie) {
    return JSON.parse(cookie.value) as ChatMessage[];
  }
  return [];
}

export async function addMessage(text: string, sender: ChatMessage["sender"]) {
  const messages = [...(await getMessages()), { text, sender }];
  cookies().set("messages", JSON.stringify(messages), {
    httpOnly: true,
  });
}
