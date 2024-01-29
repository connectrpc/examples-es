import { SayResponse, say } from "./actions";
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
    cookies().set("messages", JSON.stringify(messages));
  } else {
    cookies().set("messages", JSON.stringify([message]));
  }
}

const getMessages = unstable_cache(getMessagesFromCookie, ["my-messages"]);

export default async function Page() {
  async function submitForm(
    previousState: SayResponse | undefined,
    formData: FormData
  ) {
    const sentence = formData.get("chat-message")?.toString() ?? "";
    addMessageToCookie({ text: sentence, sender: "user" });
    revalidateTag("my-messages");
    const response = await say({ sentence });
    addMessageToCookie({ text: response.sentence, sender: "eliza" });
    revalidateTag("my-messages");
    return response;
  }
  const [state, formAction] = useFormState(submitForm, undefined);
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
      <form action={formAction}>
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
