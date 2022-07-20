<script lang="ts">
import { defineComponent } from 'vue'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import type { PromiseClient } from '@bufbuild/connect-web'
import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb'
import { IntroduceRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb'

const INTRO_DELAY_MS = 500

interface ElizaData {
    name: string
    statement: string
    intros: string[]
    answers: string[]
    showSayInput: boolean
    client: PromiseClient<typeof ElizaService> | undefined
}

export const ElizaView = defineComponent({
    name: 'ElizaView',
    data(): ElizaData {
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
        async say(sentence: string) {
            const response = await this.client!.say({
                sentence,
            })

            this.answers.push(response.sentence)
        },
        async introduce(name: string) {
            const request = new IntroduceRequest({
                name,
            })

            const resps: string[] = []
            for await (const response of this.client!.introduce(request)) {
                resps.push(response.sentence)
            }
            setTimeout(() => {
                this.showSayInput = true
            }, resps.length * INTRO_DELAY_MS)

            for (let i = 0; i < resps.length; i++) {
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
        handleSay(): void {
            this.say(this.statement)
        },
    },
})
</script>

<template>
    <div class="app">
        <header class="app-header">
            <div className="app-title">
                <div>
                    <h1>Eliza</h1>
                </div>
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
                <p
                    v-for="(intro, index) in intros"
                    :key="`intro-${index}`"
                    className="resp-text"
                >
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
                <p
                    v-for="(answer, index) in answers"
                    :key="`answer-${index}`"
                    className="resp-text"
                >
                    {{ answer }}
                </p>
            </div>
        </header>
    </div>
</template>

<style></style>
