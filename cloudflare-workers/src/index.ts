/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createConnectRouter } from '@connectrpc/connect';
import type { UniversalHandler } from '@connectrpc/connect/protocol';
import routes from './routes.js';
import { universalServerRequestFromFetch, universalServerResponseToFetch } from './universal.js';
import { kStore } from './store-context.js';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	STORE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

const router = createConnectRouter();
routes(router);
const paths = new Map<string, UniversalHandler>();
for (const uHandler of router.handlers) {
	paths.set(uHandler.requestPath, uHandler);
}

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(req.url);
		const handler = paths.get(url.pathname);
		if (handler === undefined) {
			return new Response('Not found', { status: 404 });
		}
		const uReq = universalServerRequestFromFetch(req);
		// Add context values here
		uReq.contextValues?.set(kStore, env.STORE);
		const uRes = await handler(uReq);
		return universalServerResponseToFetch(uRes);
	},
};
