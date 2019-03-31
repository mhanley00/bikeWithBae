const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

// Webpack Dev Server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    // Bundle information returned by the devServer
    stats: { colors: true },

    // Overlay in browser
    overlay: {
      errors: true,
      warnings: true,
    },

    hot: true,

    // If using existing index.html file use contentBase property
    // contentBase: PATHS.build

    // If using Docker set host: options.host || '0.0.0.0'
    host,
    port,
  },
});

// ESLint Loader
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js?x$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          babelrc: true,
          cacheDirectory: true,
        },
      },
    ],
  },
});

exports.uglifyJavaScript = () => ({
  plugins: [
    new UglifyJsWebpackPlugin({ sourceMap: true }),
  ],
});

// SASS Loader
exports.loadSass = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,

        // Steps: Compile Sass to CSS, translate CSS into CommonJS, create style nodes
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use } = {}) => {
  // Output extracted css to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].[hash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,

          use: plugin.extract({
            use: use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,

        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

exports.clean = (path) => ({
  plugins: [ new CleanWebpackPlugin([path])],
});

exports.copy = (paths) => ({
  plugins: [ new CopyWebpackPlugin(paths) ],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
});
