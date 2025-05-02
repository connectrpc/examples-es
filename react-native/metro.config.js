const { getDefaultConfig } = require("@expo/metro-config");
const { mergeConfig } = require("metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Connect-ES and Protobuf-ES use package exports (https://nodejs.org/docs/latest-v12.x/api/packages.html#packages_exports).
    // We no longer need `unstable_enablePackageExports: true` because
    // they are now enabled by default.
    // See https://expo.dev/changelog/sdk-53#the-packagejsonexports-field-is-now-enabled-by-default-in-metro-bundler
  },
};

module.exports = mergeConfig(defaultConfig, config);
