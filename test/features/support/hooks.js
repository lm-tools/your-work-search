const knexCleaner = require('knex-cleaner');
const knex = require('../../../app/db').knex;

module.exports = function () {
  // eslint-disable-next-line new-cap
  this.Before(() => knexCleaner.clean(knex, { ignoreTables: ['knex_migrations'] }));
};
