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

import { ConnectRouter } from "@bufbuild/connect";
import { KitchenSinkService } from "./gen/kitchensink_connect.js";
import {
  KitchenSinkRequest,
  KitchenSinkResponse,
} from "./gen/kitchensink_pb.js";

type ProtoPrimitive = string | number | bigint | boolean | Uint8Array;

const modify = <T extends ProtoPrimitive | ProtoPrimitive[] | Record<string, ProtoPrimitive>>(input: T): T => {
  switch (typeof input) {
    case "string":
      if (input === input.toUpperCase()) {
        return input.toLowerCase() as T;
      }
      return input.toUpperCase() as T;
    case "number":
      return input + 1 as T;
    case "bigint":
      return input + 1n as T;
    case "boolean":
      return !input as T;
    case "object":
      if (input instanceof Uint8Array) {
        if (input.length === 0) {
          return input;
        }
        const last = input[input.length - 1] as typeof input[number];
        return new Uint8Array([...input as Uint8Array, modify(last)]) as T;
      }
      if (Array.isArray(input)) {
        if (input.length === 0) {
          return input;
        }
        const last = input[input.length - 1] as typeof input[number];
        return [...input, modify(last)] as T;
      }
      
      return Object.entries(input).reduce((accumulator, [key, value]) => ({
        ...accumulator,
        [modify(key)]: modify(value),
      }), {}) as T
    }
    throw new Error(`unrecognized type: ${typeof input}`);
  }

/* eslint-disable-next-line import/no-anonymous-default-export */
export default (router: ConnectRouter) =>
  router.service(KitchenSinkService, {
    getKitchenSink: (request: KitchenSinkRequest) => {
      return new KitchenSinkResponse({
        responseDouble:   modify(request.requestDouble),
        responseFloat:    modify(request.requestFloat),
        responseInt32:    modify(request.requestInt32),
        responseInt64:    modify(request.requestInt64),
        responseUint32:   modify(request.requestUint32),
        responseUint64:   modify(request.requestUint64),
        responseSint32:   modify(request.requestSint32),
        responseSint64:   modify(request.requestSint64),
        responseFixed32:  modify(request.requestFixed32),
        responseFixed64:  modify(request.requestFixed64),
        responseSfixed32: modify(request.requestSfixed32),
        responseSfixed64: modify(request.requestSfixed64),
        responseBool:     modify(request.requestBool),
        responseString:   modify(request.requestString),
        responseBytes:    modify(request.requestBytes),

        responseMapStringBool: modify(request.requestMapStringBool),

        responseRepeatedDouble:   modify(request.requestRepeatedDouble),
        responseRepeatedFloat:    modify(request.requestRepeatedFloat),
        responseRepeatedInt32:    modify(request.requestRepeatedInt32),
        responseRepeatedInt64:    modify(request.requestRepeatedInt64),
        responseRepeatedUint32:   modify(request.requestRepeatedUint32),
        responseRepeatedUint64:   modify(request.requestRepeatedUint64),
        responseRepeatedSint32:   modify(request.requestRepeatedSint32),
        responseRepeatedSint64:   modify(request.requestRepeatedSint64),
        responseRepeatedFixed32:  modify(request.requestRepeatedFixed32),
        responseRepeatedFixed64:  modify(request.requestRepeatedFixed64),
        responseRepeatedSfixed32: modify(request.requestRepeatedSfixed32),
        responseRepeatedSfixed64: modify(request.requestRepeatedSfixed64),
        responseRepeatedBool:     modify(request.requestRepeatedBool),
        responseRepeatedString:   modify(request.requestRepeatedString),
        responseRepeatedBytes:    modify(request.requestRepeatedBytes),
      });
    },
  });
