import { after, describe, it } from 'node:test';
import assert from 'node:assert';
import { Miniflare } from 'miniflare';
import { UrlShortenerService } from './gen/urlshortener/v1/urlshortener_connect.js';
import { createConnectTransport } from '@connectrpc/connect-node';
import { createPromiseClient } from '@connectrpc/connect';

describe('url-shortener', async () => {
	const mf = new Miniflare({
		scriptPath: './dist/index.js',
		modules: true,
		kvNamespaces: ['STORE'],
		compatibilityDate: '2023-10-02', // REQUIRED for using ReadableStream
	});
	after(() => mf.dispose());
	const baseUrl = (await mf.ready).toString().slice(0, -1);
	const transport = createConnectTransport({
		baseUrl: baseUrl,
		httpVersion: '1.1',
		useBinaryFormat: true,
	});
	const client = createPromiseClient(UrlShortenerService, transport);
	await it('should shorten and expand', async () => {
		const { url: shortUrl } = await client.shorten({ url: 'https://google.com' });
		const { url: longUrl } = await client.expand({ url: shortUrl });
		assert.strictEqual(longUrl, 'https://google.com');
	});
});
