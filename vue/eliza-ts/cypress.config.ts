import { defineConfig } from 'cypress'
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin')

const options = {
    webpackOptions: {
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            plugins: [new ResolveTypeScriptPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { transpileOnly: true },
                },
            ],
        },
    },
}

export default defineConfig({
    e2e: {
        specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:4173',
        setupNodeEvents(on, config) {
            on('file:preprocessor', webpackPreprocessor(options))
        },
    },

    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
    },
})
