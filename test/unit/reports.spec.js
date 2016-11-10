const chai = require('chai');
const expect = chai.expect;

const knex = require('../../app/db').knex;
const reports = require('../../db/reports.js');

describe('Reports', function () {
  describe('Metrics', function () {
    before(function () {
      return knex.seed.run({ directory: './db/seeds/two-jobs-updated-over-a-week-ago' });
    });

    it('should return total saved jobs per account', function () {
      reports.getTotalSavedJobs()
        .then((result) => {
          expect(result).to.contain('interventionRef,totalSaved\nFILTER,2\n');
        });
    });
  });
});

