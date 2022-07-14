import { expect, test } from '@playwright/test';
import { createPromiseClient, createConnectTransport } from '@bufbuild/connect-web';
import { ElizaService } from '../src/gen/buf/connect/demo/eliza/v1/eliza_connectweb.js';
import { IntroduceRequest } from '../src/gen/buf/connect/demo/eliza/v1/eliza_pb.js';

test('imports correctly', async ({ page }) => {
	// await page.goto('/');
	// expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');

	expect(ElizaService).toBeDefined();
	expect(IntroduceRequest).toBeDefined();

	const client = createPromiseClient(
		ElizaService,
		createConnectTransport({
			baseUrl: 'https://demo.connect.build'
		})
	);

	expect(client.say).toBeDefined();
	expect(client.introduce).toBeDefined();
});
