import { Code, ConnectError, HandlerContext, type ConnectRouter } from '@connectrpc/connect';
import { UrlShortenerService } from './gen/urlshortener/v1/urlshortener_pb';
import { kStore } from './store-context';

function validateUrl(url: string) {
	try {
		new URL(url);
	} catch (e) {
		throw new ConnectError('Invalid URL', Code.InvalidArgument, undefined, undefined, e);
	}
}

function getStore(ctx: HandlerContext): KVNamespace {
	const store = ctx.values.get(kStore);
	if (!store) {
		console.error('kv store not found');
		throw new ConnectError('Internal Error', Code.Internal);
	}
	return store;
}

export default ({ service }: ConnectRouter) => {
	service(UrlShortenerService, {
		shorten: async ({ url }, ctx) => {
			validateUrl(url);
			const store = getStore(ctx);
			let shortUrl = await store.get(url);
			if (shortUrl === null) {
				shortUrl = `https://example.com/${crypto.randomUUID()}`;
				store.put(url, shortUrl);
				store.put(shortUrl, url);
			}
			return {
				url: shortUrl,
			};
		},
		expand: async ({ url }, ctx) => {
			validateUrl(url);
			const store = getStore(ctx);
			const originalUrl = await store.get(url);
			if (originalUrl === null) {
				throw new ConnectError('URL not found', Code.InvalidArgument);
			}
			return {
				url: originalUrl,
			};
		},
	});
};
