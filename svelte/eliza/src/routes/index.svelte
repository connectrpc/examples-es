<script>
	import { makePromiseClient, createConnectTransport } from '@bufbuild/connect-web';
	import { ElizaService } from '../gen/buf/connect/demo/eliza/v1/eliza_connectweb.js';

	let sentence = '';
	let answer = '';

	// Make the Eliza Service client
	const client = makePromiseClient(
		ElizaService,
		createConnectTransport({
			baseUrl: 'https://demo.connect.build'
		})
	);

	const send = async () => {
		const response = await client.say({
			sentence
		});

		answer = response.sentence;
	};
</script>

<div class="main">
	<h1>Eliza</h1>
	<input type="text" bind:value={sentence} />
	<button on:click={send}>Send</button>
	<p>{answer}</p>
</div>

<style>
	@media (min-width: 1024px) {
		.main {
			min-height: 100vh;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
		}
	}
</style>
