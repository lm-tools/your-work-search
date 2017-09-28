const { expect } = require('chai');
const { describe, it } = require('mocha');

const { knex } = require('../../app/db');
const reports = require('../../db/reports.js');

describe('Reports', function () {
  describe('Metrics', function () {
    before(function () {
      return knex.seed.run({ directory: './db/seeds/reports-total-saved-jobs' });
    });

    it('should return count of job statuses per account', () =>
      reports.getTotalSavedJobs()
        .then(result => {
          expect(result).to.contain('interventionRef,total_interested,total_applied,' +
            'total_interview,total_failure,total_success,total_interested_with_deadline,' +
            'totalSaved\n');
          expect(result).to.contain('\nFILTER,2,1,1,1,1,1,6\n');
          expect(result).to.contain('\nRANDO,0,0,0,0,0,0,1\n');
          expect(result.split('\n').length).to.equal(4);
        })
    );
  });
});

