//  Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
    ConnectRouter,
    createConnectRouter,
    ConnectRouterOptions,
} from '@bufbuild/connect'
import { UniversalHandler } from '@bufbuild/connect/protocol'
import {
    compressionBrotli,
    compressionGzip,
    universalRequestFromNodeRequest,
    universalResponseToNodeResponse,
} from '@bufbuild/connect-node'
import { NextApiRequest, NextApiResponse } from 'next'

type NextApiHandler<T = any> = (
    req: NextApiRequest,
    res: NextApiResponse<T>
) => unknown | Promise<unknown>

interface NextJsApiRouterOptions extends ConnectRouterOptions {
    /**
     * Route definitions. We recommend the following pattern:
     *
     * Create a file `connect.ts` with a default export such as this:
     *
     * ```ts
     * import {ConnectRouter} from "@bufbuild/connect";
     *
     * export default (router: ConnectRouter) => {
     *   router.service(ElizaService, {});
     * }
     * ```
     *
     * Then pass this function here.
     */
    routes: (router: ConnectRouter) => void

    fallback: (request: NextApiRequest, response: NextApiResponse) => void

    /**
     * Serve all handlers under this prefix. For example, the prefix "/something"
     * will serve the RPC foo.FooService/Bar under "/something/foo.FooService/Bar".
     *
     * This is `/api` by default for Next.js.
     */
    prefix?: string
}

export function nextJsApiRouter(options: NextJsApiRouterOptions): ApiRoute {
    if (options.acceptCompression === undefined) {
        options.acceptCompression = [compressionGzip, compressionBrotli]
    }
    const router = createConnectRouter(options)
    options.routes(router)
    const prefix = options.prefix ?? '/api'
    const paths = new Map<string, UniversalHandler>()
    for (const uHandler of router.handlers) {
        paths.set(prefix + uHandler.requestPath, uHandler)
    }
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        const requestPath = req.url ?? ''
        const uHandler = paths.get(requestPath)
        if (!uHandler) {
            ;(options.fallback ?? fallback)(req, res)
            return
        }
        console.log('calling uhandler')
        const uRes = await uHandler(
            universalRequestFromNodeRequest(req, req.body)
        )
        console.log('awaiting a universal response')
        console.log(uRes)
        console.log(res)
        try {
            await universalResponseToNodeResponse(uRes, res)
        } catch (e) {
            console.log('shit failed ', e)
        }
    }
    return {
        handler,
        config: {
            api: {
                bodyParser: false,
            },
        },
    }
}

const fallback = (request: NextApiRequest, response: NextApiResponse) => {
    response.writeHead(404)
    response.end()
}

interface ApiRoute {
    handler: NextApiHandler
    config: {
        api: {
            bodyParser: false // body-parser stumbles over connect+json server-streaming RPC
        }
    }
}
