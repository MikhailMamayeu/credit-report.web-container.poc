const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/index.js', 'webpack-plugin-serve/client'],
  output: {
    filename: 'static/[name].js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new WebpackPluginServe({
      host: '127.0.0.1',
      port: 3000,
      static: ['dist', 'dist/static'],
      open: true,
      historyFallback: true,
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].css',
    }),
  ],
  watch: true,
};
