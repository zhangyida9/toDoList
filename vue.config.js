module.exports = {
  devServer: {
    host: 'localhost',
    proxy: {
      '/list': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  publicPath:'./'
}

