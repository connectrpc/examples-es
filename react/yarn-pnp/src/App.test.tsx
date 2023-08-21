import { createPromiseClient } from '@connectrpc/connect'
import { createConnectTransport } from '@connectrpc/connect-web'
import { expect, test } from 'vitest'
import { ElizaService } from './gen/connectrpc/eliza/v1/eliza_connect.js'
import { IntroduceRequest } from './gen/connectrpc/eliza/v1/eliza_pb.js'

test('imports ElizaService correctly', () => {
    expect(ElizaService).toBeDefined()
})

test('imports messages correctly', () => {
    expect(IntroduceRequest).toBeDefined()
})

test('creates a promise client', () => {
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connectrpc.com',
        })
    )
    expect(client.say).toBeDefined()
    expect(client.introduce).toBeDefined()
})
