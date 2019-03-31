// Import smaller configuration files
import { esri } from 'config/esri.config';
import { appConfig } from './app.config.js';

// let appConfig = null;
// require.ensure([], function() {
//   appConfig = require('./app.config');
// });

const config = {
  esri,
  appConfig
};

export default config;
