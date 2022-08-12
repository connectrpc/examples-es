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
    Transport
} from '@bufbuild/connect-web'

import stableHash from 'stable-hash'

export const disableQuery = Symbol('disableQuery')

/** These default options are required for proper query key hashing */
export const createDefaultOptions = () => {
    return {
        queries: {
            queryKeyHashFn: stableHash
        },
    }
}

function assert(value: boolean): asserts value {
    if (!value) {
        throw new Error('Invalid assertion')
    }
}

type Updater<TData, TOutput = TData> =
    | TOutput
    | ((oldData: TData | undefined) => TOutput | undefined)

type UnaryHooks<I extends Message<I>, O extends Message<O>> = {
    useQueryOptions: (input: typeof disableQuery | PartialMessage<I>) => {
        enabled: boolean
        queryKey: [] | [string, string, PartialMessage<I>]
        queryFn: () => Promise<O>
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
        }) => Promise<O>
    }
    useMutationOptions: () => {
        mutationFn: (input: PartialMessage<I>) => Promise<O>
    }
    createQueryUpdater: (
        input: PartialMessage<I>,
        updater: Updater<O, PartialMessage<O>>
    ) => [[string, string, PartialMessage<I>], Updater<O>]
    createQueriesUpdater: (
        updater: Updater<O, PartialMessage<O>>
    ) => [[string, string], Updater<O>]
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
        return response.message;
    }
    /** 
     * This updater is used to convert any immutable changes back into their concrete
     * types. This makes sure that all intrinsic fields maintain their expected output.
     * eg, unspecified bigint defaults to 0.
     */
    function makeProtobufSafeUpdater(queryUpdater: Updater<O, PartialMessage<O>>): Updater<O> {
      return (oldData) => {
        const result = typeof queryUpdater === "function" ? queryUpdater(oldData) : queryUpdater;
        return new method.O(result);
      }
    }
    return {
        createQueryUpdater: (input, updater) => {
            return [getQueryKey(input), makeProtobufSafeUpdater(updater)]
        },
        createQueriesUpdater: (updater) => {
            return [[service.typeName, method.name], makeProtobufSafeUpdater(updater)]
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
                }
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

