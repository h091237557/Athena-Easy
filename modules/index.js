
const MODULE_CONFIGS = [
  {
    'name': 'init',
    'describe': 'Init default config',
    'parameters': [],
    'class': require('./init')
  },
  {
    'name': 'query',
    'describe': 'query data from s3 by Athena',
    'parameters': ['query'],
    'class': require('./query')
  }
];

module.exports = MODULE_CONFIGS;
