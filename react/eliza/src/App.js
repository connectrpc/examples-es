import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb'
import { ConverseRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb'

function App() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const send = async (sentence) => {
        const response = await client.say({
            sentence,
        })

        setAnswer(response.sentence)
    }

    const converse = async (sentence) => {
        const request = new ConverseRequest({
            sentence,
        })

        console.log(client)

        // for await (const response of await client.converse(request)) {
        //     console.log(response)
        // }
    }

    const handleChange = (event) => {
        setQuestion(event.target.value)
    }

    const handleSend = () => {
        send(question)
    }

    const handleConverse = () => {
        converse(question)
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Eliza</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Say something to Eliza.</p>
                <input type="text" value={question} onChange={handleChange} />
                <p>{answer}</p>
                <button onClick={handleSend}>Send</button>
                <button onClick={handleConverse}>Send</button>
            </header>
        </div>
    )
}

export default App
