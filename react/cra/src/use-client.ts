import { useContext, useMemo } from "react";
import { ServiceType } from "@bufbuild/protobuf";
import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { TransportContext } from "./contexts.js";

/**
 * Get a promise client for the given service.
 */
export function useClient<T extends ServiceType>(service: T): PromiseClient<T> {
    const transport = useContext(TransportContext);

    if (!transport) {
        throw new Error("No transport specified in TransportContext");
    }

    // We memoize the client, so that we only create one instance per service.
    return useMemo(
        () => createPromiseClient(service, transport),
        [service, transport],
    );
}
