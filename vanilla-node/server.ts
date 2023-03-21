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

import { connectNodeAdapter } from '@bufbuild/connect-node';
import { cors as connectCors } from '@bufbuild/connect';
import cors from 'cors';
import routes from './connect.js';
import * as esbuild from 'esbuild';
import http from 'http';
import { readFileSync } from 'fs';
import { stdout } from 'process';

const PORT = 3000;

// The adapter turns our RPC routes into as Node.js request handler.
const handler = connectNodeAdapter({
    routes,
    // If none of the RPC routes match, this handler is called.
    // We serve our web interface here:
    fallback(req, res) {
        switch (req.url) {
            case '/':
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(
                    readFileSync('../www/index-node.html', 'utf8'),
                    'utf8'
                );
                res.end();
                break;
            case '/app.css':
                res.writeHead(200, { 'content-type': 'text/css' });
                res.write(readFileSync('../www/app.css', 'utf8'), 'utf8');
                res.end();
                break;
            case '/webclient.js':
                void esbuild
                    .build({
                        entryPoints: ['../webclient.ts'],
                        bundle: true,
                        write: false,
                        globalName: 'eliza',
                    })
                    .then((result) => {
                        res.writeHead(200, {
                            'content-type': 'application/javascript',
                        });
                        res.write(result.outputFiles[0].text, 'utf8');
                        res.end();
                    });
                break;
            default:
                res.writeHead(404);
                res.end();
        }
    },
});

// CORS example using Express middleware with vanilla HTTP server
const corsHandler = cors({
    origin: true, // Only recommended for development
    methods: [...connectCors.allowedMethods],
    allowedHeaders: [...connectCors.allowedHeaders],
    exposedHeaders: [...connectCors.exposedHeaders],
});

http.createServer((req, res) => {
    corsHandler(req, res, () => handler(req, res));
}).listen(PORT, () => {
    stdout.write(`The app is running on http://localhost:${PORT}\n`);
    stdout.write('Run `npm run client` for a terminal client.\n');
    stdout.write('Run `npm run serve` for a web client using CORS.\n');
});
