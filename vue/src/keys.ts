import type { Transport } from "@connectrpc/connect";
import type { InjectionKey } from "vue";

const TRANSPORT = Symbol() as InjectionKey<Transport>;

export const keys = {
    TRANSPORT,
};
