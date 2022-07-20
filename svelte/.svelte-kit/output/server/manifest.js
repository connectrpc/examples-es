export const manifest = {
    appDir: '_app',
    assets: new Set(['favicon.png']),
    mimeTypes: { '.png': 'image/png' },
    _: {
        entry: {
            file: 'start-0787edc7.js',
            js: ['start-0787edc7.js', 'chunks/index-e6474461.js'],
            css: [],
        },
        nodes: [
            () => import('./nodes/0.js'),
            () => import('./nodes/1.js'),
            () => import('./nodes/2.js'),
        ],
        routes: [
            {
                type: 'page',
                id: '',
                pattern: /^\/$/,
                names: [],
                types: [],
                path: '/',
                shadow: null,
                a: [0, 2],
                b: [1],
            },
        ],
        matchers: async () => {
            return {}
        },
    },
}
