const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    portfolio: './src/portfolio/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js/')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractText.extract({
          use: 'css-loader!sass-loader',
          fallback: 'style-loader?importLoaders=1'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractText.extract({
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
      }
    ]
  },
  plugins: [
    new ExtractText('./../css/styles.css')
  ],
  externals: {
    async: 'commonjs async'
  }
}