import { Provider } from "@angular/core";
import { Transport } from "@connectrpc/connect";
import { DescService } from "@bufbuild/protobuf";
import { createObservableClient } from "./observable-client";
import { TRANSPORT } from "./transport.token";

export function provideClient<T extends DescService>(service: T): Provider {
  return {
    provide: service,
    useFactory: (transport: Transport) => {
      return createObservableClient(service, transport);
    },
    deps: [TRANSPORT],
  };
}
