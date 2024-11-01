import React, { useState, FC, useCallback, FormEvent } from "react";
import styles from "../styles/Eliza.module.css";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "../gen/connectrpc/eliza/v1/eliza_pb";
import Link from "next/link";

const elizaClient = createClient(
  ElizaService,
  createConnectTransport({
    baseUrl: "/api",
  }),
);

interface ChatMessage {
  text: string;
  sender: "eliza" | "user";
}

const UnaryExample: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setChatMessages((resp) => [
        ...resp,
        { text: inputValue, sender: "user" },
      ]);
      setInputValue("");
      const response = await elizaClient.say({
        sentence: inputValue,
      });

      setChatMessages((resp) => [
        ...resp,
        { text: response.sentence, sender: "eliza" },
      ]);
    },
    [inputValue],
  );

  return (
    <div>
      <header className={styles.appHeader}>
        <h1 className={styles.headline}>Connect with Next.js</h1>
        <h4 className={styles.subtitle}>Unary Calls</h4>
        <div className={styles.links}>
          Choose an example:
          <Link href="/">Unary Calls</Link>
          <Link href="/server-streaming">Server Streaming Calls</Link>
          <Link href="/ssr">SSR</Link>
          <Link href="/react-server-actions">Server actions</Link>
          <Link href="/boundary">Boundary</Link>
        </div>
      </header>
      <div className={styles.container}>
        {chatMessages.map((resp, i) => {
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`${styles.textInput} ${styles.statementInput}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            name="chat-message"
          />
          <button className={styles.button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnaryExample;
