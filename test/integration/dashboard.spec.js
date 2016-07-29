const helper = require('./support/integration-spec-helper');
const dashboardPage = helper.dashboardPage;
const expect = require('chai').expect;
const JobsModel = require('../../app/models/jobs-model');
const uuid = require('node-uuid');
const knex = require('../../app/db').knex;
const moment = require('moment');

describe('Dashboard', () => {
  const accountId = uuid.v4();
  const expectedDateFormat = 'D MMMM YYYY';
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
    const createJobAndVisitDashboard = (attributes) => {
      let savedJob;
      return helper.cleanDb()
        .then(() => new JobsModel(attributes).save())
        .then(job => { savedJob = job; })
        .then(() => dashboardPage.visit(accountId))
        .then(() => savedJob);
    };

    describe('with all fields specified', () => {
      let savedJob;

      before(() =>
        createJobAndVisitDashboard(jobData)
          .then(job => { savedJob = job; })
      );

      it('should display title', () =>
        expect(dashboardPage.getTitle(savedJob)).to.equal(jobData.title));

      it('should display employer', () =>
        expect(dashboardPage.getEmployer(savedJob)).to.equal(jobData.employer));

      it('should display progress', () =>
        expect(dashboardPage.getSelectedProgressionStatus(savedJob)).to.equal(jobData.status));

      it('should display current status', () =>
        expect(dashboardPage.getJobProgressionStatus(savedJob)).to.equal('Applied'));

      it('should display deadline', () =>
        expect(dashboardPage.getDeadline(savedJob)).to.equal('10 October 2050'));

      it('should display updated', () =>
        expect(dashboardPage.getUpdated(savedJob))
          .to.equal(moment(new Date()).format(expectedDateFormat)));

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

    describe('with some optional fields missing', () => {
      it('should not display where you found ther role, if it was not specified', () => {
        const jobDataWithoutSourceType = Object.assign({}, jobData, { sourceType: null });

        return createJobAndVisitDashboard(jobDataWithoutSourceType)
          .then(savedJob => expect(dashboardPage.hasJobSource(savedJob)).to.be.false);
      });
    });
  });
  describe('display my jobs', () => {
    beforeEach(function () {
      return helper.cleanDb();
    });

    const createJob = (attributes) =>
      new JobsModel(Object.assign({}, jobData, attributes)).save();

    it('should not display sort or filter when zero jobs', () =>
      dashboardPage.visit(accountId)
      .then(() => expect(dashboardPage.isSortVisible()).to.be.false)
      .then(() => expect(dashboardPage.isFilterVisible()).to.be.false));

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
      return dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
        .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '100' }, 'result'))
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperOrgan GrinderGrocerRoundabout Operator'));
    });

    it('should maintain selected sort after status update', function () {
      return dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
        .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
        .then(() => dashboardPage.submitJobProgressionStatus({ id: '100' }, 'result'))
        .then(() => expect(dashboardPage.selectedSortType()).to.equal('status'));
    });
  });
  describe('filter job list', () => {
    const SEED_ACCOUNT_ID = 'c8330c1f-23f5-4577-943d-151d059af588';

    before(function () {
      return knex.seed.run({ directory: './db/seeds/sort_and_filter' });
    });

    it('should filter jobs updated in the last week', () =>
      dashboardPage.sortAndFilter(SEED_ACCOUNT_ID, 'updated', 'week')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('Goalkeeper'))
        .then(() => expect(dashboardPage.selectedFilterType()).to.equal('updated past week')));

    it('should filter jobs updated in the last fortnight', () =>
      dashboardPage.sortAndFilter(SEED_ACCOUNT_ID, 'updated', 'fortnight')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperGrocer'))
        .then(() => expect(dashboardPage.selectedFilterType()).to.equal('updated past 2 weeks')));

    it('should filter jobs updated in the last month', () =>
      dashboardPage.sortAndFilter(SEED_ACCOUNT_ID, 'updated', 'month')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperGrocerRoundabout Operator'))
        .then(() => expect(dashboardPage.selectedFilterType()).to.equal('updated past month')));

    it('should not filter jobs when no filter selected', () =>
      dashboardPage.sortAndFilter(SEED_ACCOUNT_ID, 'updated', 'all')
        .then(() => expect(dashboardPage.jobList())
          .to.eql('GoalkeeperGrocerRoundabout OperatorOrgan Grinder'))
        .then(() => expect(dashboardPage.selectedFilterType()).to.equal('all')));
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
  describe('display timeline', () => {
    const SEED_ACCOUNT_ID = 'ALOT-123';

    before(function () {
      return knex.seed.run({ directory: './db/seeds/alot_of_jobs' });
    });

    it('should display alot of jobs', () =>
      dashboardPage.visit(SEED_ACCOUNT_ID)
        .then(() => expect(dashboardPage.jobCount()).to.equal(44)));

    it('should display the correct timeline', () =>
      dashboardPage.visit(SEED_ACCOUNT_ID)
        .then(() => expect(dashboardPage.timelineStatusSize('interested')).to.equal(6))
        .then(() => expect(dashboardPage.timelineStatusSize('applied')).to.equal(6))
        .then(() => expect(dashboardPage.timelineStatusSize('interview')).to.equal(5))
        .then(() => expect(dashboardPage.timelineStatusSize('result')).to.equal(0))
    );
  });
  describe('focus on job', () => {
    let savedJob;

    const createJob = (attributes) =>
      new JobsModel(Object.assign({}, jobData, attributes)).save();

    describe('status', () => {
      before(function () {
        return helper.cleanDb()
          .then(() => createJob())
          .then((job) => { savedJob = job; });
      });

      it('should display details of the job in focus', () =>
        dashboardPage.focus(accountId, savedJob.id)
        .then(() => expect(dashboardPage.isJobDetailsVisible(savedJob))
                  .to.equal(true, 'Job details should be visible')));

      it('should display details of the job after an update', () =>

        dashboardPage.visit(accountId)
          .then(() => dashboardPage.clickJobDetailsButton(savedJob))
          .then(() => dashboardPage.submitJobProgressionStatus(savedJob, 'result'))
          .then(() => expect(dashboardPage.isJobDetailsVisible(savedJob))
                    .to.equal(true, 'Job details should be visible'))
          .then(() => expect(dashboardPage.checkBrowserHasLocalLink(savedJob.id)).to.equal(true))
      );
    });
  });
});

