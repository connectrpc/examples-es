module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:@react-native/babel-preset"],
    plugins: [["@babel/plugin-proposal-async-generator-functions"]],
  };
};
