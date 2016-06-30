const helper = require('./integration-spec-helper');
const DashboardPage = require('../common/page_objects/dashboard-page');
const dashboardPage = new DashboardPage(helper.browser);
const expect = require('chai').expect;
const JobsModel = require('../../app/models/jobs-model');
const uuid = require('node-uuid');
const knex = require('../../app/db').knex;

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
  describe('sort job list', () => {
    const SEED_ACCOUNT_ID = 'c8330c1f-23f5-4577-943d-151d059af588';

    before(function () {
      return knex.seed.run({ directory: './db/seeds/sort_and_filter' });
    });

    it('should sort jobs by default if sort empty', () =>
      dashboardPage.sort(SEED_ACCOUNT_ID, '')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GrocerGoalkeeperRoundabout OperatorOrgan Grinder'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('date added')));

    it('should sort jobs by creation date by default', () =>
      dashboardPage.visit(SEED_ACCOUNT_ID)
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GrocerGoalkeeperRoundabout OperatorOrgan Grinder'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('date added')));

    it('should sort jobs by last updated date', () =>
      dashboardPage.sort(SEED_ACCOUNT_ID, 'updated')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperGrocerRoundabout OperatorOrgan Grinder'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('date updated')));

    it('should sort jobs by title', () =>
      dashboardPage.sort(SEED_ACCOUNT_ID, 'title')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperGrocerOrgan GrinderRoundabout Operator'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('job title')));

    it('should sort jobs by deadline date', () =>
      dashboardPage.sort(SEED_ACCOUNT_ID, 'deadline')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GrocerRoundabout OperatorGoalkeeperOrgan Grinder'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('deadline date')));

    it('should sort jobs by employer', () =>
      dashboardPage.sort(SEED_ACCOUNT_ID, 'employer')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GrocerGoalkeeperOrgan GrinderRoundabout Operator'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('employer')));

    it('should sort jobs by status', () =>
      dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperGrocerOrgan GrinderRoundabout Operator'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('status')));

    it('should maintain the status sort order', function () {
      this.timeout(4 * 1000); // 4s
      return dashboardPage.visit(SEED_ACCOUNT_ID)
        .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '100' }, 'result'))
        .then(() => dashboardPage.clickJobDetailsButton({ id: '101' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '101' }, 'interview'))
        .then(() => dashboardPage.clickJobDetailsButton({ id: '102' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '102' }, 'applied'))
        .then(() => dashboardPage.clickJobDetailsButton({ id: '103' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '103' }, 'interested'))
        .then(() => dashboardPage.sort(SEED_ACCOUNT_ID, 'status'))
        .then(() => expect(dashboardPage.jobList())
          .to.eql('Organ GrinderRoundabout OperatorGoalkeeperGrocer'));
    });

    it('should maintain selected sort after status update', function () {
      return dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
        .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '100' }, 'result'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('status'));
    });
  });
  describe('update job', () => {
    let savedJob;

    const createJob = (attributes) =>
      new JobsModel(Object.assign({}, jobData, attributes)).save();

    describe('status', () => {
      before(function () {
        return helper.cleanDb()
          .then(() => createJob())
          .then((job) => { savedJob = job; });
      });

      it('should update the status', () =>
        dashboardPage.visit(accountId)
          .then(() => dashboardPage.clickJobDetailsButton(savedJob))
          .then(() => dashboardPage.submitJobProgressionStatus(savedJob, 'result'))
          .then(() => expect(dashboardPage.getJobProgressionStatus(savedJob)).to.equal('Result'))
        );
    });
  });
});
