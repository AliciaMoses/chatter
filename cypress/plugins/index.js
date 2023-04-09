const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', webpack({
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      }
    },
    watchOptions: {}
  }));
};
