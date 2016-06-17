const helper = require('./integration-spec-helper');
const DashboardPage = require('../common/page_objects/dashboard-page');
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
    status_sort_index: 0,
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
      expect(dashboardPage.getInterestLevel(savedJob)).to.equal(`${jobData.rating}`));

    it('should display where you find the role', () =>
      expect(dashboardPage.getJobSource(savedJob)).to.equal(jobData.sourceUrl));

    it('should hide job details by default', () =>
      expect(dashboardPage.isJobDetailsVisible(savedJob))
        .to.equal(false, 'Job details should be hidden'));

    it('should show job details when details button clicked', () => {
      dashboardPage.clickJobDetailsButton(savedJob);
      expect(dashboardPage.isJobDetailsVisible(savedJob))
        .to.equal(true, 'Job details should be visible');
    });
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
        .then(() => createJob({ title: 'Beginning', deadline: '2016-10-20',
          employer: 'C', status: 'interview', status_sort_index: 2 }))
        .then(() => createJob({ title: 'Middle', deadline: '2016-10-19',
          employer: 'B', status: 'interested', status_sort_index: 0 }))
        .then(() => createJob({ title: 'End', deadline: '2016-10-18',
          employer: 'A', status: 'applied', status_sort_index: 1 }));
    });

    it('should sort jobs by default if sort empty', () =>
      dashboardPage.sort(accountId, '')
        .then(() => expect(dashboardPage.jobList()).to.eql('BeginningMiddleEnd'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('date added')));

    it('should sort jobs by creation date by default', () =>
      dashboardPage.visit(accountId)
        .then(() => expect(dashboardPage.jobList()).to.eql('BeginningMiddleEnd'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('date added')));

    it('should sort jobs by last updated date', () =>
      dashboardPage.sort(accountId, 'updated')
        .then(() => expect(dashboardPage.jobList()).to.eql('EndMiddleBeginning'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('date updated')));

    it('should sort jobs by title', () =>
      dashboardPage.sort(accountId, 'title')
        .then(() => expect(dashboardPage.jobList()).to.eql('BeginningEndMiddle'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('job title')));

    it('should sort jobs by deadline date', () =>
      dashboardPage.sort(accountId, 'deadline')
        .then(() => expect(dashboardPage.jobList()).to.eql('EndMiddleBeginning'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('deadline date')));

    it('should sort jobs by status', () =>
      dashboardPage.sort(accountId, 'status')
        .then(() => expect(dashboardPage.jobList()).to.eql('MiddleEndBeginning'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('status')));

    it('should sort jobs by employer', () =>
      dashboardPage.sort(accountId, 'employer')
        .then(() => expect(dashboardPage.jobList()).to.eql('EndMiddleBeginning'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('employer')));
  });
});
