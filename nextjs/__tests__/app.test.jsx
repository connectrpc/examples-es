import {
    createConnectTransport,
} from "@connectrpc/connect-web"
import {
    createClient
} from "@connectrpc/connect"
import { ElizaService, IntroduceRequestSchema } from '../gen/connectrpc/eliza/v1/eliza_pb.js'

test('imports ElizaService correctly', () => {
    expect(ElizaService).toBeDefined()
})

test('imports messages correctly', () => {
    expect(IntroduceRequestSchema).toBeDefined()
})

test('creates a promise client', () => {
    const client = createClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connectrpc.com',
        })
    )
    expect(client.say).toBeDefined()
    expect(client.introduce).toBeDefined()
})
