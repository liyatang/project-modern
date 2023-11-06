const { merge } = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const { isFunction } = require('lodash');

function mergeProjectWebpackConfig(originConfig) {
  const webpackConfigPath = path.resolve(process.cwd(), './webpack.config.js');

  let config = originConfig;

  if (fs.existsSync(webpackConfigPath)) {
    console.log('find project webpack.config.js, will be merge');
    const module = require(webpackConfigPath);

    if (isFunction(module)) {
      config = module(config);
    } else {
      config = merge(config, module);
    }
  }

  return config;
}

module.exports = { mergeProjectWebpackConfig };
