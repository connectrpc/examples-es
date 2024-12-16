import { Provider } from "@angular/core";
import { Transport } from "@connectrpc/connect";
import { createObservableClient } from "./observable-client";
import { TRANSPORT, ELIZA } from "./tokens";
import { ElizaService } from "src/gen/connectrpc/eliza/v1/eliza_pb";

export const ElizaProvider: Provider = {
  provide: ELIZA,
  useFactory: (transport: Transport) => {
    return createObservableClient(ElizaService, transport);
  },
  deps: [TRANSPORT],
};
