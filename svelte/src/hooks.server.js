// Note: this file is required for the universal fetch handler

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await resolve(event, {
        filterSerializedResponseHeaders: (name) => name === "content-type",
    });

    return response;
}
