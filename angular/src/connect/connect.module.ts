import { inject, InjectionToken, Provider } from "@angular/core";
import { Interceptor, Transport } from "@connectrpc/connect";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@connectrpc/connect-web";
import { DescService } from "@bufbuild/protobuf";
import { createObservableClient, ObservableClient } from "./observable-client";

const TRANSPORT = new InjectionToken<Transport>("connect.transport");

const INTERCEPTORS = new InjectionToken<Interceptor[]>("connect.interceptors", {
  factory: () => [],
});

export function createClientToken<T extends DescService>(
  service: T,
): InjectionToken<ObservableClient<T>> {
  return new InjectionToken(`client for ${service.typeName}`, {
    factory() {
      return createObservableClient(service, inject(TRANSPORT));
    },
  });
}

export function provideConnect(
  options: Omit<Parameters<typeof createConnectTransport>[0], "interceptors">,
): Provider[] {
  return [
    {
      provide: TRANSPORT,
      useFactory: (interceptors: Interceptor[]) =>
        createConnectTransport({
          ...options,
          interceptors,
        }),
      deps: [INTERCEPTORS],
    },
  ];
}

export function provideGrpcWeb(
  options: Omit<Parameters<typeof createGrpcWebTransport>[0], "interceptors">,
): Provider[] {
  return [
    {
      provide: TRANSPORT,
      useFactory: (interceptors: Interceptor[]) =>
        createGrpcWebTransport({
          ...options,
          interceptors,
        }),
      deps: [INTERCEPTORS],
    },
  ];
}
