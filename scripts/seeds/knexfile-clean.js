const config = require('../../db/knexfile.js');
module.exports = {

  development: Object.assign(
    {
      seeds: {
        directory: './clean',
      },
    },
    config.development
  ),

  test: Object.assign(
    {
      seeds: {
        directory: './clean',
      },
    },
    config.test
  ),

  production: Object.assign(
    {
      seeds: {
        directory: './clean',
      },
    },
    config.production
  ),
};
