import { createContext, useContext, useMemo } from "react";
import { DescService } from "@bufbuild/protobuf";
import { createPromiseClient, PromiseClient, Transport } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

// This transport is going to be used throughout the app
const defaultTransport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
});

// A context to override the default transport in tests
export const TransportContext = createContext<Transport>(defaultTransport);

/**
 * Get a promise client for the given service.
 */
export function useClient<T extends DescService>(service: T): PromiseClient<T> {
    const transport = useContext(TransportContext);
    // We memoize the client, so that we only create one instance per service.
    return useMemo(
        () => createPromiseClient(service, transport),
        [service, transport],
    );
}
