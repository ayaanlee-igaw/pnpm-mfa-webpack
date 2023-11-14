const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

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
      new ModuleFederationPlugin({
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
          vuex: {
            singleton: true,
          },
          'vue-router': {
            singleton: true,
          },
          'core-js': {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
