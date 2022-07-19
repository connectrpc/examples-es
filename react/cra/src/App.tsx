import React, { useState } from 'react'
import './App.css'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
import { IntroduceRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb.js'

function App() {
    const [name, setName] = useState<string>('')
    const [statement, setStatement] = useState<string>('')
    const [intros, setIntros] = useState<string[]>([])
    const [answers, setAnswers] = useState<string[]>([])
    const [showSayInput, setShowSayInput] = useState<boolean>(false)

    const INTRO_DELAY_MS = 500

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const say = async (sentence: string) => {
        const response = await client.say({
            sentence,
        })

        setAnswers((answers) => [...answers, response.sentence])
    }

    const introduce = async (name: string) => {
        const request = new IntroduceRequest({
            name,
        })

        let resps: string[] = []
        for await (const response of client.introduce(request)) {
            resps.push(response.sentence)
        }

        setTimeout(() => {
            setShowSayInput(true)
        }, resps.length * INTRO_DELAY_MS)

        for (var i = 0; i < resps.length; i++) {
            ;(function (i) {
                setTimeout(function () {
                    setIntros((intro) => [...intro, resps[i]])
                }, INTRO_DELAY_MS * (i + 1))
            })(i)
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleStatementChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStatement(event.target.value)
    }

    const handleSay = () => {
        say(statement)
    }

    const handleIntroduce = () => {
        introduce(name)
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="app-title">
                    <div>
                        <h1>Eliza</h1>
                    </div>
                </div>
                <p className="prompt-text">What is your name?</p>
                <div>
                    <input
                        type="text"
                        className="text-input"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <button onClick={handleIntroduce}>Introduce</button>
                </div>
                <div className="intro-container">
                    {intros.map((intro, i) => {
                        return (
                            <p className="resp-text" key={`resp${i}`}>
                                {intro}
                            </p>
                        )
                    })}
                </div>
                {showSayInput ? (
                    <div>
                        <input
                            type="text"
                            className="text-input"
                            value={statement}
                            onChange={handleStatementChange}
                        />
                        <button onClick={handleSay}>Say</button>
                    </div>
                ) : (
                    <React.Fragment />
                )}
                <div className="intro-container">
                    {answers.map((answer: string) => {
                        return <p className="resp-text">{answer}</p>
                    })}
                </div>
            </header>
        </div>
    )
}

export default App
