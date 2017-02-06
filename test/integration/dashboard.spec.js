const helper = require('./support/integration-spec-helper');
const dashboardPage = helper.dashboardPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
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
  const createJob = (attributes) =>
    new JobsModel(Object.assign({}, jobData, attributes)).save();

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
      it('should not display where you found their role, if it was not specified', () => {
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

    it('should not display sort or filter when zero saved jobs', () =>
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
    const SEED_ACCOUNT_ID = 'SORT';

    before(function () {
      return knex.seed.run({ directory: './db/seeds/sort' });
    });

    [
      {
        title: 'should sort jobs by most recently added if sort empty',
        sortBy: '',
        expectedJobList: 'A-B-C-D-',
        expectedSelectedSortType: 'date added',
      },
      {
        title: 'should sort jobs by most recently added',
        sortBy: 'created',
        expectedJobList: 'A-B-C-D-',
        expectedSelectedSortType: 'date added',
      },
      {
        title: 'should sort jobs by most recently updated date',
        sortBy: 'updated',
        expectedJobList: 'A-B-C-D-',
        expectedSelectedSortType: 'date updated',
      },
      {
        title: 'should sort jobs by title alphabetically',
        sortBy: 'title',
        expectedJobList: 'A-B-C-D-',
        expectedSelectedSortType: 'job title',
      },
      {
        title: 'should sort jobs by deadline date soonest first',
        sortBy: 'deadline',
        expectedJobList: 'A-B-C-D-',
        expectedSelectedSortType: 'deadline date',
      },
      {
        title: 'should sort jobs by employer alphabetically',
        sortBy: 'employer',
        expectedJobList: 'A-B-C-D-',
        expectedSelectedSortType: 'employer',
      },
      {
        title: 'should sort jobs by status most advanced to least',
        sortBy: 'status',
        expectedJobList: 'D-C-B-A-',
        expectedSelectedSortType: 'status',
      },
    ].forEach(s => {
      it(s.title, () =>
        dashboardPage.sort(SEED_ACCOUNT_ID, s.sortBy).then(() => {
          expect(dashboardPage.jobList()).to.eql(s.expectedJobList);
          expect(dashboardPage.selectedSortType()).to.equal(s.expectedSelectedSortType);
        })
      );
    });

    describe('sort after job progression update', () => {
      before(() =>
        dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
          .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
          .then(() => dashboardPage.submitJobProgressionStatus({ id: '100' }, 'result'))
      );
      it('should maintain the status sort order', () =>
        expect(dashboardPage.jobList()).to.eql('D-A-C-B-')
      );

      it('should maintain selected sort after status update', () =>
        expect(dashboardPage.selectedSortType()).to.equal('status')
      );
    });
  });

  describe('filter job list for range of updates', () => {
    const SEED_ACCOUNT_ID = 'FILTER';

    before(function () {
      return knex.seed.run({ directory: './db/seeds/filter' });
    });

    [
      {
        title: 'should filter jobs updated in the last week',
        filterBy: 'week',
        expectedJobList: 'A-',
        expectedFilter: 'updated past week',

      },
      {
        title: 'should filter jobs updated in the last fortnight',
        filterBy: 'fortnight',
        expectedJobList: 'A-B-',
        expectedFilter: 'updated past 2 weeks',

      },
      {
        title: 'should filter jobs updated in the last month',
        filterBy: 'month',
        expectedJobList: 'A-B-C-',
        expectedFilter: 'updated past month',

      },
      {
        title: 'should not filter jobs when no filter selected',
        filterBy: 'all',
        expectedJobList: 'A-B-C-D-',
        expectedFilter: 'all',

      },
    ].forEach(s => {
      it(s.title, () =>
        dashboardPage.sortAndFilter(SEED_ACCOUNT_ID, 'updated', s.filterBy).then(() => {
          expect(dashboardPage.jobList()).to.eql(s.expectedJobList);
          expect(dashboardPage.selectedFilterType()).to.equal(s.expectedFilter);
        })
      );
    });

    it('should not change the number of results when a sort is applied', () =>
      dashboardPage.sortAndFilter(SEED_ACCOUNT_ID, 'employer', 'fortnight')
        .then(() => expect(dashboardPage.jobCount()).to.equal(2))
    );
  });

  describe('filter job list to none shown', () => {
    const SEED_ACCOUNT_ID = 'FILTER';

    before(function () {
      return knex.seed.run({ directory: './db/seeds/two-jobs-updated-over-a-week-ago' })
        .then(() => dashboardPage.filter(SEED_ACCOUNT_ID, 'week'));
    });

    it('should not display any jobs', () =>
      expect(dashboardPage.jobCount()).to.equal(0)
    );

    it('should still display the sort and filter', () => {
      /* eslint-disable no-unused-expressions */
      expect(dashboardPage.isSortVisible()).to.be.true;
      expect(dashboardPage.isFilterVisible()).to.be.true;
      /* eslint-enable no-unused-expressions */
    });

    it('should display the appropriate help message', () =>
      expect(dashboardPage.hasJobHelpDisplayed())
    );
  });

  describe('update job', () => {
    let savedJob;

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
      return knex.seed.run({ directory: './db/seeds/alot_of_jobs' })
        .then(() => dashboardPage.visit(SEED_ACCOUNT_ID));
    });

    it('should display alot of jobs', () =>
        expect(dashboardPage.jobCount()).to.equal(44)
    );

    it('should display the correct timeline', () => {
      expect(dashboardPage.timelineStatusSize('interested')).to.equal(6);
      expect(dashboardPage.timelineStatusSize('applied')).to.equal(6);
      expect(dashboardPage.timelineStatusSize('interview')).to.equal(5);
      expect(dashboardPage.timelineStatusSize('result')).to.equal(0);
    }
    );
  });

  describe('focus on job', () => {
    let savedJob;

    before(function () {
      return helper.cleanDb()
        .then(() => createJob())
        .then((job) => { savedJob = job; });
    });

    it('should display details of the job in focus', () =>
      dashboardPage.focus(accountId, savedJob.id).then(() =>
        expect(dashboardPage.isJobDetailsVisible(savedJob))
          .to.equal(true, 'Job details should be visible')
      )
    );

    it('should display details of the job after an update', () =>
      dashboardPage.visit(accountId)
        .then(() => {
          dashboardPage.clickJobDetailsButton(savedJob);
          return dashboardPage.submitJobProgressionStatus(savedJob, 'result');
        })
        .then(() => {
          expect(dashboardPage.isJobDetailsVisible(savedJob))
            .to.equal(true, 'Job details should be visible');
          expect(dashboardPage.checkBrowserHasLocalLink(savedJob.id)).to.equal(true);
        })
    );
  });

  describe('page outline', () => {
    beforeEach(function () {
      return helper.cleanDb().then(() => dashboardPage.visit(accountId));
    });

    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId)
    );

    it('should have correct title', () =>
      expect(dashboardPage.browser.text('title')).to.equal('Your work search')
    );

    it('should have correct help when no jobs have been entered', () =>
      expect(dashboardPage.firstUseHelpDisplayed())
    );

    it('should have correct help when jobs have been entered', () =>
      createJob()
        .then(() => dashboardPage.visit(accountId))
        .then(() => expect(dashboardPage.hasJobHelpDisplayed()))
    );

    it('should have correct help when multiple jobs have been entered', () =>
      createJob()
        .then(() => createJob())
        .then(() => dashboardPage.visit(accountId))
        .then(() => expect(dashboardPage.hasJobHelpDisplayed()))
    );
  });
});

