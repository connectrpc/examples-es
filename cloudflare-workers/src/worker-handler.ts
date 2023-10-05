import { createConnectRouter } from '@connectrpc/connect';
import { universalServerRequestFromFetch, universalServerResponseToFetch } from '@connectrpc/connect/protocol';
import type { ConnectRouter, ConnectRouterOptions, ContextValues } from '@connectrpc/connect';
import type { UniversalHandler } from '@connectrpc/connect/protocol';

interface WokerHandlerOptions<Env> extends ConnectRouterOptions {
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
	contextValues?: (req: Request, env: Env, ctx: ExecutionContext) => ContextValues;
	/**
	 * Called when no route matches the request.
	 */
	notFound?: (req: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;
}

/**
 * Creates new worker handler for the given Connect API routes.
 */
export function createWorkerHandler<Env>(options: WokerHandlerOptions<Env>) {
	const router = createConnectRouter();
	options.routes(router);
	const paths = new Map<string, UniversalHandler>();
	for (const uHandler of router.handlers) {
		paths.set(uHandler.requestPath, uHandler);
	}
	return {
		async fetch(req: Request, env: Env, ctx: ExecutionContext) {
			const url = new URL(req.url);
			const handler = paths.get(url.pathname);
			if (handler === undefined) {
				return (await options?.notFound?.(req, env, ctx)) ?? new Response('Not found', { status: 404 });
			}
			const uReq = { ...universalServerRequestFromFetch(req, {}), contextValues: options?.contextValues?.(req, env, ctx) };
			const uRes = await handler(uReq);
			return universalServerResponseToFetch(uRes);
		},
	};
}
