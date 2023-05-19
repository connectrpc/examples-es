import { createGrpcWebTransport } from "@bufbuild/connect-web";
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
  fetch: typeof globalThis.fetch
) => {
  const transport = createGrpcWebTransport({
    baseUrl: 'https://demo.connect.build',
    fetch: wrapFetch('calling from gRPC-web', fetch),
  });
  return createPromiseClient(service, transport);
}
