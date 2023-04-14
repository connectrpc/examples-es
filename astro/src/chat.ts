/* external dependencies */
import { createPromiseClient } from '@bufbuild/connect'
import { createConnectTransport } from '@bufbuild/connect-web'
import type { PromiseClient } from '@bufbuild/connect'

/* local dependencies */
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connect'
import { IntroduceRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb'

import { addMessage } from './chatStore'

const client: PromiseClient<typeof ElizaService> = createPromiseClient(
  ElizaService,
  createConnectTransport({
    baseUrl: 'https://demo.connect.build',
  }),
)

let firstInteraction = true
let author = '?'

async function send(statement = '') {
  if (client) {
    addMessage({
      text: statement,
      author,
    })
    if (!firstInteraction) {
      await sendMessage(statement)
    } else {
      sendIntroductionMessage(statement)
    }
  }
}

async function sendMessage(statement: string) {
  const response = await client.say({
    sentence: statement,
  })

  addMessage({
    text: response.sentence,
    author: 'Eliza',
  })
}

async function sendIntroductionMessage(statement: string) {
  const request = new IntroduceRequest({
    name: statement,
  })
  author = statement

  for await (const response of client.introduce(request)) {
    addMessage({
      text: response.sentence,
      author: 'Eliza',
    })
  }
  firstInteraction = false
}

export { send }
