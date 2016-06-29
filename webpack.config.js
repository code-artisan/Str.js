var path = require('path');

module.exports = {
  cache: true,
  entry: './Str.es6',
  module: {
    loaders: [
      {
        test: /\.es6$/,
        loader: 'babel'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'Str.js'
  }
};
