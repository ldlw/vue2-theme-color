const { defineConfig } = require('@vue/cli-service')
const plugin = require('./postcss-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [plugin]
        }
      }
    }
  }
})
