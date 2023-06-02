<script lang="ts">
    import type { PageData } from "./$types";
  
    export let data: PageData = {
      fullResponseJson: {},
      plainProperty: 'uninitialized',
      request: {
        sentence: 'uninitialized'
      }
    }
</script>

<div>
  <header class="app-header">
      <h1>Eliza</h1>
      <h4>Svelte</h4>
      <a href="/">back</a>
  </header>
  <div class="container">
    <h3>Universal SSR Rendered Data</h3>
    <div class="pre-container">
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
    justify-content: center;
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
