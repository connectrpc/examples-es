import { ElizaService } from '../../gen/buf/connect/demo/eliza/v1/eliza_connect';
import { SayRequest } from '../../gen/buf/connect/demo/eliza/v1/eliza_pb';
import type { PageLoad } from './$types'
import { createClient, wrapFetch } from '../../utils';

export const load: PageLoad = async ({ fetch }) => {
  const client = createClient(
    ElizaService,
    wrapFetch("calling from the server", fetch)
  )
  const { sentence } = await client.say(new SayRequest({
      sentence: "hi from the server",
  }))

  console.log("server sentence:", sentence)

  return { serverSentence: sentence }
}
