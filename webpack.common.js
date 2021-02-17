const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  DefinePlugin,
  container: { ModuleFederationPlugin },
} = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: /node_modules\/@meerstrap\/webui/,
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'Credit Report Web Container',
      environment: process.env.NODE_ENV,
      hostType: process.env.HOST_TYPE,
    }),
    new DefinePlugin({
      environment: JSON.stringify(process.env.NODE_ENV),
      hostType: JSON.stringify(process.env.HOST_TYPE),
    }),
    new ModuleFederationPlugin({
      name: 'webContainer',
      library: { type: 'var', name: 'webContainer' },
      remotes: { registration: 'registration', summaryReport: 'summaryReport' },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        'prop-types',
        '@meerstrap/components',
        '@meerstrap/webui',
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: process.env.NODE_ENV,
};
