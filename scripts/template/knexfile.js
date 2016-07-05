const config = require('../../db/knexfile.js');
module.exports = {

  development: Object.assign(
    {
      seeds: {
        directory: './-dir-',
      },
    },
    config.development
  ),

  test: Object.assign(
    {
      seeds: {
        directory: './-dir-',
      },
    },
    config.test
  ),

  production: Object.assign(
    {
      seeds: {
        directory: './-dir-',
      },
    },
    config.production
  ),
};
