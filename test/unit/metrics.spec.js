const childProcess = require('child_process');
const path = require('path');
const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect = chai.expect;

const knex = require('../../app/db').knex;
const fetchMetricsScript = path.join(__dirname, '..', '..', 'scripts/fetch-metrics.js');

describe('Metrics', function () {
  let result;

  const expectedResult = {
    TotalSavedJobs: [
      { interventionRef: 'ACCOUNT-B', totalSaved: '1' },
      { interventionRef: 'ACCOUNT-A', totalSaved: '2' },
      { interventionRef: 'ACCOUNT-C', totalSaved: '3' },
    ],
  };

  before(() =>
    knex.seed.run({ directory: './db/seeds/multiple-jobs-for-multiple-accounts' })
      .then(() => {
        result = childProcess.spawnSync(fetchMetricsScript);
      })
  );

  it('should count how many jobs have been saved per claimant', function () {
    expect(JSON.parse(result.stdout)).to.have.property('TotalSavedJobs')
      .that.containSubset(expectedResult.TotalSavedJobs);
  });
});

