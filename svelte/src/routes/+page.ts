import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connect';
import { SayRequest } from '../gen/buf/connect/demo/eliza/v1/eliza_pb';
import type { PageLoad } from './$types'
import { createClient } from './utils';
import { wrapFetch } from './wrap-fetch';

export const load: PageLoad = async ({ fetch }) => {
  const client = createClient(
    ElizaService,
    wrapFetch("calling from the server", fetch)
  )
  const { sentence } = await client.say(new SayRequest({
      sentence: "hi from the server",
  }))

  return { universalSentence: sentence }
}
