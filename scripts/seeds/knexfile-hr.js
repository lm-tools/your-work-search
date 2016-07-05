const config = require('../../db/knexfile.js');
module.exports = {

  development: Object.assign(
    {
      seeds: {
        directory: './hr',
      },
    },
    config.development
  ),

  test: Object.assign(
    {
      seeds: {
        directory: './hr',
      },
    },
    config.test
  ),

  production: Object.assign(
    {
      seeds: {
        directory: './hr',
      },
    },
    config.production
  ),
};
