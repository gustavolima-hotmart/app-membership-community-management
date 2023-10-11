const { merge } = require('webpack-merge')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { readFileSync } = require('fs')
const common = require('./webpack.common')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    historyApiFallback: true,
    hot: true,
    compress: true,
    client: { overlay: false },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    },
    https: true,
    static: './dist',
    server: {
      type: 'https',
      options: {
        key: readFileSync(path.resolve(__dirname, '..', '..', `${process.env.APP_HOST}+3-key.pem`)),
        cert: readFileSync(path.resolve(__dirname, '..', '..', `${process.env.APP_HOST}+3.pem`))
      }
    }
  },
  plugins: [
    new ReactRefreshPlugin({
      forceEnable: true,
      overlay: false
    })
  ]
})
