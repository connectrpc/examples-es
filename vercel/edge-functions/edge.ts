/**
 * NOTE: This file is only used to load the function for testing.
 */

import type {} from "@edge-runtime/types";

import handler from "./api/[service]/[method]";

addEventListener("fetch", (event) => {
  event.respondWith(
    handler(event.request, {
      waitUntil: (p) => event.waitUntil(p as Promise<void>),
    })
  );
});
