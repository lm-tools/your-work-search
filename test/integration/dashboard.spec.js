require('./integrationSpecHelper');
const Zombie = require('zombie');
const DashboardPage = require('../common/page_objects/DashboardPage');
const dashboardPage = new DashboardPage(new Zombie());
const expect = require('chai').expect;
const JobsModel = require('../../app/models/jobs-model');
const uuid = require('node-uuid');

describe('Dashboard', () => {
  describe('display all the details of a job', () => {
    const accountId = uuid.v4();
    const jobData = {
      title: 'Test job',
      employer: 'Test employer',
      sourceType: 'online',
      sourceUrl: 'http://example.org',
      rating: '4',
      deadline: '20/10/2016',
      accountId,
    };
    let savedJob;

    before(() => new JobsModel(jobData).save()
      .then(job => { savedJob = job; })
      .then(() => dashboardPage.visit(accountId))
    );

    it('should display title', () =>
      expect(dashboardPage.getTitle(savedJob)).to.equal(jobData.title));

    it('should display employer');
    it('should display progress');
    it('should display current status');
  });

  it('should display details of all my jobs');

  describe('display only my jobs', () => {
    it('should not show jobs from other accounts');
  });
});
