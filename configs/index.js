const fs = require('fs');

// module.exports = () => {
module.exports = () => {
  const configFiles = fs.readdirSync(`${__dirname}/`).filter((config) => (config !== 'index.js'));
  let configs = {};
  configFiles.forEach((name) => {
    let config = require(`./${name}`);
    configs[`${config.name}`] = config;
  });
  return configs;
};
