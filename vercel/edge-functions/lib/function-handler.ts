import { createConnectRouter } from "@connectrpc/connect";
import {
  universalServerRequestFromFetch,
  universalServerResponseToFetch,
} from "@connectrpc/connect/protocol";
import type {
  ConnectRouter,
  ConnectRouterOptions,
  ContextValues,
} from "@connectrpc/connect";
import type { UniversalHandler } from "@connectrpc/connect/protocol";
import type { RequestContext } from "@vercel/edge";

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
 * Creates new worker handler for the given Connect API routes.
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
    const uReq = {
      ...universalServerRequestFromFetch(req, {}),
      contextValues: options?.contextValues?.(req, ctx),
    };
    const uRes = await handler(uReq);
    return universalServerResponseToFetch(uRes);
  };
}
