import type { Transport } from "@connectrpc/connect";
import type { InjectionKey } from "vue";

// This is slightly different than how the docs suggest declaring injection keys.
// It has been changed to provide better typing. See the following for additional context:
// https://github.com/vuejs/core/issues/8744
// https://github.com/microsoft/TypeScript/issues/54885
export const transportKey: InjectionKey<Transport> & symbol = Symbol();
