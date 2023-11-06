const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');
const fs = require('fs');
const { PATH } = require('../utils');

function getEnvFiles(mode) {
  return [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`,
  ];
}

const envFiles = getEnvFiles(process.env.NODE_ENV);

const envConfig = {};
envFiles.forEach((file) => {
  const filePath = `${PATH.rootPath}/${file}`;
  if (fs.existsSync(filePath)) {
    const parsed = dotenv.parse(fs.readFileSync(filePath));

    console.log('dotenv', file, parsed);

    Object.assign(envConfig, parsed);
  }
});

console.log('dotenv', envConfig);

expand({ parsed: envConfig });

module.exports = {
  envConfig,
};
