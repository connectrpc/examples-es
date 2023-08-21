import {
    createPromiseClient
} from '@connectrpc/connect'
import {
    createConnectTransport,
} from '@connectrpc/connect-web'
import { ElizaService } from '../gen/connectrpc/eliza/v1/eliza_connect.js'
import { IntroduceRequest } from '../gen/connectrpc/eliza/v1/eliza_pb.js'

it('imports ElizaService correctly', () => {
    expect(ElizaService).toBeDefined()
})
it('imports messages correctly', () => {
    expect(IntroduceRequest).toBeDefined()
})

it('creates a promise client', () => {
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connectrpc.com',
        })
    )
    expect(client.say).toBeDefined()
    expect(client.introduce).toBeDefined()
})


