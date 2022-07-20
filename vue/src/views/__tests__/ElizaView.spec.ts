import { describe, it, expect } from 'vitest'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from '../../gen/buf/connect/demo/eliza/v1/eliza_connectweb'
import { IntroduceRequest } from '../../gen/buf/connect/demo/eliza/v1/eliza_pb'

describe('HelloWorld', () => {
    it('imports properly', () => {
        expect(ElizaService).toBeDefined()
        expect(IntroduceRequest).toBeDefined()
    })
    it('creates a promise client', () => {
        // Make the Eliza Service client
        const client = createPromiseClient(
            ElizaService,
            createConnectTransport({
                baseUrl: 'https://demo.connect.build',
            })
        )
        expect(client.say).toBeDefined()
        expect(client.introduce).toBeDefined()
    })
})
