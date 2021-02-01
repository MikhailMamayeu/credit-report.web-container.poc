const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [new CleanWebpackPlugin()];

module.exports = env => {
  if (env.ANALYSE) {
    plugins.push(new BundleAnalyzerPlugin());
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
  };
};
