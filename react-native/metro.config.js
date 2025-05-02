const { getDefaultConfig } = require("@expo/metro-config");
const { mergeConfig } = require("metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Connect-ES and Protobuf-ES use package exports
    // (https://nodejs.org/docs/latest-v12.x/api/packages.html#packages_exports).
    //
    // We need to enable support for them in Metro. See https://metrobundler.dev/docs/package-exports/
    unstable_enablePackageExports: true,
  },
};

module.exports = mergeConfig(defaultConfig, config);
