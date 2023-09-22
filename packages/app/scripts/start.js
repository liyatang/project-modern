// 设置好环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

const { shellExec } = require('../utils');

shellExec('npx webpack server --color --config ' + require.resolve('../config/webpack.config'));
