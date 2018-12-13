'use strict';

const configHelper = require('../helpers/config-helper');
const fileHelper = require('../helpers/file-helper');
const path = require('path');

class ShowAllEnvModule {
  constructor (vorpal) {
    this.vorpal = vorpal;
  }

  async execute (args) {
    try {
      const configs = configHelper.getAllConfig();
      const defaultConfig = fileHelper.readJsonFile(path.resolve(__dirname, '../configs/default-use.json'));
      console.log('\x1b[36m%s\x1b[0m', 'The cyan color config is default use');
      configs.forEach((config) => {
        if (defaultConfig.use === config.name) {
          console.log('\x1b[36m%s\x1b[0m', JSON.stringify(config, null, 4));
          return;
        }
        console.log(JSON.stringify(config, null, 4));
      });
    } catch (error) {
      console.error(error);
    }
  }
  async _showProfileQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'input',
          name: 'profile',
          message: 'Setting your target profile (AWS profile): '
        });
        this.config.profile = ans.profile;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ShowAllEnvModule;
