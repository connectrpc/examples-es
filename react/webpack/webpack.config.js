// const path = require('path');

import path from 'path';

const __dirname = path.resolve();

export default {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {
              '.js': ['.ts', '.js'],
        },
    }
};
