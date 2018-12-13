'use strict';

const helper = require('../helpers/config-helper');
const fs = require('fs');
const path = require('path');

class EnvUseModule {
  constructor (vorpal) {
    this.vorpal = vorpal;
  }

  async execute (args) {
    try {
      await this._showConfigsList();
    } catch (error) {
      console.error(error);
    }
  }

  async _showConfigsList () {
    return new Promise(async (resolve, reject) => {
      try {
        const configs = helper.getAllConfig();
        const ans = await this._showQuestionAndReturnAns({
          type: 'list',
          name: 'config',
          message: 'Please select default config ?',
          choices: configs.map((config) => config.name, [])
        });
        this._writeDefaultUse(ans.config);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async _showQuestionAndReturnAns (question) {
    return new Promise((resolve) => {
      this.vorpal.prompt(question, (ans) => {
        resolve(ans);
      });
    });
  }

  async _writeDefaultUse (defaultConfig) {
    const input = {
      'use': defaultConfig
    };
    fs.writeFileSync(path.resolve(__dirname, '../configs/default-use.json'), JSON.stringify(input, null, 4));
  }
}

module.exports = EnvUseModule;
