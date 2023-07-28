import React, { useState, FC, useCallback, FormEvent } from "react";
import styles from "../styles/Eliza.module.css";
import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { ElizaService } from "../gen/buf/connect/demo/eliza/v1/eliza_connect.js";
import Link from "next/link";

const client = createPromiseClient(
    ElizaService,
    createConnectTransport({
        baseUrl: "/api",
    })
);

const NewPage: FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [responses, setResponses] = useState<string[]>([]);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            setUserName("");
            for await (const response of client.introduce({
                name: userName,
            })) {
                setResponses((resp) => [...resp, response.sentence]);
            }
        },
        [userName]
    );

    return (
        <div>
            <header className={styles.appHeader}>
                <h1 className={styles.headline}>Connect with Next.js</h1>
                <h4 className={styles.subtitle}>Server Streaming Calls</h4>
                <div className={styles.links}>
                    Choose an example:
                    <Link href="/">Unary Calls</Link>
                    <Link href="/server-streaming">Server Streaming Calls</Link>
                    <Link href="/ssr">SSR</Link>
                </div>
            </header>
            <div className={styles.container}>
                {responses.map((resp, i) => {
                    return (
                        <div key={i} className={styles.elizaRespContainer}>
                            <p className={styles.respText}>{resp}</p>
                        </div>
                    );
                })}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={`${styles.textInput} ${styles.statementInput}`}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        name="chat-message"
                        placeholder="Enter your name"
                        required
                    />
                    <button className={styles.button} type="submit">
                        Introduce yourself
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPage;
