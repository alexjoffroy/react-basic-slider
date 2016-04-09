var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test:   /\.js/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test:   /\.scss/,
        loaders: ['style', 'css', 'postcss', 'sass'],
        exclude: /node_modules/
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}

