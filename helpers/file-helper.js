'use strict';
const fs = require('fs');

module.exports = {
  readJsonFile: (path) => {
    try {
      const file = fs.readFileSync(path, 'utf8');
      return JSON.parse(file);
    } catch (error) {
      throw error;
    }
  }
};
