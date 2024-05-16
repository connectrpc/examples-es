import { Message } from "@bufbuild/protobuf";

import type {
  AnyMessage,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";

import type { ContextValues, UnaryRequest } from "@connectrpc/connect";
import { Code, ConnectError, createContextValues } from "@connectrpc/connect";
import type { Transport, UnaryResponse } from "@connectrpc/connect";
import {
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  runUnaryCall,
} from "@connectrpc/connect/protocol";
import {
  requestHeader,
  trailerFlag,
  trailerParse,
  validateResponse,
  validateTrailer,
} from "@connectrpc/connect/protocol-grpc-web";
import { GrpcWebTransportOptions } from "@connectrpc/connect-web";

class AbortError extends Error {
  name = "AbortError";
}

interface FetchXHRResponse {
  status: number;
  headers: Headers;
  body: Uint8Array;
}

function parseHeaders(allHeaders: string): Headers {
  return allHeaders
    .trim()
    .split(/[\r\n]+/)
    .reduce((memo, header) => {
      const [key, value] = header.split(": ");
      memo.append(key, value);
      return memo;
    }, new Headers());
}

function extractDataChunks(initialData: Uint8Array) {
  let buffer = initialData;
  let dataChunks: { flags: number; data: Uint8Array }[] = [];

  while (buffer.byteLength >= 5) {
    let length = 0;
    let flags = buffer[0];

    for (let i = 1; i < 5; i++) {
      length = (length << 8) + buffer[i]; // eslint-disable-line no-bitwise
    }

    const data = buffer.subarray(5, 5 + length);
    buffer = buffer.subarray(5 + length);
    dataChunks.push({ flags, data });
  }

  return dataChunks;
}

export function createXHRGrpcWebTransport(
  options: GrpcWebTransportOptions,
): Transport {
  const useBinaryFormat = options.useBinaryFormat ?? true;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage,
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: Headers,
      message: PartialMessage<I>,
      contextValues?: ContextValues,
    ): Promise<UnaryResponse<I, O>> {
      const { serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions,
      );

      return await runUnaryCall<I, O>({
        signal,
        interceptors: options.interceptors,
        req: {
          stream: false,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            mode: "cors",
          },
          header: requestHeader(useBinaryFormat, timeoutMs, header, false),
          contextValues: contextValues ?? createContextValues(),
          message,
        },
        next: async (req: UnaryRequest<I, O>): Promise<UnaryResponse<I, O>> => {
          function fetchXHR(): Promise<FetchXHRResponse> {
            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();

              xhr.open(req.init.method ?? "POST", req.url);

              function onAbort() {
                xhr.abort();
              }

              req.signal.addEventListener("abort", onAbort);

              xhr.addEventListener("abort", () => {
                reject(new AbortError("Request aborted"));
              });

              xhr.addEventListener("load", () => {
                resolve({
                  status: xhr.status,
                  headers: parseHeaders(xhr.getAllResponseHeaders()),
                  body: new Uint8Array(xhr.response),
                });
              });

              xhr.addEventListener("error", () => {
                reject(new Error("Network Error"));
              });

              xhr.addEventListener("loadend", () => {
                req.signal.removeEventListener("abort", onAbort);
              });

              xhr.responseType = "arraybuffer";

              req.header.forEach((value: string, key: string) =>
                xhr.setRequestHeader(key, value),
              );

              xhr.send(encodeEnvelope(0, serialize(req.message)));
            });
          }
          const response = await fetchXHR();

          validateResponse(response.status, response.headers);

          const chunks = extractDataChunks(response.body);

          let trailer: Headers | undefined;
          let message: O | undefined;

          chunks.forEach(({ flags, data }) => {
            if (flags === trailerFlag) {
              if (trailer !== undefined) {
                throw "extra trailer";
              }

              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              trailer = trailerParse(data);
              return;
            }

            if (message !== undefined) {
              throw "extra message";
            }

            message = parse(data);
          });

          if (trailer === undefined) {
            throw "missing trailer";
          }

          validateTrailer(trailer, response.headers);

          if (message === undefined) {
            throw "missing message";
          }

          return {
            stream: false,
            header: response.headers,
            message,
            trailer,
            service,
            method,
          } satisfies UnaryResponse<I, O>;
        },
      });
    },
    stream(..._args: unknown[]) {
      return Promise.reject(
        new ConnectError("streaming is not implemented", Code.Unimplemented),
      );
    },
  };
}
