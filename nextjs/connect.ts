import { ConnectRouter } from '@bufbuild/connect'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connect.js'

export default (router: ConnectRouter) => {
    router.service(ElizaService, {})
}
