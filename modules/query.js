'use strict';

const athena = require('athena-client');
const Table = require('cli-table2');
const LINE_CHAR_LIMIT = 100;
const ROW_LIMIT = 50;

const awsConfig = {
  region: 'ap-northeast-1'
};

const clientConfig = {
  bucketUri: 's3://aws-athena-query-results-kkbox-test-api-io'
};

class QueryModule {
  constructor (vorpal) {
    this.awsConfig = {};
    this.clientConfig = {};
    this.vorpal = vorpal;
  }
  async execute (args) {
    try {
      const query = args.query;
      if (!query) {
        console.log('The query is empty.');
        return;
      }

      console.log('wait ......');
      const client = athena.createClient(clientConfig, awsConfig);
      const result = await fetchDataFromS3(client, query);
      await showResult(result);
    } catch (error) {
      console.error(error);
    }
  }
}

async function showResult (datas) {
  const headers = Object.keys(datas[0]);
  const table = new Table({ head: headers });
  datas.length = ROW_LIMIT;

  datas.forEach(data => {
    let row = [];
    Object.keys(data).forEach((key, value) => {
      if (data[key].length > LINE_CHAR_LIMIT) {
        row.push(formatLongString(data[key]));
        return;
      }
      row.push(data[key]);
    });
    table.push(row);
  });

  console.log(table.toString());
}

async function fetchDataFromS3 (client, query) {
  return new Promise((resolve, reject) => {
    client.execute(query, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.records);
    });
  });
}

function formatLongString (str) {
  const rows = Math.ceil(str.length / LINE_CHAR_LIMIT);
  let res = '';
  for (let i = 0; i < rows; i++) {
    res += str.slice(i * LINE_CHAR_LIMIT, (i + 1) * LINE_CHAR_LIMIT) + '\n';
  }
  return res;
}

module.exports = QueryModule;
