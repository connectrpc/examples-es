/** This utility helps to demonstrate that a custom implementation for fetch is actually being called. */
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
