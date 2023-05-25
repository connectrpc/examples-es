import React, { useState } from 'react'
import styles from '../styles/Eliza.module.css'
import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connect.js'
import { IntroduceRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb.js'
import { InferGetServerSidePropsType } from 'next'
import { createClient, wrapFetch } from './api/utils'

interface Response {
    text: string
    sender: 'eliza' | 'user'
}

export const getServerSideProps = async () => {
    const client = createClient(ElizaService, wrapFetch('calling from getServerSideProps', fetch));
    const { sentence } = await client.say({ sentence: "hi (from the server)" });
    return { props: { sentence } };
};

function App({ sentence }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [statement, setStatement] = useState<string>('')
    const [introFinished, setIntroFinished] = useState<boolean>(false)
    const [responses, setResponses] = useState<Response[]>([
        {
            text: 'What is your name?',
            sender: 'eliza',
        },
    ])

    // Make the Eliza Service client
    const client = createClient(ElizaService, wrapFetch('calling from the Page component', fetch))

    const send = async (sentence: string) => {
        setResponses((resp) => [...resp, { text: sentence, sender: 'user' }])
        setStatement('')

        if (introFinished) {
            const response = await client.say({
                sentence,
            })

            setResponses((resp) => [
                ...resp,
                { text: response.sentence, sender: 'eliza' },
            ])
        } else {
            const request = new IntroduceRequest({
                name: sentence,
            })

            for await (const response of client.introduce(request)) {
                setResponses((resp) => [
                    ...resp,
                    { text: response.sentence, sender: 'eliza' },
                ])
            }

            setIntroFinished(true)
        }
    }

    const handleStatementChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStatement(event.target.value)
    }

    const handleSend = () => {
        send(statement)
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div>
            <header className={styles.appHeader}>
                <h1 className={styles.headline}>Eliza</h1>
                <h4 className={styles.subtitle}>Next.js + SSR</h4>
            </header>
            <div className={styles.ssr}>
                <h4>Server Rendered Data</h4>
                <code>{JSON.stringify(sentence, null, 2)}</code>
            </div>

            <div className={styles.container}>
                {responses.map((resp, i) => {
                    return (
                        <div
                            key={`resp${i}`}
                            className={
                                resp.sender === 'eliza'
                                    ? styles.elizaRespContainer
                                    : styles.userRespContainer
                            }
                        >
                            <p className={styles.respText}>{resp.text}</p>
                        </div>
                    )
                })}
                <div>
                    <input
                        type="text"
                        className={`${styles.textInput} ${styles.statementInput}`}
                        value={statement}
                        onChange={handleStatementChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button className={styles.button} onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    )
};

export default App;