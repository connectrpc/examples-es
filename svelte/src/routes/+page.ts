import type { PageLoad } from './$types'
import { wrapFetch } from './wrap-fetch'

export const load: PageLoad = async ({ fetch }) => ({
  fetch: wrapFetch('calling from +page.ts', fetch),
})
