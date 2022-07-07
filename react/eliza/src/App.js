import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb'
import { IntroduceRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb'

function App() {
    const [name, setName] = useState('')
    const [statement, setStatement] = useState('')
    const [intros, setIntros] = useState([])
    const [answers, setAnswers] = useState([])
    const [showSayInput, setShowSayInput] = useState(false)

    const INTRO_DELAY_MS = 500

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const say = async (sentence) => {
        const response = await client.say({
            sentence,
        })

        setAnswers((answer) => [...answer, response.sentence])
    }

    const introduce = async (name) => {
        const request = new IntroduceRequest({
            name,
        })

        let resps = []
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

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleStatementChange = (event) => {
        setStatement(event.target.value)
    }

    const handleSay = () => {
        say(statement)
    }

    const handleIntroduce = () => {
        introduce(name)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="app-title">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        <h1>Eliza</h1>
                        <h5>JavaScript</h5>
                    </div>
                    <img src={logo} className="App-logo" alt="logo" />
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
                    {answers.map((answer) => {
                        return <p className="resp-text">{answer}</p>
                    })}
                </div>
            </header>
        </div>
    )
}

export default App
