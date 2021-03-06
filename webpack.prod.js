const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'static/[name].[contenthash].css',
  }),
  new CompressionWebpackPlugin(),
];

module.exports = env => {
  if (env.ANALYSE) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8000 }));
  }

  return {
    output: {
      filename: 'static/[name].[contenthash].js',
    },
    plugins,
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM',
      history: 'History',
      'prop-types': 'PropTypes',
    },
  };
};
