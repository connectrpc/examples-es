<script lang="ts">
    import {
        createPromiseClient,
        createConnectTransport,
    } from '@bufbuild/connect-web'
    import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
    import { IntroduceRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb.js'

    interface Response {
        text: string
        sender: 'eliza' | 'user'
    }

    let statement = ''
    let responses: Response[] = [
        {
            text: 'What is your name?',
            sender: 'eliza',
        },
    ]
    let introFinished = false

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const send = async () => {
        responses = [...responses, { text: statement, sender: 'user' }]
        if (introFinished) {
            const response = await client.say({
                sentence: statement,
            })
            statement = ''

            responses = [
                ...responses,
                { text: response.sentence, sender: 'eliza' },
            ]
        } else {
            const request = new IntroduceRequest({
                name: statement,
            })
            statement = ''

            for await (const response of client.introduce(request)) {
                responses = [
                    ...responses,
                    { text: response.sentence, sender: 'eliza' },
                ]
            }

            introFinished = true
        }
    }

    const handleKeyup = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            send()
        }
    }
</script>

<div>
    <header class="app-header">
        <h1>Eliza</h1>
    </header>
    <div class="container">
        {#each responses as resp}
            <div
                class={resp.sender === 'eliza'
                    ? 'eliza-resp-container'
                    : 'user-resp-container'}
            >
                <p class="resp-text">{resp.text}</p>
            </div>
        {/each}
        <div>
            <input
                id="statement-input"
                type="text"
                class="text-input"
                on:keyup|preventDefault={handleKeyup}
                bind:value={statement}
            />
            <button id="send-button" on:click={send}>Send</button>
        </div>
    </div>
</div>

<style>
    h1 {
        margin: 15px 0;
        font-size: 3.5rem;
    }
    button {
        background-color: #161ede;
        color: #fff;
        padding: 11px 16px;
        border: none;
        font-weight: 400;
    }
    button:hover {
        cursor: pointer;
    }
    input {
        border: 1px solid #ebebeb;
        padding: 10px;
    }
    input:focus {
        border-color: #161ede;
        background-color: #f8f8ff;
    }
    input:focus-visible {
        outline: none;
    }
    .container {
        text-align: center;
        display: flex;
        flex-direction: column;
        font-size: calc(10px + 2vmin);
        padding: 15px;
        margin: 0 auto;
        max-width: 1320px;
        background-color: #fff;
        min-height: 100vh;
        border-left: 1px solid #ebebeb;
        border-right: 1px solid #ebebeb;
    }
    .app-header {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #000;
        background-color: #fff;
        border-bottom: 1px solid #ebebeb;
    }
    .eliza-resp-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    .user-resp-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
    }
    .resp-text {
        font-size: 1rem;
        margin: 5px;
        background: #fff;
        border: 2px solid #ebebeb;
        padding: 16px 20px;
        border-radius: 28px;
        color: #09083a;
    }
    .eliza-resp-container .resp-text {
        color: #090a3a;
    }
    .user-resp-container .resp-text {
        color: #165fed;
        background-color: #e0edff;
        border: none;
    }
    .text-input {
        width: 200px;
        margin-right: 5px;
    }
</style>
