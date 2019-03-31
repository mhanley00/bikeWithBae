module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      require('@babel/plugin-syntax-dynamic-import'),
      [require('@babel/plugin-proposal-decorators'), { 'legacy': true }],
      [require('@babel/plugin-proposal-class-properties'), { 'loose': false }],
      require('react-hot-loader/babel')
    ],
    presets: [
      '@babel/preset-env',
      '@babel/react'
    ],
  };
};
