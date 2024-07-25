<script lang="ts">
  import { create, fromJson } from "@bufbuild/protobuf";
  import { SayRequestSchema, SayResponseSchema } from "../../gen/connectrpc/eliza/v1/eliza_pb.js";
  import { PayloadSchema } from "../../gen/payload_pb";
  import type { PageData } from "./$types";

  export let data: PageData = {
    request: create(SayRequestSchema),
    response: create(SayResponseSchema),
    payloadJson: {},
  };

  const payload = fromJson(PayloadSchema, data.payloadJson); // Now `payload` is a full `Payload` message.

  console.log("server-only-ssr +page.svelte", data);
</script>

<div>
  <header class="app-header">
    <h1>Eliza with Svelte</h1>
    <h4>Server Only SSR</h4>
    <div>
      Choose an example:
      <a href="/">Client-side Rendering</a>
      <a href="/universal-ssr">Universal SSR</a>
      <a href="/server-only-ssr">Server Only SSR</a>
    </div>
  </header>
  <div class="container">
    <h3>Server (only) Rendered Data</h3>
    <div class="pre-container">
        <h5>Request</h5>
        <pre data-testid="data-request">{JSON.stringify(data.request, null, 2)}</pre>
        <h5>Response</h5>
        <pre data-testid="data-response">{JSON.stringify(data.response, null, 2)}</pre>
        <h5>Payload&apos;s large number</h5>
        <pre data-testid="data-largeNum">{payload.largeNumber.toString()}</pre>
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
  .pre-container {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    font-size: 20px;
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
</style>
