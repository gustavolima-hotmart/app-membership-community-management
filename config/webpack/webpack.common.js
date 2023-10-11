/** @type { import('webpack').Configuration } */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESlintPlugin = require('eslint-webpack-plugin')
const packageJSON = require('../../package.json')
const { getEnvironmentItems } = require('./utils/getEnvironmentItems')

const { readFileSync } = require('fs')

require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', 'environments', `.env.${process.env.NODE_ENV}`)
})

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
  entry: path.resolve(__dirname, '..', '..', 'src', 'index'),
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[chunkhash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: isDevelopment
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          !isProduction
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              titleProp: true,
              ref: true
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    symlinks: isDevelopment,
    extensions: ['.tsx', '.ts', '.js', '.json'],
    unsafeCache: true,
    alias: {
      src: path.resolve(__dirname, '..', '..', 'src'),
      public: path.resolve(__dirname, '..', '..', 'public')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      isProd: isProduction,
      template: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
      favicon: path.resolve(__dirname, '..', '..', 'public', 'favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.PROJECT_VERSION': JSON.stringify(packageJSON.version)
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: path.resolve(__dirname, '..', '..', 'public', 'assets') }]
    }),
    new ESlintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    })
  ]
}