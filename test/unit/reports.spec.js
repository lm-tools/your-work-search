const { expect } = require('chai');
const { describe, it } = require('mocha');

const { knex } = require('../../app/db');
const reports = require('../../db/reports.js');

describe('Reports', function () {
  describe('Metrics', function () {
    before(() => knex.seed.run({ directory: './db/seeds/reports-total-saved-jobs' }));

    it('should return job stats for each interventionRef (accountId)', () =>
      reports.getTotalSavedJobs()
        .then(result => {
          expect(result).to.contain('interventionRef,total_interested,total_applied,' +
            'total_interview,total_failure,total_success,total_interested_with_deadline,' +
            'total_1_star,total_2_star,total_3_star,total_4_star,total_5_star,' +
            'totalSaved\n');
          expect(result).to.contain('\nFILTER,2,1,1,1,1,1,2,1,0,0,1,6\n');
          expect(result).to.contain('\nRANDO,0,0,0,0,0,0,0,0,0,0,0,1\n');
          expect(result.split('\n').length).to.equal(4);
        })
    );
  });
});

