/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
     config.resolve = {
        ...config.resolve,
        extensionAlias: {
              '.js': ['.ts', '.js'],
        },
     };

     return config
   },
}

module.exports = nextConfig

