import { InjectionToken } from "@angular/core";
import type { Interceptor, Transport } from "@connectrpc/connect";
import { ElizaService } from "src/gen/connectrpc/eliza/v1/eliza_pb";
import { ObservableClient } from "./observable-client";

export const TRANSPORT = new InjectionToken<Transport>("connect.transport");

export const INTERCEPTORS = new InjectionToken<Interceptor[]>(
  "connect.interceptors",
  {
    factory: () => [],
  },
);

export const ELIZA = new InjectionToken<ObservableClient<typeof ElizaService>>(
  ElizaService.name,
);
