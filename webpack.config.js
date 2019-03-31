const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpackconfig/webpack.common');
const development = require('./webpackconfig/webpack.development');
const production = require('./webpackconfig/webpack.production');

module.exports = (env) => {
  console.log('Environment:', env);

  // Webpack entry and output paths
  const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
  };

  // Default to development webpack unless production is specified
  if (env === 'production') {
    return merge(common(PATHS, env), production(PATHS));
  } else {
    return merge(common(PATHS, env), development(PATHS));
  }
};
