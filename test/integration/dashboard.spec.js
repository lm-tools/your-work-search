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
        .then(job => { savedJob = job.serialize(); })
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

      it('should display current status', () =>
        expect(dashboardPage.getJobProgressionStatus(savedJob)).to.equal('Applied'));

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

      it('should link to edit page', () =>
        dashboardPage.clickUpdateJobButton(savedJob).then(() =>
          expect(helper.updateJobPage.getJobTitle()).to.equal(savedJob.title)
        )
      );
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

    beforeEach(function () {
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


    describe('sort after job update', () => {
      before(() =>
        dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
          .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
          .then(() => dashboardPage.clickUpdateJobButton({ id: '100' }))
          .then(() => helper.updateJobPage.clickSave())
      );
      it('should display jobs in default order', () =>
        expect(dashboardPage.jobList()).to.eql('A-B-C-D-')
      );

      it('should use default sort order', () =>
        expect(dashboardPage.selectedSortType()).to.equal('date added')
      );
    });

    describe('sort after job remove', () => {
      before(() =>
        dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
          .then(() => dashboardPage.clickJobDetailsButton({ id: '100' }))
          .then(() => dashboardPage.clickUpdateJobButton({ id: '100' }))
          .then(() => helper.updateJobPage.deleteJob())
          .then(() => helper.confirmationPage.clickBack())
      );
      it('should display jobs in default order', () =>
        expect(dashboardPage.jobList()).to.eql('B-C-D-')
      );

      it('should use default sort order', () =>
        expect(dashboardPage.selectedSortType()).to.equal('date added')
      );
    });

    describe('sort after job added', () => {
      before(() =>
        dashboardPage.sort(SEED_ACCOUNT_ID, 'status')
          .then(() => dashboardPage.clickAddJobButton())
          .then(() => helper.addJobPage.fillTitle('E-'))
          .then(() => helper.addJobPage.submit())
      );
      it('should display jobs in default order', () =>
        expect(dashboardPage.jobList()).to.eql('E-A-B-C-D-')
      );

      it('should use default sort order', () =>
        expect(dashboardPage.selectedSortType()).to.equal('date added')
      );
    });
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
        .then(() => dashboardPage.clickUpdateJobButton(savedJob))
        .then(() => helper.updateJobPage.clickSave())
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

