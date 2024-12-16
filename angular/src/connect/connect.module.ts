import { ModuleWithProviders, NgModule } from "@angular/core";
import { Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { INTERCEPTORS, TRANSPORT } from "./tokens";

@NgModule()
export class ConnectModule {
  public static forRoot(
    connectOptions: Omit<
      Parameters<typeof createConnectTransport>[0],
      "interceptors"
    >,
  ): ModuleWithProviders<ConnectModule> {
    return {
      ngModule: ConnectModule,
      providers: [
        {
          provide: TRANSPORT,
          useFactory: (interceptors: Interceptor[]) =>
            createConnectTransport({
              ...connectOptions,
              interceptors: interceptors,
            }),
          deps: [INTERCEPTORS],
        },
      ],
    };
  }
}
