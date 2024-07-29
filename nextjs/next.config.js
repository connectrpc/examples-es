/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allow the .js extension in import paths when importing TypeScript files.
  // It is the standard for ECMAScript modules, but not all bundlers have
  // caught up yet.
  // Alternatively, add the plugin option `import_extension=none` in buf.gen.yaml.
  //   webpack: (config) => {
  //     config.resolve = {
  //       ...config.resolve,
  //       extensionAlias: {
  //         ".js": [".ts", ".js"],
  //       },
  //     };

  //     return config;
  //   },
};

module.exports = nextConfig;
