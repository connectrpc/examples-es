<script lang="ts">
    import {
        createPromiseClient,
        createConnectTransport,
    } from '@bufbuild/connect-web'
    import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
    import { IntroduceRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb.js'

    const INTRO_DELAY_MS = 500

    let name = ''
    let statement = ''
    let intros: string[] = []
    let answers: string[] = []
    let showSayInput = false

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const say = async () => {
        const response = await client.say({
            sentence: statement,
        })

        answers = [...answers, response.sentence]
    }

    const introduce = async () => {
        const request = new IntroduceRequest({
            name,
        })

        let resps: string[] = []
        for await (const response of client.introduce(request)) {
            resps.push(response.sentence)
        }
        setTimeout(() => {
            showSayInput = true
        }, resps.length * INTRO_DELAY_MS)

        for (var i = 0; i < resps.length; i++) {
            ;((i) => {
                setTimeout(() => {
                    intros = [...intros, resps[i]]
                }, INTRO_DELAY_MS * (i + 1))
            })(i)
        }
    }
</script>

<div class="app">
    <header class="app-header">
        <div class="app-title">
            <div>
                <h1>Eliza</h1>
            </div>
        </div>
        <p class="prompt-text">What is your name?</p>
        <div>
            <input type="text" class="text-input" bind:value={name} />
            <button on:click={introduce}>Introduce</button>
        </div>
        <div class="intro-container">
            {#each intros as intro}
                <p class="resp-text">{intro}</p>
            {/each}
        </div>
        {#if showSayInput}
            <div>
                <input type="text" class="text-input" bind:value={statement} />
                <button on:click={say}>Say</button>
            </div>
        {/if}
        <div class="intro-container">
            {#each answers as answer}
                <p class="resp-text">{answer}</p>
            {/each}
        </div>
    </header>
</div>

<style>
    .app {
        text-align: center;
    }

    .app-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }

    .app-title {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .prompt-text {
        margin: 0 0 15px 0;
    }
    .intro-container {
        margin: 15px;
    }
    .resp-text {
        font-size: 1rem;
        margin: 5px;
    }
    .text-input {
        width: 200px;
    }

    h1 {
        margin-bottom: 0;
    }
</style>
