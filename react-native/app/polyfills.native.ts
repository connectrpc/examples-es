export function polyfills() {
  // Polyfill async.Iterator. For some reason, the Babel presets and plugins are not doing the trick.
  // Code from here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#caveats
  (Symbol as any).asyncIterator =
    Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");
}
