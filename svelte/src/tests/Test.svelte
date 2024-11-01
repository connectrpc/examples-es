<script lang="ts">
  import type { Component } from 'svelte';
  import { setContext } from "svelte";

  export let SvelteComponent: Component;
  export let context_key: string;
  export let context_value;

  setContext(context_key, context_value);
</script>

<svelte:component this={SvelteComponent} />
