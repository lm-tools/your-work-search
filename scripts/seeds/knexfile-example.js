const config = require('../../db/knexfile.js');
module.exports = {

  development: Object.assign(
    {
      seeds: {
        directory: './example',
      },
    },
    config.development
  ),

  test: Object.assign(
    {
      seeds: {
        directory: './example',
      },
    },
    config.test
  ),

  production: Object.assign(
    {
      seeds: {
        directory: './example',
      },
    },
    config.production
  ),
};
