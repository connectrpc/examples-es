import { createContextKey } from '@connectrpc/connect';

export const kStore = createContextKey<KVNamespace | undefined>(undefined);
