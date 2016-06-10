const helper = require('./integrationSpecHelper');
const DashboardPage = require('../common/page_objects/DashboardPage');
const dashboardPage = new DashboardPage(helper.browser);
const expect = require('chai').expect;
const JobsModel = require('../../app/models/jobs-model');
const uuid = require('node-uuid');

describe('Dashboard', () => {
  const accountId = uuid.v4();
  const jobData = {
    title: 'Test job',
    employer: 'Test employer',
    sourceType: 'online',
    sourceUrl: 'http://example.org',
    rating: 4,
    deadline: new Date(),
    status: 'applied',
    accountId,
  };

  describe('display all the details of a job', () => {
    let savedJob;

    before(function () {
      return helper.cleanDb()
        .then(() => new JobsModel(jobData).save())
        .then(job => {
          savedJob = job;
        })
        .then(() => dashboardPage.visit(accountId));
    });

    it('should display title', () =>
      expect(dashboardPage.getTitle(savedJob)).to.equal(jobData.title));

    it('should display employer', () =>
      expect(dashboardPage.getEmployer(savedJob)).to.equal(jobData.employer));

    it('should display progress', () =>
      expect(dashboardPage.getSelectedProgressionStatus(savedJob)).to.equal(jobData.status));

    it('should display current status', () =>
      expect(dashboardPage.getJobProgressionStatus(savedJob)).to.equal(jobData.status));
  });
  describe('display my jobs', () => {
    beforeEach(function () {
      return helper.cleanDb();
    });

    const createJob = (attributes) =>
      new JobsModel(Object.assign({}, jobData, attributes)).save();

    it('should display details of all my jobs', () =>
      Promise
        .all([1, 2, 3]
          .map(i => createJob({ title: `Random title ${i}` }))
        )
        .then(() => dashboardPage.visit(accountId))
        .then(() => expect(dashboardPage.jobCount()).to.equal(3)));

    it('should not show jobs from other accounts', () =>
      createJob({ accountId: uuid.v4() })
        .then(() => dashboardPage.visit(accountId))
        .then(() => expect(dashboardPage.jobCount()).to.equal(0)));
  });
});
