import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    preview: {
        port: 3000,
    },
    test: {
        include: ["src/tests/*.spec.ts"],
        globals: true,
        environment: "jsdom",
    },
};

export default config;
