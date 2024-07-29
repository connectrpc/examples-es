// The following is a very naive implementation of using cookies to store
// messages probably best stored in a database.

import { cookies } from "next/headers";

interface ChatMessage {
  text: string;
  sender: "eliza" | "user";
}

// Next.js does not expose the RequestCookie type returned from cookies.get()
// so we're defining our own custom type here.
interface Cookie {
    value: string;
}

export async function getMessages(cookie: Cookie | undefined): Promise<ChatMessage[]> {
  if (cookie) {
    return JSON.parse(cookie.value) as ChatMessage[];
  }
  return [];
}

export async function addMessage(text: string, sender: ChatMessage["sender"]) {
  const cookie = cookies().get("messages");
  const messages = [...(await getMessages(cookie)), { text, sender }];
  cookies().set("messages", JSON.stringify(messages), {
    httpOnly: true,
  });
}
