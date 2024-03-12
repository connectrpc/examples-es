// from webpack 5 docs https://webpack.js.org/guides/typescript/

const path = require('path');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/ts'),
  },
};
