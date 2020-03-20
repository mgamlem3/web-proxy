/**
 * @author Michael Gamlem III
 * @copyright This file is subject to the terms and conditions defined in file 'LICENSE', which is part of the source code for this project.
 * @format
 */

const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "server.js"),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "main.g.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "/dist/",
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
