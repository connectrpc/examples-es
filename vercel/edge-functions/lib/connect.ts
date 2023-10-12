import { createConnectRouter } from "@connectrpc/connect";
import {
  createFetchClient,
  universalServerRequestFromFetch,
  universalServerResponseToFetch,
} from "@connectrpc/connect/protocol";
import type {
  ConnectRouter,
  ConnectRouterOptions,
  ContextValues,
  Interceptor,
} from "@connectrpc/connect";
import type {
  Compression,
  UniversalHandler,
} from "@connectrpc/connect/protocol";
import type { RequestContext } from "@vercel/edge";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
} from "@bufbuild/protobuf";
import { createTransport } from "@connectrpc/connect/protocol-connect";

interface EdgeFunctionHandlerOptions extends ConnectRouterOptions {
  /**
   * Route definitions. We recommend the following pattern:
   *
   * Create a file `connect.ts` with a default export such as this:
   *
   * ```ts
   * import {ConnectRouter} from "@connectrpc/connect";
   *
   * export default (router: ConnectRouter) => {
   *   router.service(ElizaService, {});
   * }
   * ```
   *
   * Then pass this function here.
   */
  routes: (router: ConnectRouter) => void;
  /**
   * Context values to extract from the request. These values are passed to
   * the handlers.
   */
  contextValues?: (req: Request, ctx: RequestContext) => ContextValues;
  /**
   * Called when no route matches the request.
   */
  notFound?: (req: Request, ctx: RequestContext) => Promise<Response>;
  /**
   * Optional prefix path to strip from the request path before routing.
   */
  stripPrefixPath?: string;
}

/**
 * Creates new edge function handler for the given Connect API routes.
 */
export function createEdgeFunctionHandler(options: EdgeFunctionHandlerOptions) {
  const router = createConnectRouter();
  options.routes(router);
  const paths = new Map<string, UniversalHandler>();
  for (const uHandler of router.handlers) {
    paths.set(uHandler.requestPath, uHandler);
  }
  return async (req: Request, ctx: RequestContext) => {
    const url = new URL(req.url);
    let pathname = url.pathname;
    console.log(pathname);
    if (options.stripPrefixPath !== undefined) {
      pathname = pathname.slice(options.stripPrefixPath.length);
    }
    const handler = paths.get(pathname);
    if (handler === undefined) {
      return (
        (await options?.notFound?.(req, ctx)) ??
        new Response("Not found", { status: 404 })
      );
    }
    console.log("matched");
    const uReq = {
      ...universalServerRequestFromFetch(req, {}),
      contextValues: options?.contextValues?.(req, ctx),
    };
    const uRes = await handler(uReq);
    return universalServerResponseToFetch(uRes);
  };
}

interface ConnectTransportOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "https://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   */
  baseUrl: string;
  /**
   * By default, clients use the binary format.
   */
  useBinaryFormat?: boolean;

  /**
   * Interceptors that should be applied to all calls running through
   * this transport. See the Interceptor type for details.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format.
   * By default, unknown fields are ignored.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * Controls whether or not Connect GET requests should be used when
   * available, on side-effect free methods. Defaults to false.
   */
  useHttpGet?: boolean;

  /**
   * The timeout in milliseconds to apply to all requests.
   *
   * This can be overridden on a per-request basis by passing a timeoutMs.
   */
  defaultTimeoutMs?: number;
}

export function createConnectTransport(options: ConnectTransportOptions) {
  return createTransport({
    httpClient: createFetchClient(fetch),
    useBinaryFormat: true,
    interceptors: [],
    acceptCompression: [],
    sendCompression: null,
    compressMinBytes: 1024,
    readMaxBytes: 0xffffffff,
    writeMaxBytes: 0xffffffff,
    ...options,
  });
}
