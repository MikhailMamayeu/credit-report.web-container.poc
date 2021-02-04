const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output: {
    filename: 'static/[name].js',
  },
  devServer: {
    https: true,
    host: 'credit-report-web-container-poc.dev.ctmers.io',
    port: 3000,
    static: ['dist/static'],
    open: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].css',
    }),
  ],
};
