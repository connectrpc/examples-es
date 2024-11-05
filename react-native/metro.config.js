const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    unstable_allowRequireContext: true,
  },
  resolver: {
    unstable_enablePackageExports: true,
  },
};

module.exports = mergeConfig(defaultConfig, config);
