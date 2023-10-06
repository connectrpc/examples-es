import { createContextKey } from "@connectrpc/connect";
import { Geo } from "@vercel/edge";

export const kGeo = createContextKey<Geo>({});
