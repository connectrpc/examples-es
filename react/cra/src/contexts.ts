import { createContext } from "react";
import { Transport } from "@connectrpc/connect";

export const TransportContext = createContext<Transport | null>(null);
