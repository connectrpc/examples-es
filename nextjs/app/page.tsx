'use client'

import React, { useEffect, useState } from 'react'
import styles from '../styles/Eliza.module.css'
import { createPromiseClient } from '@bufbuild/connect'
import { createGrpcWebTransport } from '@bufbuild/connect-web'
import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connect.js'
import {
    IntroduceRequest,
    SayResponse,
} from '../gen/buf/connect/demo/eliza/v1/eliza_pb.js'

interface Response {
    text: string
    sender: 'eliza' | 'user'
}

export interface AnswerViewWrapperProps {
    readonly answer: SayResponse
}

export function AnswerViewWrapper({ answer }: AnswerViewWrapperProps) {
    return <AnswerView answer={answer.sentence} />
}

export interface AnswerViewProps {
    readonly answer: string
}

export function AnswerView({ answer }: AnswerViewProps) {
    return <span>HIIIIII {answer}</span>
}

function App() {
    const [answer, setAnswer] = useState<SayResponse>(new SayResponse())
    const [statement, setStatement] = useState<string>('')
    const [introFinished, setIntroFinished] = useState<boolean>(false)
    const [responses, setResponses] = useState<Response[]>([
        {
            text: 'What is your name?',
            sender: 'eliza',
        },
    ])

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createGrpcWebTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    useEffect(() => {
        ;(async () => {
            console.log('calling')
            const answer = await client.say({ sentence: 'I feel happy.' })
            setAnswer(answer)
        })()

        return () => {
            // this now gets called when the component unmounts
        }
    }, [])

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
            <AnswerViewWrapper answer={answer} />
            <header className={styles.appHeader}>
                <h1 className={styles.headline}>Eliza</h1>
                <h4 className={styles.subtitle}>Next.js</h4>
            </header>
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
                    <button className={styles.button} onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
