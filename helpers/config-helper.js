'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  getAllConfig: () => {
    const configsFile = fs.readdirSync(path.resolve(__dirname, '../configs/')).filter((file) => {
      return (file !== 'index.js' && file !== 'default-use.json');
    });
    let configs = [];
    configsFile.forEach((name) => {
      let config = require(`../configs/${name}`);
      configs.push(config);
    });
    return configs;
  }
};
