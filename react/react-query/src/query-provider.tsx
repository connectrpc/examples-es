import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import {
    QueryClient as RQClient,
    QueryClientProvider,
} from '@tanstack/react-query'
export { disableQuery } from './create-query-client'
import stableHash from 'stable-hash'
import { createConnectTransport } from '@bufbuild/connect-web'
import {
    transportContext,
    QueryClient,
    createQueryClient,
} from './create-query-client'
import { ServiceType } from '@bufbuild/protobuf'

const transport = createConnectTransport({
    baseUrl: 'https://api.bestofgo.dev',
})

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const client = useMemo(
        () => {
            return new RQClient({
                defaultOptions: {
                    queries: {
                        queryKeyHashFn: stableHash,
                        suspense: true,
                        staleTime: 5 * 60 * 1000,
                    },
                },
            })
        },
        []
    )

    return (
        <transportContext.Provider value={transport}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </transportContext.Provider>
    )
}

const hooksContext = createContext(
    new Map<ServiceType, QueryClient<ServiceType>>()
)

export function useQueryHooks<T extends ServiceType>(
    service: T
): QueryClient<T> {
    const transport = useContext(transportContext)
    const cache = useContext(hooksContext)
    let hooks = cache.get(service)
    if (hooks === undefined) {
        hooks = createQueryClient(service, transport)
        cache.set(service, hooks)
    }
    return hooks as QueryClient<T>
}
