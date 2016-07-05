const config = require('../../db/knexfile.js');
module.exports = {

  development: Object.assign(
    {
      seeds: {
        directory: './test',
      },
    },
    config.development
  ),

  test: Object.assign(
    {
      seeds: {
        directory: './test',
      },
    },
    config.test
  ),

  production: Object.assign(
    {
      seeds: {
        directory: './test',
      },
    },
    config.production
  ),
};
