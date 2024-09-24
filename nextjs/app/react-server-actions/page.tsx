import styles from "@/styles/Eliza.module.css";
import { revalidateTag, unstable_cache } from "next/cache";
import { createClient } from "@connectrpc/connect";
import { ElizaService } from "../../gen/connectrpc/eliza/v1/eliza_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import { getMessages, addMessage } from "./fake-db";

const getMessagesCached = unstable_cache(getMessages, ["my-messages"]);

export default async function Page() {
  // This action runs on the server
  async function submitForm(formData: FormData) {
    "use server";
    const elizaClient = createClient(
      ElizaService,
      createConnectTransport({
        baseUrl: "https://demo.connectrpc.com",
      }),
    );
    const sentence = formData.get("chat-message")?.toString() ?? "";
    await addMessage(sentence, "user");
    const response = await elizaClient.say({ sentence });
    await addMessage(response.sentence, "eliza");
    revalidateTag("my-messages");
  }
  const messages = await getMessagesCached();
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
