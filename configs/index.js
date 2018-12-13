const defaultUse = require('./default-use.json');

// module.exports = () => {
module.exports = () => {
  if (!defaultUse) {
    throw new Error('Your have not default use config file');
  }

  const defaultConfig = require(`./${defaultUse.use}-config.json`);

  return defaultConfig;
};
