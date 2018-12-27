const path = require('path');

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitError: true,
              emitWarning: true,
            },
          },
        ],
      },
    ],
  },
};
