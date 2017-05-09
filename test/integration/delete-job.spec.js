const h = require('./support/integration-spec-helper');
const expect = require('chai').expect;

describe('Delete job', () => {
  const job = h.sampleJob({
    accountId: '48c13075-571d-4b9a-8a36-20efd3357b4c',
    title: 'Graffiti artist',
    id: 101,
  });


  beforeEach(function () {
    return h.cleanDb()
      .then(() => h.createJobsInDb([job]))
      .then(() => h.updateJobPage.visit(job.accountId, job));
  });

  it('should show confirmation screen', function () {
    return h.updateJobPage.deleteJob()
      .then(() => expect(h.confirmationPage.getDescription()).to.equal(`${job.title} removed`));
  });

  it('should not display deleted job on dashboard', function () {
    return h.updateJobPage.deleteJob(job)
      .then(() => h.confirmationPage.clickBack())
      .then(() => expect(h.dashboardPage.jobList()).to.equal(''));
  });

  describe('validate DELETE /:accountId/jobs/:jobId', () => {
    [
      { jobId: job.id, statusCode: 302 },
      { jobId: 'abd', statusCode: 400 },
      { jobId: '0', statusCode: 400 },
      { jobId: '-1', statusCode: 400 },
    ].forEach(s => {
      it(`jobId "${s.jobId}" should return ${s.statusCode}`, () =>
        h.updateJobPage.delete(job.accountId, s.jobId)
          .then(response => {
            expect(response.status).to.equal(s.statusCode);
          })
      );
    });
  });
});

