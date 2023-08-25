import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { createConnectTransport } from "@connectrpc/connect-web";
import { TransportContext } from "./contexts.js";

// This transport is going to be used throughout the app
const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <TransportContext.Provider value={transport}>
            <App />
        </TransportContext.Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
