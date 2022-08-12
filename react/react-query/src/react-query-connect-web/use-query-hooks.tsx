import { createContext, PropsWithChildren, useContext } from 'react'

export { disableQuery } from './create-query-client'
import {
    QueryClient,
    createQueryClient,
} from './create-query-client'
import { ServiceType } from '@bufbuild/protobuf'
import { createConnectTransport, Transport } from '@bufbuild/connect-web'

const hooksContext = createContext(
    new Map<ServiceType, QueryClient<ServiceType>>()
)

const transportContext = createContext<Transport>(
    createConnectTransport({
        baseUrl: '',
    })
)

export const useTransport = () => useContext(transportContext)

export function useQueryHooks<T extends ServiceType>(
    service: T
): QueryClient<T> {
    const transport = useTransport()
    const cache = useContext(hooksContext)
    let hooks = cache.get(service)

    if (hooks === undefined) {
        hooks = createQueryClient(service, transport)
        cache.set(service, hooks)
    }
    return hooks as QueryClient<T>
}

export const TransportProvider: React.FC<PropsWithChildren<{ transport: Transport }>> = ({ children, transport }) => {
    return (
        <transportContext.Provider value={transport}>
            {children}
        </transportContext.Provider>
    )
}