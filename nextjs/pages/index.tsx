import React, { useState, FC, useCallback, FormEvent } from "react";
import styles from "../styles/Eliza.module.css";
import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { ElizaService } from "../gen/buf/connect/demo/eliza/v1/eliza_connect.js";
import Link from "next/link";

const elizaClient = createPromiseClient(
    ElizaService,
    createConnectTransport({
        baseUrl: "/api",
    })
);

interface ChatMessage {
    text: string;
    sender: "eliza" | "user";
}

const NewPage: FC = () => {
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
        [inputValue]
    );

    return (
        <div>
            <header className={styles.appHeader}>
                <h1 className={styles.headline}>Eliza</h1>
                <h4 className={styles.subtitle}>
                    Next.js + Client-side Fetching
                </h4>
                <div className={styles.links}>
                    <Link href="/ssr">View SSR Example</Link>
                    <Link href="/server-streaming">
                        View Server Streaming Example
                    </Link>
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

export default NewPage;
