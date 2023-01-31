const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://192.168.1.14:3000/api'
  }
})
