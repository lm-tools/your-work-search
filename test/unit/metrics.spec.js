const childProcess = require('child_process');
const path = require('path');
const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect = chai.expect;
const Converter = require('csvtojson').Converter;

const knex = require('../../app/db').knex;
const fetchMetricsScript = path.join(__dirname, '..', '..', 'scripts/fetch-metrics.js');

describe('Metrics', function () {
  let result;

  const expectedResult = [
    { interventionRef: 'ACCOUNT-A', totalSaved: 2 },
    { interventionRef: 'ACCOUNT-B', totalSaved: 1 },
    { interventionRef: 'ACCOUNT-C', totalSaved: 3 },
  ];

  before(() =>
    knex.seed.run({ directory: './db/seeds/multiple-jobs-for-multiple-accounts' })
      .then(() => {
        result = childProcess.spawnSync(fetchMetricsScript);
      })
  );

  it('should output expected result', function (done) {
    const converter = new Converter({});
    converter.fromString(result.stdout.toString(), (err, resultAsJSON) => {
      expect(resultAsJSON).to.contain(expectedResult[0]);
      expect(resultAsJSON).to.contain(expectedResult[1]);
      expect(resultAsJSON).to.contain(expectedResult[2]);
      done();
    });
  });
});

