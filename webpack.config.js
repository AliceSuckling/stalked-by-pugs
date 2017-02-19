const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js',
    // './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'app'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, "dist"),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    loaders: [{
      query: {
        presets: [['es2015', {modules: false}]]
      }
    }],
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: "[name]-[local]",
            }
          },
          'postcss-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: [
          'file-loader',
        ],
        exclude: /node_modules/
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    "modules": [
      resolve(__dirname, "app"),
      "node_modules",
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new HtmlWebpackPlugin({
      "title": "Stalked By Pugs",
      "filename": "index.html",
      "template": resolve(__dirname, "index.ejs"),
      "chunksSortMode": "dependency"
    }),
  ],
};
