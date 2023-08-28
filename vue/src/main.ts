import { createApp } from "vue";
import { createPinia } from "pinia";
import { createConnectTransport } from "@connectrpc/connect-web";

import App from "./App.vue";
import router from "./router";
import { keys } from "./keys";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// This transport is going to be used throughout the app
const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
});
app.provide(keys.TRANSPORT, transport);

app.mount("#app");
