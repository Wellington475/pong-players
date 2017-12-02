const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output : {
    path: path.resolve(__dirname, './public/js'),
    filename: 'game.min.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]
}
