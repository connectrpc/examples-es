import { ModuleWithProviders, NgModule } from "@angular/core";
import { Interceptor } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { INTERCEPTORS, TRANSPORT } from "./tokens";

@NgModule()
export class GrpcWebModule {
  public static forRoot(
    grpcWebOptions: Omit<
      Parameters<typeof createGrpcWebTransport>[0],
      "interceptors"
    >,
  ): ModuleWithProviders<GrpcWebModule> {
    return {
      ngModule: GrpcWebModule,
      providers: [
        {
          provide: TRANSPORT,
          useFactory: (interceptors: Interceptor[]) =>
            createGrpcWebTransport({
              ...grpcWebOptions,
              interceptors: interceptors,
            }),
          deps: [INTERCEPTORS],
        },
      ],
    };
  }
}
