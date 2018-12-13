
const MODULE_CONFIGS = [
  {
    'command': 'init',
    'describe': 'Init default config',
    'parameters': [],
    'class': require('./init')
  },
  {
    'command': 'query',
    'describe': 'Query data from s3 by Athena',
    'parameters': ['query'],
    'class': require('./query')
  },
  {
    'command': 'env-add',
    'describe': 'Add a new envirement',
    'parameters': [],
    'class': require('./env-add')
  },
  {
    'command': 'env-ls',
    'describe': 'Show all envirement',
    'parameters': [],
    'class': require('./env-ls')
  },
  {
    'command': 'env-use',
    'describe': 'Select default use envirement',
    'parameters': [],
    'class': require('./env-use')
  }
];

module.exports = MODULE_CONFIGS;
