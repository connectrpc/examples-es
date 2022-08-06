import {
    AnyMessage,
    Message,
    MethodInfo,
    MethodInfoUnary,
    MethodKind,
    PartialMessage,
    ServiceType,
  } from "@bufbuild/protobuf";
  // Import service definition that you want to connect to.
  import {
    CallOptions,
    ConnectError,
    Transport,
    createConnectTransport,
  } from "@bufbuild/connect-web";
  import {
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { createContext } from "react";
  
  export const transportContext = createContext<Transport>(
    createConnectTransport({
      baseUrl: "",
    })
  );
  
  export const disableQuery = Symbol("disableQuery");
  
  function assert(value: boolean): asserts value {
    if (!value) {
      throw new Error("Invalid assertion");
    }
  }
  
  type Updater<TData> = TData | ((oldData: TData | undefined) => TData);
  
  type UnaryHooks<I extends Message<I>, O extends Message<O>> = {
    useFetch: () => (
      input: PartialMessage<I>,
      options?: CallOptions
    ) => Promise<O>;
    useQuery: (
      input: typeof disableQuery | PartialMessage<I>,
      options?: Omit<UseQueryOptions<O, ConnectError>, "queryKey" | "queryFn">
    ) => UseQueryResult<O, ConnectError>;
    useInfinitQuery: (
      input: typeof disableQuery | PartialMessage<I>,
      options: Omit<
        UseInfiniteQueryOptions<O, ConnectError>,
        "queryKey" | "queryFn"
      > & {
        /* Set the input key that is associated to your page parameter. Will be set according to getNextPageParam */
        pageParamKey: keyof PartialMessage<I>;
      }
    ) => UseInfiniteQueryResult<O, ConnectError>;
    useMutation: (
      options?: UseMutationOptions<O, ConnectError, PartialMessage<I>>
    ) => UseMutationResult<O, ConnectError, PartialMessage<I>>;
    getQueryKey: (
      input: PartialMessage<I>
    ) => [string, string, PartialMessage<I>];
    useSetQueryData: () => (
      input: PartialMessage<I>,
      updater: Updater<O>
    ) => void;
  };
  
  // type ServerStreamingHooks<I extends Message<I>, O extends Message<O>> = {
  //     useQuery: (input: I) => UseQueryResult<O, ConnectError>
  // }
  
  export type QueryClient<T extends ServiceType> = {
    [P in keyof T["methods"]]: T["methods"][P] extends MethodInfoUnary<
      infer I,
      infer O
    >
      ? UnaryHooks<I, O>
      : // : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O>
        // ? ServerStreamingHooks<I, O>
        never;
  };
  
  function createUnaryHooks<I extends Message<I>, O extends Message<O>>({
    method,
    service,
    transport,
  }: {
    service: ServiceType;
    method: MethodInfo<I, O>;
    transport: Transport;
  }): UnaryHooks<I, O> {
    function getQueryKey(
      input: PartialMessage<I>
    ): [string, string, PartialMessage<I>] {
      return [service.typeName, method.name, input];
    }
    async function fetch(input: PartialMessage<I>, callOptions?: CallOptions) {
      const response = await transport.unary(
        service,
        method,
        callOptions?.signal,
        undefined,
        undefined,
        input
      );
      return response.message;
    }
    return {
      useFetch: () => {
        return fetch;
      },
      useQuery: (input, options) => {
        return useQuery(
          input === disableQuery ? [] : getQueryKey(input),
          ({ signal, ...args }) => {            
            assert(input !== disableQuery);
            return fetch(input, { signal });
          },
          {
            enabled: input !== disableQuery,
            ...options,
          } as any
        );
      },
      useInfinitQuery: (input, options) => {
        return useInfiniteQuery(
          input === disableQuery ? [] : getQueryKey(input),
          ({ signal, pageParam }) => {
            assert(input !== disableQuery);
            const inputWithPageParam = {
              ...input,
              [options.pageParamKey]: pageParam,
            };
            return fetch(inputWithPageParam, { signal });
          },
          {
            enabled: input !== disableQuery,
  
            ...options,
          } as any
        );
      },
      useMutation: (options) => {
        // TODO: Add key invalidation and client side udate
        return useMutation(async (input) => {
          return fetch(input);
        }, options);
      },
      getQueryKey,
      useSetQueryData: () => {
        const client = useQueryClient();
        return (input, updater) => {
          client.setQueryData(getQueryKey(input), updater);
        };
      },
    };
  }
  
  export function createQueryClient<T extends ServiceType>(
    service: T,
    transport: Transport
  ): QueryClient<T> {
    const client: Record<string, UnaryHooks<AnyMessage, AnyMessage>> = {};
    
    for (const [localName, methodInfo] of Object.entries(service.methods)) {
      if (methodInfo.kind === MethodKind.Unary) {
        client[localName] = createUnaryHooks({
          service,
          method: methodInfo,
          transport,
        });
      }
    }
  
    return client as QueryClient<T>;
  }
  