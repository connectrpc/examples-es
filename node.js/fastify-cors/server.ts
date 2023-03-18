// Copyright 2021-2023 Buf Technologies, Inc.
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

import { fastify } from 'fastify'
import { fastifyConnectPlugin } from '@bufbuild/connect-fastify'
import { cors } from '@bufbuild/connect'
import fastifyCors from '@fastify/cors'
import { readFileSync } from 'fs'
import routes from '../connect'

const server = fastify()

await server.register(fastifyCors, {
    origin: true, // Only recommended for development
    methods: [...cors.allowedMethods],
    allowedHeaders: [...cors.allowedHeaders],
    exposedHeaders: [...cors.exposedHeaders],
})
await server.register(fastifyConnectPlugin, { routes })

server.get('/', (_, reply) => {
    reply.type('text/html')
    reply.send(readFileSync('../www/index-fastify.html', 'utf8'))
})

server.get('/app.css', (_, reply) => {
    reply.type('text/css')
    reply.send(readFileSync('../www/app.css', 'utf8'))
})

await server.listen({ host: 'localhost', port: 3000 })
console.log('server is listening at', server.addresses())
console.log('Run `npm run client` for a terminal client.\n')
