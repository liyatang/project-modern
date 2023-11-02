const path = require('path');
const sh = require('shelljs');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const rootPath = process.cwd();
const buildPath = path.resolve(rootPath, 'build');
const publicPath = path.resolve(rootPath, 'public');
const srcPath = path.resolve(rootPath, 'src');
const srcIndexPath = path.resolve(rootPath, 'src/index');
const indexTemplatePath = path.resolve(rootPath, 'src/index.html');
const packagesPath = path.resolve(rootPath, 'packages');

const PATH = {
  rootPath,
  buildPath,
  srcPath,
  srcIndexPath,
  publicPath,
  indexTemplatePath,
  packagesPath,
};

function shellExec(com) {
  if (sh.exec(com).code !== 0) {
    sh.exit(1);
  }
}

module.exports = {
  PATH,
  shellExec,
  isEnvDevelopment,
  isEnvProduction,
};
