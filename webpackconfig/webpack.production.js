const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// TODO: uglifyjs-webpack-plugin, compression-webpack-plugin

// Webpack configuration for production
module.exports = (PATHS) => {
  return merge([
    {
      // For each entry point, webpack will begin to create it's dependency graph starting at the entries defined
      entry: [
        path.join(PATHS.src, 'main')
      ],
    },

    // Load Sass, extract CSS to file
    parts.extractCSS({ include: PATHS.app, use: ['css-loader', parts.autoprefix(), 'sass-loader' ]}),

    // Load Images
    parts.loadImages({
      include: PATHS.app,
      options: {
        limit: 15000,
        name: '[name].[ext]',
      },
    }),

    // Source Maps
    parts.generateSourceMaps({ type: 'source-map' }),

    // Clean build
    parts.clean(PATHS.build),

    // Uglify JavaScript
    parts.uglifyJavaScript(),

    {
      mode: 'production',
      plugins: [
        new webpack.DefinePlugin(
          { 'process.env': {
            'NODE_ENV': '"production"',
          },
          }
        ),
        new webpack.HashedModuleIdsPlugin(),
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|html|css)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      ],
    },
  ]);
};
