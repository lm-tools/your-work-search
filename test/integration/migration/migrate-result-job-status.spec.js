const helper = require('../support/integration-spec-helper');
const knex = require('../../../app/db').knex;
const expect = require('chai').expect;

describe('Migrate jobs result status to failure', () => {
  function values(obj) {
    return Object.keys(obj).map(k => obj[k]);
  }

  describe('migrate', () => {
    const jobs = {
      jobResult1: helper.sampleJob({ id: 1, status: 'result' }),
      jobResult2: helper.sampleJob({ id: 2, status: 'result' }),
      jobInterested: helper.sampleJob({ id: 3, status: 'interested' }),
      jobApplied: helper.sampleJob({ id: 4, status: 'applied' }),
      jobInterview: helper.sampleJob({ id: 5, status: 'interview' }),
    };

    before(() =>
      helper.cleanDb()
        .then(() => helper.createJobsInDb(values(jobs)))
        .then(() => helper.runDbMigration('20170314103641_update-result-status.js'))
    );

    it('should migrate jobs in status "result" to status "failure"', () =>
      knex.select()
        .whereIn('id', [jobs.jobResult1.id, jobs.jobResult2.id])
        .table('jobs')
        .then(result => {
          expect(result[0].status).to.equal('failure');
          expect(result[1].status).to.equal('failure');
        })
    );


    [jobs.jobInterested, jobs.jobApplied, jobs.jobInterview]
      .forEach(job => {
        it(`should not migrate jobs in status "${job.status}"`, () =>
          knex.select()
            .where({ id: job.id })
            .table('jobs')
            .then(result => expect(result[0].status).to.equal(job.status))
        );
      });
  });

  describe('rollback', () => {
    const jobs = {
      jobSuccess: helper.sampleJob({ id: 1, status: 'success' }),
      jobFailure: helper.sampleJob({ id: 2, status: 'failure' }),
      jobInterested: helper.sampleJob({ id: 3, status: 'interested' }),
      jobApplied: helper.sampleJob({ id: 4, status: 'applied' }),
      jobInterview: helper.sampleJob({ id: 5, status: 'interview' }),
    };


    before(() =>
      helper.cleanDb()
        .then(() => helper.createJobsInDb(values(jobs)))
        .then(() => helper.rollbackDbMigration('20170314103641_update-result-status.js'))
    );

    [jobs.jobSuccess, jobs.jobFailure].forEach(job => {
      it(`should rollback jobs in status "${job.status}" to status "result"`, () =>
        knex.select()
          .where({ id: job.id })
          .table('jobs')
          .then(result => {
            expect(result[0].status).to.equal('result');
          })
      );
    });

    [jobs.jobInterested, jobs.jobApplied, jobs.jobInterview]
      .forEach(job => {
        it(`should not rollback jobs in status "${job.status}"`, () =>
          knex.select()
            .where({ id: job.id })
            .table('jobs')
            .then(result => expect(result[0].status).to.equal(job.status))
        );
      });
  });
});
