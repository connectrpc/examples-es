import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {
    makePromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb'

function App() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    // Make the Eliza Service client
    const client = makePromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const send = async (sentence: string) => {
        const response = await client.say({
            sentence,
        })

        setAnswer(response.sentence)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value)
    }

    const handleSend = () => {
        send(question)
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Eliza TypeScript</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Say something to Eliza.</p>
                <input type="text" value={question} onChange={handleChange} />
                <p>{answer}</p>
                <button onClick={handleSend}>Send</button>
            </header>
        </div>
    )
}

export default App
