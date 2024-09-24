// The following is a very naive implementation of using a file to store
// messages probably best stored in a database.
import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

interface ChatMessage {
  text: string;
  sender: "eliza" | "user";
}

const historyPath = join(
  new URL(import.meta.url).pathname,
  "../chat-history.json",
);

export async function getMessages(): Promise<ChatMessage[]> {
  return existsSync(historyPath)
    ? JSON.parse(readFileSync(historyPath, "utf-8"))
    : [];
}

export async function addMessage(text: string, sender: ChatMessage["sender"]) {
  const history = await getMessages();
  history.push({
    text,
    sender,
  });
  writeFileSync(historyPath, JSON.stringify(history));
}
