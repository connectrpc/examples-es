import Constants from "expo-constants";
// @ts-expect-error -- missing type declarations
import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions";
// @ts-expect-error -- missing type declarations
import { fetch, Headers, Request, Response } from "react-native-fetch-api";
import { ReadableStream } from "web-streams-polyfill";

export function polyfills() {
  const isExpoGo = Constants.appOwnership === "expo";
  if (isExpoGo) {
    require("fast-text-encoding");
  }
  polyfillGlobal("ReadableStream", () => ReadableStream);
  polyfillGlobal(
    "fetch",
    () =>
      (...args: Parameters<typeof window.fetch>) =>
        fetch(args[0], {
          ...args[1],
          // Inject textStreaming: https://github.com/react-native-community/fetch/issues/15
          reactNative: { textStreaming: true },
        }),
  );
  polyfillGlobal("Headers", () => Headers);
  polyfillGlobal("Request", () => Request);
  polyfillGlobal("Response", () => Response);
  // Polyfill async.Iterator. For some reason, the Babel presets and plugins are not doing the trick.
  // Code from here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#caveats
  (Symbol as any).asyncIterator =
    Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");
}
