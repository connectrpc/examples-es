// Copyright 2021-2023 The Connect Authors
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

import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-node';
import { ElizaService } from './gen/connectrpc/eliza/v1/eliza_pb.js';
import { stdin, stdout } from 'process';
import * as readline from 'node:readline/promises';
import { createLoggingInterceptor } from "./interceptor.js";

const rl = readline.createInterface(stdin, stdout);

// Alternatively, use createGrpcTransport or createGrpcWebTransport here
// to use one of the other supported protocols.
const transport = createConnectTransport({
  httpVersion: '1.1',
  baseUrl: 'http://localhost:3000',
  interceptors: [createLoggingInterceptor()],
});

void (async () => {
    const client = createClient(ElizaService, transport);

    const name = await rl.question('What is your name?\n> ');

    for await (const res of client.introduce({ name })) {
        rl.write(res.sentence + '\n');
    }

    for (; ;) {
        const sentence = await rl.question('> ');
        const res = await client.say({ sentence });
        rl.write(res.sentence + '\n');
    }
})();
