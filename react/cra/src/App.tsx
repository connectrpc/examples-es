import React, { useState } from 'react'
import './App.css'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
import { IntroduceRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb.js'

interface Response {
    text: string
    sender: 'eliza' | 'user'
}

function App() {
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
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

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
        <div className="app">
            <header className="app-header">
                <div className="app-title">
                    <div>
                        <h1>Eliza</h1>
                    </div>
                </div>
                {responses.map((resp, i) => {
                    return (
                        <div
                            className={
                                resp.sender === 'eliza'
                                    ? 'eliza-resp-container'
                                    : 'user-resp-container'
                            }
                        >
                            <p className="resp-text" key={`resp${i}`}>
                                {resp.text}
                            </p>
                        </div>
                    )
                })}
                <div>
                    <input
                        type="text"
                        className="text-input"
                        value={statement}
                        onChange={handleStatementChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </header>
        </div>
    )
}

export default App
