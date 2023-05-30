/** This utility helps to trace specific fetch calls. */
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