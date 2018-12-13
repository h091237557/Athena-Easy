'use strict';

const fs = require('fs');
const path = require('path');

class EnvAddModule {
  constructor (vorpal) {
    this.config = {};
    this.vorpal = vorpal;
  }
  async execute (args) {
    try {
      console.log('Add a new envirement config.');
      await this._showNameQuestion();
      await this._showProfileQuestion();
      await this._showResultBucketQuestion();
      await this._showRegionQuestion();

      const isSave = await this._showSaveQuestion();
      if (!isSave) return;

      await this._setToConfig();
      console.log('done');
    } catch (error) {
      console.error(error);
    }
  }
  async _showNameQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'input',
          name: 'name',
          message: 'Setting your envirement name: '
        });
        this.config.name = ans.name;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
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

  async _showResultBucketQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'input',
          name: 'bucket',
          message: 'Setting your result bucket: '
        });
        this.config.bucket = ans.bucket;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async _showRegionQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'input',
          name: 'region',
          message: 'Setting your region: '
        });
        this.config.region = ans.region;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async _showSaveQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'confirm',
          name: 'isSave',
          message: `Are you want to save the config ? \n ${JSON.stringify(this.config, null, 4)} \n`
        });
        resolve(ans.isSave);
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

  async _setToConfig () {
    const config = {
      'name': this.config.name,
      'profile': this.config.profile,
      'result_bucket': this.config.bucket,
      'region': this.config.region
    };

    fs.writeFileSync(path.resolve(__dirname, `../configs/${this.config.name}-config.json`), JSON.stringify(config, null, 4));
  }
}

module.exports = EnvAddModule;
