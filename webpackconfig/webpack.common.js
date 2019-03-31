const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Common webpack configuration for both development and production
module.exports = (PATHS, env) => {
  return merge([
    {
      // Where webpack will write my compiled files
      output: {
        path: PATHS.build,
        filename: '[name].[hash].js',
        libraryTarget: 'amd',
      },

      resolve: {
        alias: {
          components: path.join(PATHS.src, 'components'),
          config: path.join(PATHS.src, 'config'),
          constants: path.join(PATHS.src, 'constants'),
          middlewares: path.join(PATHS.src, 'middlewares'),
          reducers: path.join(PATHS.src, 'reducers'),
          store: path.join(PATHS.src, 'store'),
          styles: path.join(PATHS.src, 'styles'),
          utils: path.join(PATHS.src, 'utils'),
        },
      },

      externals: [
        // Handles Dojo/ArcGIS JS API requests
        function (context, request, callback) {
          if (/^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request)) {
            callback(null, 'amd ' + request);
          } else {
            callback();
          }
        },
      ],

      plugins: [
        // Pass the correct ENV to the application
        new webpack.DefinePlugin({
          ENV: JSON.stringify(env)
        }),
        // Enable Progress Feedback
        new webpack.ProgressPlugin(),
        // Simplifies creation of HTML file
        new HtmlWebpackPlugin({
          title: 'Awesome Project',
          template: path.join(PATHS.src, '/index.html'),
          inject: false,
          hash: false,
        }),
      ],
    },

    // Lint JavaScript Module
    parts.lintJavaScript({
      include: PATHS.src,
      options: {
        emitWarning: true,
      },
    }),

    // Transpile JavaScript
    parts.loadJavaScript({ include: PATHS.src }),

  ]);
};
