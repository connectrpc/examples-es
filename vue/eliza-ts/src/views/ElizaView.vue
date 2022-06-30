<script>
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb'

export default {
    data() {
        return {
            sentence: '',
            client: undefined,
            answer: '',
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
        async send(event) {
            const response = await this.client.say({
                sentence: this.sentence,
            })

            this.answer = response.sentence
        },
    },
}
</script>

<template>
    <div class="about">
        <h1>Eliza Typescript</h1>
        <input type="text" v-model="sentence" />
        <button @click="send">Send</button>
        <p>{{ answer }}</p>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
