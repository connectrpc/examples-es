<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { setContext } from "svelte";

  export let Component: ComponentType;
  export let context_key: string;
  export let context_value;

  setContext(context_key, context_value);
</script>

<svelte:component this={Component} />
