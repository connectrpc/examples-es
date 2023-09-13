import type { Handle } from "@sveltejs/kit";

// For universal load functions, we have to allow the Content-Type response header.
// See https://kit.svelte.dev/docs/hooks#server-hooks-handle
export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    filterSerializedResponseHeaders: (name) => name === "content-type",
  });
