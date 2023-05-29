const path = require('path');
const webpack = require('webpack');
const rootDir = path.join(__dirname, '../App');
const webpackEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.resolve(rootDir, 'index.js'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ], // read files in following order
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
};
