<script>
      import { setContext } from "svelte";

        export let Component;
        export let context_key;
        export let context_value;

        setContext(context_key, context_value);
</script>

<svelte:component this={Component} />
