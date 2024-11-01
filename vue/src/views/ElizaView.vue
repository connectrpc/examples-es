<script lang="ts">
import { defineComponent, inject } from "vue";
import { createClient } from "@connectrpc/connect";
import type { Client, Transport } from "@connectrpc/connect";
import {
  ElizaService,
  IntroduceRequestSchema,
} from "../gen/connectrpc/eliza/v1/eliza_pb";
import { transportKey } from "../keys";
import { create } from "@bufbuild/protobuf";

interface Response {
  text: string;
  sender: "eliza" | "user";
}

interface ElizaData {
  statement: string;
  responses: Response[];
  introFinished: boolean;
  client: Client<typeof ElizaService> | undefined;
}

export default defineComponent({
  name: "ElizaView",
  setup() {
    const transport = inject<Transport>(transportKey);
    if (!transport) {
      throw new Error("No transport set by provider");
    }
    return { transport };
  },
  data(): ElizaData {
    return {
      statement: "",
      responses: [
        {
          text: "What is your name?",
          sender: "eliza",
        },
      ],
      introFinished: false,
      client: undefined,
    };
  },
  mounted() {
    // Make the Eliza Service client
    this.client = createClient(ElizaService, this.transport);
  },
  methods: {
    async send() {
      if (this.client) {
        this.responses.push({
          text: this.statement,
          sender: "user",
        });
        if (this.introFinished) {
          const response = await this.client.say({
            sentence: this.statement,
          });
          this.statement = "";

          this.responses.push({
            text: response.sentence,
            sender: "eliza",
          });
        } else {
          const request = create(IntroduceRequestSchema, {
            name: this.statement,
          });
          this.statement = "";

          for await (const response of this.client.introduce(request)) {
            this.responses.push({
              text: response.sentence,
              sender: "eliza",
            });
          }
          this.introFinished = true;
        }
      }
    },
    handleSend() {
      this.send();
    },
  },
});
</script>

<template>
  <header class="app-header">
    <h1>Eliza</h1>
    <h4>Vue</h4>
  </header>
  <div class="container">
    <div
      v-for="(resp, index) in responses"
      :key="`resp-${index}`"
      :class="
        resp.sender === 'eliza' ? 'eliza-resp-container' : 'user-resp-container'
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
