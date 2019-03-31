const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

// Webpack configuration for development
module.exports = (PATHS) => {
  return merge([
    parts.devServer({
      host: process.env.HOST,
    }),

    {
      entry: [
        'react-hot-loader/patch',
        path.join(PATHS.src, 'main')
      ],
    },

    // Load Sass Module
    parts.loadSass({ include: PATHS.app }),

    // Load Images
    parts.loadImages(),

    // Source Maps
    {
      mode: 'development',
      output: {
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
      },

      plugins: [
        // HMR
        new webpack.HotModuleReplacementPlugin()
      ]
    },
    parts.generateSourceMaps({ type: 'cheap-module-eval-source-map'}),
  ]);
};
