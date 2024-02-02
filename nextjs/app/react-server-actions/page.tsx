import styles from "../../styles/Eliza.module.css";
import { revalidateTag, unstable_cache } from "next/cache";
import { createPromiseClient } from "@connectrpc/connect";
import { ElizaService } from "../../gen/connectrpc/eliza/v1/eliza_connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { getMessages, addMessage } from "./fake-db";
import { headers } from "next/headers";

const getMessagesCached = unstable_cache(getMessages, ["my-messages"]);

export default async function Page() {
  async function submitForm(formData: FormData) {
    "use server";
    // Slightly confusingly, this function MUST be labelled as a server action despite being inside of a server component.
    const elizaClient = createPromiseClient(
      ElizaService,
      createConnectTransport({
        // Must use full URL here because this is running on the server.
        baseUrl: `http://${headers().get("host")}/api`,
      })
    );

    const sentence = formData.get("chat-message")?.toString() ?? "";
    addMessage({ message: { sentence }, sender: "user" });

    const response = await elizaClient.say({ sentence });
    addMessage({ message: response, sender: "eliza" });
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
            <p className={styles.respText}>{resp.message.sentence}</p>
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
