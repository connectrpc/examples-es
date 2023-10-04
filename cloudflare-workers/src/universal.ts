import { createContextValues } from '@connectrpc/connect';
import type { UniversalServerRequest, UniversalServerResponse } from '@connectrpc/connect/protocol';

export function universalServerRequestFromFetch(req: Request): UniversalServerRequest {
	return {
		httpVersion: '',
		method: req.method,
		url: req.url,
		header: req.headers,
		body: iterableFromReadableStream(req.body),
		signal: req.signal,
		contextValues: createContextValues(),
	};
}

export function universalServerResponseToFetch(res: UniversalServerResponse): Response {
	let body: ReadableStream<Uint8Array> | null = null;
	if (res.body !== undefined) {
		body = iterableToReadableStream(res.body);
	}
	return new Response(body, {
		status: res.status,
		headers: res.header,
	});
}

function iterableToReadableStream(iterable: AsyncIterable<Uint8Array>): ReadableStream<Uint8Array> {
	const it = iterable[Symbol.asyncIterator]();
	return new ReadableStream<Uint8Array>(<UnderlyingSource<Uint8Array>>{
		async pull(controller: ReadableByteStreamController) {
			const r = await it.next();
			if (r.done === true) {
				controller.close();
				return;
			}
			controller.enqueue(r.value);
		},
		async cancel(reason) {
			if (it.throw) {
				try {
					await it.throw(reason);
				} catch {
					// iterator.throw on a generator function rethrows unless the
					// body catches and swallows.
				}
			}
		},
	});
}

function iterableFromReadableStream(body: ReadableStream<Uint8Array> | null): AsyncIterable<Uint8Array> {
	return {
		[Symbol.asyncIterator](): AsyncIterator<Uint8Array> {
			const reader = body?.getReader();
			return {
				async next() {
					if (reader !== undefined) {
						const r = await reader.read();
						if (r.done) {
							return {
								done: true,
								value: undefined,
							};
						}
						return r;
					}
					return {
						done: true,
						value: undefined,
					};
				},
				async throw(e: unknown) {
					if (reader !== undefined) {
						await reader.cancel(e);
					}
					return {
						done: true,
						value: undefined,
					};
				},
			};
		},
	};
}
