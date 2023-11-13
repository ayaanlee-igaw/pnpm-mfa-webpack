const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.ts',
    },
  },
  publicPath: 'auto',
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'service',
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld.vue': './src/components/HelloWorld.vue',
          './AboutView.vue': './src/views/AboutView.vue',
          // './App.vue': './src/App.vue',
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
