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
      .then(() => h.dashboardPage.visit(job.accountId));
  });

  it('should show confirmation screen', function () {
    return h.dashboardPage.deleteJob(job)
      .then(() => expect(h.confirmationPage.getDescription()).to.equal(`${job.title} removed`));
  });

  it('should not display deleted job on dashboard', function () {
    return h.dashboardPage.deleteJob(job)
      .then(() => h.confirmationPage.clickBack())
      .then(() => expect(h.dashboardPage.jobList()).to.equal(''));
  });
});

