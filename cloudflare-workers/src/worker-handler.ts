import { createConnectRouter } from '@connectrpc/connect';
import { universalServerRequestFromFetch, universalServerResponseToFetch } from '@connectrpc/connect/protocol';
import type { ConnectRouter, ContextValues } from '@connectrpc/connect';
import type { UniversalHandler } from '@connectrpc/connect/protocol';

/**
 * Creates new woker handler for the given Connect API routes.
 */
export function createWorkerHandler<Env>(
	routes: (router: ConnectRouter) => void,
	options?: {
		contextValues?: (req: Request, env: Env, ctx: ExecutionContext) => ContextValues;
		notFound?: (req: Request, env: Env, ctx: ExecutionContext) => Response;
	}
) {
	const router = createConnectRouter();
	routes(router);
	const paths = new Map<string, UniversalHandler>();
	for (const uHandler of router.handlers) {
		paths.set(uHandler.requestPath, uHandler);
	}
	return async (req: Request, env: Env, ctx: ExecutionContext) => {
		const url = new URL(req.url);
		const handler = paths.get(url.pathname);
		if (handler === undefined) {
			return options?.notFound?.(req, env, ctx) ?? new Response('Not found', { status: 404 });
		}
		const uReq = { ...universalServerRequestFromFetch(req, {}), contextValues: options?.contextValues?.(req, env, ctx) };
		const uRes = await handler(uReq);
		return universalServerResponseToFetch(uRes);
	};
}
