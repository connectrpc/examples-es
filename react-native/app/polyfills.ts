import TextEncoder from "react-native-fast-encoder"
import { ReadableStream } from "web-streams-polyfill"
// @ts-expect-error -- missing type declarations
import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions"
// @ts-expect-error -- missing type declarations
import { fetch, Headers, Request, Response } from "react-native-fetch-api"

export function polyfills() {
  polyfillGlobal("ReadableStream", () => ReadableStream);
  polyfillGlobal("TextDecoder", () => TextEncoder);
  polyfillGlobal("TextEncoder", () => TextEncoder);
  polyfillGlobal("fetch", () => fetch);
  polyfillGlobal("Headers", () => Headers);
  polyfillGlobal("Request", () => Request);
  polyfillGlobal("Response", () => Response);
  // Polyfill async.Iterator. For some reason, the Babel presets and plugins are not doing the trick.
  // Code from here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#caveats
  (Symbol as any).asyncIterator =
    Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");
}
