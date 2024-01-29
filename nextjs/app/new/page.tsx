import { say } from "./actions";
import styles from "../../styles/Eliza.module.css";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { useFormState } from "react-dom";

interface ChatMessage {
  text: string;
  sender: "eliza" | "user";
}

// The following is a very naive implementation of using cookies to store
// messages probably best stored in a database.
// We store it as httpOnly to prove that js cannot access it.
async function getMessagesFromCookie() {
  const cookie = cookies().get("messages");
  if (cookie) {
    return JSON.parse(cookie.value) as ChatMessage[];
  }
  return [];
}

async function addMessageToCookie(message: ChatMessage) {
  const cookie = cookies().get("messages");
  if (cookie) {
    const messages = JSON.parse(cookie.value) as ChatMessage[];
    messages.push(message);
    cookies().set("messages", JSON.stringify(messages), {
      httpOnly: true,
    });
  } else {
    cookies().set("messages", JSON.stringify([message]), {
      httpOnly: true,
    });
  }
}

const getMessages = unstable_cache(getMessagesFromCookie, ["my-messages"]);

export default async function Page() {
  async function submitForm(formData: FormData) {
    "use server";
    const sentence = formData.get("chat-message")?.toString() ?? "";
    addMessageToCookie({ text: sentence, sender: "user" });
    const response = await say({ sentence });
    addMessageToCookie({ text: response.sentence, sender: "eliza" });
    revalidateTag("my-messages");
  }
  const messages = await getMessages();
  return (
    <div>
      {messages.map((resp, i) => {
        return (
          <div
            key={i}
            className={
              resp.sender === "eliza"
                ? styles.elizaRespContainer
                : styles.userRespContainer
            }
          >
            <p className={styles.respText}>{resp.text}</p>
          </div>
        );
      })}
      <form action={submitForm}>
        <input
          type="text"
          className={`${styles.textInput} ${styles.statementInput}`}
          name="chat-message"
        />
        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
