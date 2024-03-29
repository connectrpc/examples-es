const { expect, test } = require("@jest/globals");

const {createPromiseClient} = require("@connectrpc/connect");
const {createConnectTransport} = require("@connectrpc/connect-web");
const { ElizaService } = require('./gen/connectrpc/eliza/v1/eliza_connect.js');
const { IntroduceRequest } = require('./gen/connectrpc/eliza/v1/eliza_pb.js');

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
