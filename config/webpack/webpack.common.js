/** @type { import('webpack').Configuration } */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESlintPlugin = require('eslint-webpack-plugin')
const packageJSON = require('../../package.json')
const alias = require('./utils/alias')
const paths = require('./utils/paths')
const { envs } = require('./utils/envs')

const { ModuleFederationPlugin } = webpack.container

require('dotenv').config({
  path: paths.ENV[process.env.NODE_ENV]
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
    publicPath: process.env.ASSET_PATH,
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[chunkhash]-app-membership-community-management.bundle.js'
  },
  resolve: {
    symlinks: isDevelopment,
    extensions: ['.tsx', '.ts', '.js', '.json'],
    unsafeCache: true,
    alias
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules|\.d\.ts$/i,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: isDevelopment
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          !isProduction
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
           },
          'postcss-loader'
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
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(envs),
    new ModuleFederationPlugin({
      name: 'communityManagement',
      filename: 'remoteEntry.js',
      exposes: {
        './CommunityManagementMFE': './src/main.tsx',
        './routes': './src/router/routes/routes.ts',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: packageJSON.dependencies.react
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: packageJSON.dependencies['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: packageJSON.dependencies['react-router-dom']
        },
        '@tanstack/react-query': {
          singleton: true,
          eager: true,
          requiredVersion: packageJSON.dependencies['@tanstack/react-query']
        },
        '@tanstack/react-query-devtools': {
          singleton: true,
          eager: true,
          requiredVersion: packageJSON.devDependencies['@tanstack/react-query-devtools']
        }
      }
    }),
    new HtmlWebpackPlugin({
      isProd: isProduction,
      template: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
      favicon: path.resolve(__dirname, '..', '..', 'public', 'favicon.ico'),
    }),
    
    new webpack.DefinePlugin({
      'process.env.PROJECT_VERSION': JSON.stringify(process.env.npm_package_version)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESlintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    })
  ]
}