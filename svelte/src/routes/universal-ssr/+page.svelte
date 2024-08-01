<script lang="ts">
  import { SayRequest, SayResponse } from "../../gen/connectrpc/eliza/v1/eliza_pb";
  import type { PageData } from "./$types";

  export let data: PageData = {
    request: new SayRequest({
      sentence: "uninitialized",
    }),
    response: new SayResponse({
      sentence: "uninitialized",
    }),
  };

  console.log("universal-ssr +page.svelte", data);

  // Note that the full SayResponse Message type was able to pass through the SSR boundary in universal-ssr mode
</script>

<div>
  <header class="app-header">
    <h1>Eliza with Svelte</h1>
    <h4>Universal SSR</h4>
    <div>
      Choose an example:
      <a href="/">Client-side Rendering</a>
      <a href="/universal-ssr">Universal SSR</a>
      <a href="/server-only-ssr">Server Only SSR</a>
    </div>
  </header>
  <div class="container">
    <h3>Universal SSR Rendered Data</h3>
    <div class="pre-container">
      <div>
        Request sentence: <code data-testid="request-sentence">{data.request.sentence}</code><br>
        Request type: <code data-testid="request-type">{data.request.getType().typeName}</code><br>
        Response sentence: <code data-testid="response-sentence">{data.response.sentence}</code><br>
        Response type: <code data-testid="response-type">{data.response.getType().typeName}</code>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
