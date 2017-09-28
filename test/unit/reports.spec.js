const chai = require('chai');
const expect = chai.expect;

const knex = require('../../app/db').knex;
const reports = require('../../db/reports.js');

describe('Reports', function () {
  describe('Metrics', function () {
    before(function () {
      return knex.seed.run({ directory: './db/seeds/reports-total-saved-jobs' });
    });

    it('should return count of job statuses per account', () =>
      reports.getTotalSavedJobs()
        .then(result => {
          expect(result).to.contain('interventionRef,totalinterested,totalapplied,totalinterview,' +
            'totalfailure,totalsuccess,totalSaved\n');
          expect(result).to.contain('\nFILTER,2,1,1,1,1,6\n');
          expect(result).to.contain('\nRANDO,0,0,0,0,0,1\n');
        })
    );
  });
});

