/** @type {import('next').NextConfig} */
export default {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.resolve = {
            ...config.resolve,
            extensionAlias: {
                '.js': ['.ts', '.js'],
            },
        }

        return config
    },
    experimental: {
        appDir: true,
    },
}
