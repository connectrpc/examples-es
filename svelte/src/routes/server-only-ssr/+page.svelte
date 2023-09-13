<script lang="ts">
  import { SayResponse } from "../../gen/connectrpc/eliza/v1/eliza_pb";
  import type { PageData } from "./$types";

  export let data: PageData = {
    fullResponseJson: {},
    plainProperty: "uninitialized",
    request: {
      sentence: "uninitialized",
    },
  };

  // If you wish to revive the response type, you can do so like this, by calling `.fromJson` on the Response class
  // provided by protobuf-es.
  const sayResponse = SayResponse.fromJson(data.fullResponseJson);

  console.log("server-only-ssr +page.svelte", data, sayResponse);
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
        <div>
            Request sentence: <code data-testid="request-sentence">{data.request.sentence}</code><br>
            Response sentence: <code data-testid="response-sentence">{sayResponse.sentence}</code><br>
            Response type: <code data-testid="response-type">{sayResponse.getType().typeName}</code>
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
