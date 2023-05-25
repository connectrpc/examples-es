import { createConnectTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@bufbuild/connect";
import type { ServiceType } from "@bufbuild/protobuf";

/** This utility helps to demonstrate that a custom implementation for fetch (first supplied by sveltekit then passed to Connect) is actually being called. */
export const wrapFetch = (
  message: string,
  fetch: typeof globalThis.fetch,
) => (
  url: RequestInfo | URL,
  init?: RequestInit | undefined,
) => {
  console.log(message)
  return fetch(url, init)
}

export const createClient = <T extends ServiceType>(
  service: T,
  fetch: typeof globalThis.fetch,
) => {
  const transport = createConnectTransport({
    baseUrl: 'http://localhost:3000/api', // you cannot use a relative path like `/api` here because SSR will break.  SSR requires absolute URLs.
    fetch: wrapFetch('calling from gRPC-web', fetch),
  });
  return createPromiseClient(service, transport);
}
