const knexCleaner = require('knex-cleaner');
const knex = require('../../../app/db').knex;
const moment = require('moment');
const sampleJob = {
  accountId: 'c8330c1f-23f5-4577-943d-151d059af588',
  title: 'Organ Grinder',
  employer: 'Monkey',
  created_at: moment(),
  updated_at: moment(),
  sourceType: 'online',
  sourceUrl: 'http://www.stuff.com',
  rating: '1',
  status: 'applied',
  applicationDate: '2017-01-30',
  status_sort_index: 1,
};

module.exports = {
  cleanDb() {
    return knexCleaner.clean(knex, { ignoreTables: ['knex_migrations'] });
  },
  createJobsInDb(jobs) {
    return knex('jobs').insert(jobs);
  },
  sampleJob(job) {
    return Object.assign({}, sampleJob, job);
  },
  findJobInDb(accountId) {
    return knex('jobs').first().where('accountId', accountId);
  },

  findJobInDbById(jobId) {
    return knex('jobs').first().where('id', jobId);
  },

  runDbMigration(fileName) {
    // eslint-disable-next-line global-require
    return require(`../../../db/migrations/${fileName}`).up(knex);
  },

  rollbackDbMigration(fileName) {
    // eslint-disable-next-line global-require
    return require(`../../../db/migrations/${fileName}`).down(knex);
  },
};
