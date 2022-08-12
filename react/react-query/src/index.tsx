import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createDefaultOptions } from './react-query-connect-web/create-query-client'
import { TransportProvider } from './react-query-connect-web/use-query-hooks'
import { createConnectTransport } from '@bufbuild/connect-web'

const connectWebDefaultOptions = createDefaultOptions()
const transport = createConnectTransport({
    baseUrl: 'https://api.bestofgo.dev',
})

const client = new QueryClient({
    defaultOptions: {
        ...connectWebDefaultOptions,
        queries: {
            ...connectWebDefaultOptions.queries,
            suspense: true,
            staleTime: 5 * 60 * 1000,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TransportProvider transport={transport}>
            <QueryClientProvider client={client}>
                <App />
            </QueryClientProvider>
        </TransportProvider>
    </React.StrictMode>
)
