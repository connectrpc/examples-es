import type { Transport } from "@connectrpc/connect";
import type { InjectionKey } from "vue";

export const transportKey = Symbol() as InjectionKey<Transport>;
