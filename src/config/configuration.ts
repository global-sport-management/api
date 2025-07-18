import { merge } from 'lodash';
import { defaultConfig } from './default.config';

let envConfig = {};
try {
  envConfig = require(`./${process.env.ENVIRONMENT}.config`).configuration;
} catch (e) { }
const results = merge(defaultConfig, envConfig, process.env);

export default results;
