import {
    AnyMessage,
    Message,
    MethodInfo,
    MethodInfoUnary,
    MethodKind,
    PartialMessage,
    ServiceType,
} from '@bufbuild/protobuf'
import {
    CallOptions,
    Transport,
    createConnectTransport,
} from '@bufbuild/connect-web'

import { createContext } from 'react'

export const transportContext = createContext<Transport>(
    createConnectTransport({
        baseUrl: '',
    })
)

export const disableQuery = Symbol('disableQuery')

function assert(value: boolean): asserts value {
    if (!value) {
        throw new Error('Invalid assertion')
    }
}

type Updater<TData> =
    | TData
    | ((oldData: TData | undefined) => TData | undefined)

type OneofSelectedMessage<K extends string, M extends Message> = {
    case: K
    value: M
}

// Made a recursive version of PlainMessage which plays better with 
type PlainMessage<T extends Message> = {
  [P in keyof T as T[P] extends Function ? never : P]: PlainMessageField<T[P]>;
};

type PlainMessageField<F> = F extends
    | Date
    | Uint8Array
    | bigint
    | boolean
    | string
    | number
    ? F
    : F extends Array<infer U>
    ? Array<PlainMessageField<U>>
    : F extends ReadonlyArray<infer U>
    ? ReadonlyArray<PlainMessageField<U>>
    : F extends Message
    ? Omit<PlainMessage<F>, keyof Message>
    : F extends OneofSelectedMessage<infer C, infer V>
    ? {
          case: C
          value: PlainMessage<V>
      }
    : F extends {
          case: string | undefined
          value?: unknown
      }
    ? F
    : F extends {
          [key: string | number]: Message<infer U>
      }
    ? {
          [key: string | number]: PlainMessage<U>
      }
    : F

type UnaryHooks<I extends Message<I>, O extends Message<O>> = {
    useQueryOptions: (input: typeof disableQuery | PartialMessage<I>) => {
        enabled: boolean
        queryKey: [] | [string, string, PartialMessage<I>]
        queryFn: () => Promise<PlainMessage<O>>
    }
    useInfiniteQueryOptions: <ParamKey extends keyof PartialMessage<I>>(
        input: typeof disableQuery | PartialMessage<I>,
        options: {
            pageParamKey: ParamKey
        }
    ) => {
        enabled: boolean
        queryKey: [] | [string, string, PartialMessage<I>]
        queryFn: (option: {
            pageParam: PartialMessage<I>[ParamKey]
            signal?: AbortSignal
        }) => Promise<PlainMessage<O>>
    }
    useMutationOptions: () => {
        mutationFn: (input: PartialMessage<I>) => Promise<PlainMessage<O>>
    }
    createQueryUpdater: (
        input: PartialMessage<I>,
        updater: Updater<PlainMessage<O>>
    ) => [[string, string, PartialMessage<I>], Updater<PlainMessage<O>>]
    createQueriesUpdater: (
        updater: Updater<PlainMessage<O>>
    ) => [[string, string], Updater<PlainMessage<O>>]
    getQueryFullKey: (
        input: PartialMessage<I>
    ) => [string, string, PartialMessage<I>]
    getQueryPartialKey: () => [string, string]
}

// type ServerStreamingHooks<I extends Message<I>, O extends Message<O>> = {
//     useQuery: (input: I) => UseQueryResult<O, ConnectError>
// }

export type QueryClient<T extends ServiceType> = {
    [P in keyof T['methods']]: T['methods'][P] extends MethodInfoUnary<
        infer I,
        infer O
    >
        ? UnaryHooks<I, O>
        : // : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O>
          // ? ServerStreamingHooks<I, O>
          never
}

function createUnaryHooks<I extends Message<I>, O extends Message<O>>({
    method,
    service,
    transport,
}: {
    service: ServiceType
    method: MethodInfo<I, O>
    transport: Transport
}): UnaryHooks<I, O> {
    function getQueryKey(
        input: PartialMessage<I>
    ): [string, string, PartialMessage<I>] {
        return [service.typeName, method.name, input]
    }
    async function fetch(input: PartialMessage<I>, callOptions?: CallOptions) {
        const response = await transport.unary(
            service,
            method,
            callOptions?.signal,
            undefined,
            undefined,
            input
        )
        return response.message as unknown as PlainMessage<O>
    }
    return {
        createQueryUpdater: (input, updater) => {
            return [getQueryKey(input), updater]
        },
        createQueriesUpdater: (updater) => {
            return [[service.typeName, method.name], updater]
        },
        useQueryOptions: (input) => {
            return {
                enabled: input !== disableQuery,
                queryKey: input === disableQuery ? [] : getQueryKey(input),
                queryFn: () => {
                    assert(input !== disableQuery)
                    return fetch(input)
                },
            }
        },
        useInfiniteQueryOptions: (input, options) => {
            return {
                enabled: input !== disableQuery,
                queryKey: input === disableQuery ? [] : getQueryKey(input),
                queryFn: ({ pageParam, signal }) => {
                    assert(input !== disableQuery)
                    const inputWithPageParam = {
                        ...input,
                        [options.pageParamKey]: pageParam,
                    }
                    return fetch(inputWithPageParam, { signal })
                },
            }
        },
        useMutationOptions: () => {
            return {
                mutationFn: (input) => {
                    return fetch(input)
                },
            }
        },
        getQueryFullKey: getQueryKey,
        getQueryPartialKey: () => [service.typeName, method.name],
    }
}

export function createQueryClient<T extends ServiceType>(
    service: T,
    transport: Transport
): QueryClient<T> {
    const client: Record<string, UnaryHooks<AnyMessage, AnyMessage>> = {}

    for (const [localName, methodInfo] of Object.entries(service.methods)) {
        if (methodInfo.kind === MethodKind.Unary) {
            client[localName] = createUnaryHooks({
                service,
                method: methodInfo,
                transport,
            })
        }
    }

    return client as QueryClient<T>
}
