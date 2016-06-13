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
    deadline: new Date('2050-10-10'),
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
      expect(dashboardPage.getJobProgressionStatus(savedJob)).to.equal('Applied'));

    it('should display deadline', () =>
      expect(dashboardPage.getDeadline(savedJob)).to.equal('10th October 2050'));

    it('should display interest level', () =>
      expect(dashboardPage.getInterestLevel(savedJob)).to.equal('4'));

    it('should display where you find the role for online option');
    it('should display where you find the role for in person option');
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
  describe('should sort job list', () => {
    const createJob = (attributes) =>
      new JobsModel(Object.assign({}, jobData, attributes)).save();

    beforeEach(function () {
      return helper.cleanDb()
        .then(() => createJob({ title: 'Beginning' }))
        .then(() => createJob({ title: 'Middle' }))
        .then(() => createJob({ title: 'End' }));
    });

    it('should sort jobs by default if sort empty', () =>
      dashboardPage.sort(accountId, '')
        .then(() => expect(dashboardPage.jobList()).to.eql('BeginningMiddleEnd')));

    it('should sort jobs by creation date by default', () =>
      dashboardPage.visit(accountId)
        .then(() => expect(dashboardPage.jobList()).to.eql('BeginningMiddleEnd')));

    it('should sort jobs by last updated date', () =>
      dashboardPage.sort(accountId, 'updated')
        .then(() => expect(dashboardPage.jobList()).to.eql('EndMiddleBeginning')));

    it('should sort jobs by alphabet', () =>
      dashboardPage.sort(accountId, 'alpha')
        .then(() => expect(dashboardPage.jobList()).to.eql('BeginningEndMiddle')));
  });
});
