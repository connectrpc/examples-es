<script>
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb'
import { IntroduceRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb'

const INTRO_DELAY_MS = 500

export default {
    data() {
        return {
            name: '',
            statement: '',
            intros: [],
            answers: [],
            showSayInput: false,
            client: undefined,
        }
    },
    mounted() {
        // Make the Eliza Service client
        this.client = createPromiseClient(
            ElizaService,
            createConnectTransport({
                baseUrl: 'https://demo.connect.build',
            })
        )
    },
    methods: {
        async say(sentence) {
            const response = await this.client.say({
                sentence,
            })

            this.answers.push(response.sentence)
        },
        async introduce(name) {
            const request = new IntroduceRequest({
                name,
            })

            let resps = []
            for await (const response of this.client.introduce(request)) {
                resps.push(response.sentence)
                console.log(response.sentence)
            }
            setTimeout(() => {
                this.showSayInput = true
            }, resps.length * INTRO_DELAY_MS)

            for (var i = 0; i < resps.length; i++) {
                ;((i) => {
                    setTimeout(() => {
                        this.intros.push(resps[i])
                    }, INTRO_DELAY_MS * (i + 1))
                })(i)
            }
        },
        handleIntroduce() {
            this.introduce(this.name)
        },
        handleSay() {
            this.say(this.statement)
        },
    },
}
</script>

<template>
    <div class="App">
        <header class="App-header">
            <div className="app-title">
                <img alt="Vue logo" class="App-logo" src="@/assets/logo.svg" />
                <div>
                    <h1>Eliza</h1>
                    <h5>TypeScript</h5>
                </div>
                <img alt="Vue logo" class="App-logo" src="@/assets/logo.svg" />
            </div>
            <p className="prompt-text">What is your name?</p>
            <div>
                <input
                    id="name-input"
                    type="text"
                    className="text-input"
                    v-model="name"
                />
                <button className="intro-button" @click="handleIntroduce">
                    Introduce
                </button>
            </div>
            <div className="intro-container">
                <p v-for="intro in intros" className="resp-text">
                    {{ intro }}
                </p>
            </div>
            <div v-if="showSayInput">
                <div>
                    <input
                        id="statement-input"
                        type="text"
                        className="text-input"
                        v-model="statement"
                    />
                    <button className="say-button" @click="handleSay">
                        Say
                    </button>
                </div>
            </div>
            <div className="intro-container">
                <p v-for="answer in answers" className="resp-text">
                    {{ answer }}
                </p>
            </div>
        </header>
    </div>
</template>

<style></style>
