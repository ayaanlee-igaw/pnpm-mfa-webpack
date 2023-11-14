const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.ts',
    },
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'container',
        filename: 'remoteEntry.js',
        remotes: {
          service: 'service@http://localhost:8082/remoteEntry.js',
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
