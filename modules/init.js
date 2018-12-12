'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');

class InitModule {
  constructor (vorpal) {
    this.vorpal = vorpal;
    this.config = {};
  }

  async execute (args) {
    try {
      console.log('Please Setting default envirement.');
      await this._showRegionQuestion();
      await this._showResultStoreQuestion();
      await this._setToConfig();
    } catch (error) {
      console.error(error);
    }
  }

  async _showRegionQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'input',
          name: 'region',
          message: 'Setting your default region: '
        });
        this.config.region = ans.region;
        console.log(this.config.region);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async _showResultStoreQuestion () {
    return new Promise(async (resolve, reject) => {
      try {
        const ans = await this._showQuestionAndReturnAns({
          type: 'input',
          name: 'bucket',
          message: 'Setting your default s3 bucket of result: '
        });

        const bucket = ans.bucket.split('://')[1];
        if (!await checkBucketExists(bucket)) {
          console.log('The bucket is not exist');
        }
        this.config.result_bucket = bucket;
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

  async _setToConfig () {
    const config = {
      'name': 'default',
      'profile': 'default',
      'result_bucket': this.config.result_bucket,
      'region': this.config.region
    };

    fs.writeFileSync(`./configs/defulat-config.json`, JSON.stringify(config, null, 4));
  }
}

async function checkBucketExists (bucket) {
  const s3 = new AWS.S3();
  const options = {
    Bucket: bucket
  };
  try {
    await s3.headBucket(options).promise();
    return true;
  } catch (error) {
    if (error.statusCode === 404) {
      return false;
    }
    throw error;
  }
}

module.exports = InitModule;
