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

import * as http2 from "http2";
import * as http from "http";
import * as https from "https";
import { afterEach, beforeEach } from "node:test";

/**
 * A helper for testing HTTP servers.
 * Before each test, spin up the given server, and tear it down again after the
 * test.
 */
export function setupTestServer(
    createServer: () => AnyNodeServer
): () => ServerInfo {
    let server: AnyNodeServer | undefined;
    beforeEach((_context, doneFn) =>
        server = createServer().listen(0, doneFn)
    );
    afterEach(() => server?.close());
    return () => ({
        httpVersion: server instanceof http.Server ? "1.1" : "2",
        baseUrl: getServerUrl(server)
    });
}

type ServerInfo = { baseUrl: string; httpVersion: "1.1" | "2" };
type AnyNodeServer =
    | http.Server
    | https.Server
    | http2.Http2Server
    | http2.Http2SecureServer

function getServerUrl(
    server: AnyNodeServer | undefined
): string {
    if (server === undefined) {
        throw new Error("cannot get server port");
    }
    const address = server.address();
    if (address == null || typeof address == "string") {
        throw new Error("cannot get server port");
    }
    const secure = "setSecureContext" in server;
    return `${secure ? "https" : "http"}://localhost:${address.port}`;
}
