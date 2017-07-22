const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const GlobalStyle = new ExtractText('./../css/[name].global.styles.css');
const PageStyle = new ExtractText('./../css/[name].styles.css');
const UglifyJS = require('uglifyjs-webpack-plugin');

const CommonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  minChunks: 2,
  chunks: ['portfolio', 'home', 'art']
})

module.exports = {
  entry: {
    portfolio: './src/portfolio/index.js',
    home: './src/home/index.js',
    art: './src/art/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js/')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: GlobalStyle.extract({
          use: 'css-loader!sass-loader',
          fallback: 'style-loader?importLoaders=1'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: PageStyle.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    GlobalStyle,
    PageStyle,
    CommonsPlugin,
    new UglifyJS()
  ],
  externals: {
    async: 'commonjs async'
  }
}