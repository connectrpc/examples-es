import {
    createClient
} from '@connectrpc/connect'
import {
    createConnectTransport,
} from '@connectrpc/connect-web'
import { ElizaService, IntroduceRequestSchema } from '../src/gen/connectrpc/eliza/v1/eliza_pb.js'

it('imports ElizaService correctly', () => {
    expect(ElizaService).toBeDefined()
})
it('imports messages correctly', () => {
    expect(IntroduceRequestSchema).toBeDefined()
})

it('creates a promise client', () => {
    const client = createClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connectrpc.com',
        })
    )
    expect(client.say).toBeDefined()
    expect(client.introduce).toBeDefined()
})


