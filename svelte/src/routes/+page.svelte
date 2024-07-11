<script lang="ts">
  import { createPromiseClient } from "@connectrpc/connect";
  import type { Transport } from "@connectrpc/connect";
  import { ElizaService, IntroduceRequestSchema } from "../gen/connectrpc/eliza/v1/eliza_pb.js";
  import { getContext } from 'svelte';
  import { create } from "@bufbuild/protobuf";

  interface Response {
    text: string;
    sender: "eliza" | "user";
  }

  let statement = "";
  let responses: Response[] = [
    {
      text: "What is your name?",
      sender: "eliza",
    },
  ];
  let introFinished = false;

  const transport: Transport = getContext('transport');

  // Make the Eliza Service client
  const client = createPromiseClient(
    ElizaService,
    transport
  );

  const send = async () => {
    responses = [...responses, { text: statement, sender: "user" }];
    if (introFinished) {
      const response = await client.say({
        sentence: statement,
      });
      statement = "";

      responses = [...responses, { text: response.sentence, sender: "eliza" }];
    } else {
      const request = create(IntroduceRequestSchema, {
        name: statement,
      });
      statement = "";

      for await (const response of client.introduce(request)) {
        responses = [
          ...responses,
          { text: response.sentence, sender: "eliza" },
        ];
      }

      introFinished = true;
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      send();
    }
  };
</script>

<div>
  <header class="app-header">
    <h1>Eliza with Svelte</h1>
    <h4>Client-side Rendering</h4>
    <div>
      Choose an example:
      <a href="/">Client-side Rendering</a>
      <a href="/universal-ssr">Universal SSR</a>
      <a href="/server-only-ssr">Server Only SSR</a>
    </div>
  </header>
  <div class="container">
    {#each responses as resp, i}
      <div
        class={resp.sender === "eliza"
          ? "eliza-resp-container"
          : "user-resp-container"}
      >
      <p data-testid={`test${i}`} class="resp-text">{resp.text}</p>
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
  h4 {
    margin: 0 0 15px 0;
    color: #161ede;
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
    flex-direction: column;
    align-items: center;
    color: #000;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 15px;
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
