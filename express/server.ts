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

import http from "node:http";
import express from "express";
import cors from "cors";
import { cors as connectCors } from "@connectrpc/connect";
import { expressConnectMiddleware } from "@connectrpc/connect-express";
import { readFileSync } from "node:fs";
import * as esbuild from "esbuild";
import routes from "./connect.js";

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const PORT = parseInt(process.argv[2] ?? 3000);
  build().listen({ host: "localhost", port: PORT });
  console.log(`The app is running on http://localhost:${PORT}`);
  console.log("Run `npm run client` for a terminal client.");
}

export function build() {
  const app = express();

  // Options for configuring CORS. The @connectrpc/connect package exports
  // convenience variables for configuring a CORS setup.
  const corsOptions: cors.CorsOptions = {
    // Reflects the request origin. This should only be used for development.
    // Production should explicitly specify an origin
    origin: true,
    methods: [...connectCors.allowedMethods],
    allowedHeaders: [...connectCors.allowedHeaders],
    exposedHeaders: [...connectCors.exposedHeaders],
  };

  app.use(cors(corsOptions));
  app.use(
      expressConnectMiddleware({
        routes,
      })
  );

  app.get("/", (_, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(readFileSync("./www/index.html", "utf8"), "utf8");
    res.end();
  });

  app.get("/app.css", (_, res) => {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(readFileSync("./www/app.css", "utf8"), "utf8");
    res.end();
  });

  app.get("/webclient.js", (_, res) => {
    void esbuild
        .build({
          entryPoints: ["./webclient.ts"],
          bundle: true,
          write: false,
          globalName: "eliza",
        })
        .then((result) => {
          res.writeHead(200, {
            "content-type": "application/javascript",
          });
          res.write(result.outputFiles[0].text, "utf8");
          res.end();
        });
  });

  return http.createServer(app);
}
