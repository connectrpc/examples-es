const path = require('path');

module.exports = {
  mode: 'development',
  entry: './consumer/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'webpack/dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
    },
    hot: true,
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {
              '.js': ['.ts', '.js'],
        },
    }
};
