<script lang="ts">
import { defineComponent } from 'vue'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import type { PromiseClient } from '@bufbuild/connect-web'
import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb'
import { IntroduceRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb'

interface Response {
    text: string
    sender: 'eliza' | 'user'
}

interface ElizaData {
    statement: string
    responses: Response[]
    introFinished: boolean
    client: PromiseClient<typeof ElizaService> | undefined
}

export default defineComponent({
    name: 'ElizaView',
    data(): ElizaData {
        return {
            statement: '',
            responses: [
                {
                    text: 'What is your name?',
                    sender: 'eliza',
                },
            ],
            introFinished: false,
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
        async send() {
            if (this.client) {
                this.responses.push({
                    text: this.statement,
                    sender: 'user',
                })
                if (this.introFinished) {
                    const response = await this.client.say({
                        sentence: this.statement,
                    })
                    this.statement = ''

                    this.responses.push({
                        text: response.sentence,
                        sender: 'eliza',
                    })
                } else {
                    const request = new IntroduceRequest({
                        name: this.statement,
                    })
                    this.statement = ''

                    for await (const response of this.client.introduce(
                        request
                    )) {
                        this.responses.push({
                            text: response.sentence,
                            sender: 'eliza',
                        })
                    }
                    this.introFinished = true
                }
            }
        },
        handleSend() {
            this.send()
        },
    },
})
</script>

<template>
    <header class="app-header">
        <h1>Eliza</h1>
    </header>
    <div class="container">
        <div
            v-for="(resp, index) in responses"
            :key="`resp-${index}`"
            :class="
                resp.sender === 'eliza'
                    ? 'eliza-resp-container'
                    : 'user-resp-container'
            "
        >
            <p className="resp-text">
                {{ resp.text }}
            </p>
        </div>
        <div>
            <input
                id="statement-input"
                type="text"
                className="text-input"
                v-model="statement"
                v-on:keyup.enter="handleSend"
            />
            <button id="send-button" @click="handleSend">Send</button>
        </div>
    </div>
</template>

<style></style>
