<script>
    import { setContext } from 'svelte';
    import { createConnectTransport } from "@connectrpc/connect-web";

    // This transport is going to be used throughout the app
    const transport = createConnectTransport({
        baseUrl: "https://demo.connectrpc.com",
    });

    setContext('transport', transport);
</script>

<slot />
