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

import { ConnectRouter } from "@connectrpc/connect";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_pb";
import type {
  SayRequest,
  IntroduceRequest,
  ConverseRequest,
} from "@/gen/connectrpc/eliza/v1/eliza_pb";

export default (router: ConnectRouter) =>
  router.service(ElizaService, {
    say(req: SayRequest) {
      return {
        sentence: `You said ${req.sentence}`,
      };
    },
    async *introduce(req: IntroduceRequest) {
      yield { sentence: `Hi ${req.name}, I'm Eliza` };
      await delay(250);
      yield {
        sentence: `Before we begin, ${req.name}, let me tell you something about myself.`,
      };
      await delay(250);
      yield { sentence: `I'm a Rogerian psychotherapist.` };
      await delay(250);
      yield { sentence: `How are you feeling today?` };
    },
    async *converse(reqs: AsyncIterable<ConverseRequest>) {
      for await (const req of reqs) {
        yield {
          sentence: `You said ${req.sentence}`,
        };
      }
    },
  });

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
