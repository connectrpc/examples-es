import type { NextApiRequest, NextApiResponse } from 'next'
import { ElizaService } from '../../gen/buf/connect/demo/eliza/v1/eliza_connect.js'
import { SayResponse } from '../../gen/buf/connect/demo/eliza/v1/eliza_pb.js'
import { createPromiseClient } from '@bufbuild/connect'
import { createConnectTransport } from '@bufbuild/connect-web'

// Make the Eliza Service client
const client = createPromiseClient(
    ElizaService,
    createConnectTransport({
        baseUrl: 'https://demo.connect.build',
    })
)

async function say(sentence: string) {
    return await client.say({ sentence })
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SayResponse>
) {
    const answer = say('I feel happy')
    answer.then((response: SayResponse) => {
        res.status(200).json(response)
    })
}
