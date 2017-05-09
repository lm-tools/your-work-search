const moment = require('moment');
const helper = require('./support/integration-spec-helper');
const addJobPage = helper.addJobPage;
const dashboardPage = helper.dashboardPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;
const sampleJob = helper.sampleJob();
const progression = require('../../app/models/progression');
const ratings = require('../../app/models/ratings');

describe('Add a job page', () => {
  const accountId = 'someAccount';

  function newlyCreatedJob() {
    return { id: dashboardPage.getJobIdFromQueryParams() };
  }

  describe('page outline', () => {
    before(() => addJobPage.visit(accountId));

    it('should hide sourceUrl if no sourceType is selected', () =>
      expect(addJobPage.isSourceUrlHidden()).to.equal(true)
    );

    [
      { name: 'should hide', sourceType: 'inPerson', isSourceUrlHidden: true },
      { name: 'should show', sourceType: 'online', isSourceUrlHidden: false },
    ].forEach(s => {
      it(`${s.name} sourceUrl when source type is ${s.sourceType}`, () => {
        addJobPage.chooseSourceType(s.sourceType);
        expect(addJobPage.isSourceUrlHidden()).to.equal(s.isSourceUrlHidden);
      });
    });

    it('should have correct title', () =>
      expect(addJobPage.browser.text('title')).to.equal('Add a job - Your work search')
    );

    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId)
    );

    it('should display subset of progression statuses', () =>
      expect(addJobPage.getJobProgressionOptions())
        .to.eql(['interested', 'applied', 'interview'])
    );

    it('should render rating in correct order', () =>
      expect(addJobPage.getRatings()).to.eql(['5', '4', '3', '2', '1'])
    );
  });

  describe('successful progression associated date creation', () => {
    const formInputDate = '26/12/2017';

    [
      { field: 'deadlineDate',
        jobData: Object.assign(sampleJob, { deadlineDate: formInputDate }) },
      { field: 'applicationDate',
        jobData: Object.assign(sampleJob, { applicationDate: formInputDate }) },
      { field: 'interviewDate',
        jobData: Object.assign(sampleJob, { interviewDate: formInputDate }) },
    ].forEach(j => {
      it(`should save ${j.field} entered`, (done) => {
        helper.cleanDb()
          .then(() => addJobPage.visit(accountId))
          .then(() => addJobPage.fillJobApplication(j.jobData))
          .then(() => helper.findJobInDb(accountId))
          .then((job) => {
            expect(moment(job[`${j.field}`]).format('D/M/YYYY')).to.equal(formInputDate);
            done();
          });
      });
    });
  });

  describe('successful job creation', () => {
    before(() =>
      addJobPage.visit(accountId)
        .then(() => addJobPage.fillJobApplication(sampleJob))
    );

    it('should redirect user to dashboard page', () =>
      expect(dashboardPage.browserPath()).to.match(new RegExp(`^/${accountId}`))
    );

    it('should add focus parameter when job added', () =>
      expect(dashboardPage.checkBrowserHasQueryParam('focus=')).to.equal(true)
    );

    it('should display newly created job title', () =>
      expect(dashboardPage.getTitle(newlyCreatedJob())).to.equal(sampleJob.title)
    );

    it('should display newly created job employer', () =>
      expect(dashboardPage.getEmployer(newlyCreatedJob())).to.equal(sampleJob.employer)
    );

    it('should display newly created job progression status', () =>
      expect(dashboardPage.getJobProgressionStatus(newlyCreatedJob()))
        .to.equal(helper.labels.progression[sampleJob.status])
    );

    it('should display newly created job rating', () =>
      expect(dashboardPage.getInterestLevel(newlyCreatedJob())).to.equal(sampleJob.rating)
    );

    it('should display newly created job source url', () =>
      expect(dashboardPage.getJobSource(newlyCreatedJob())).to.equal(sampleJob.sourceUrl)
    );
  });

  describe('validation error', () => {
    const form = {
      title: '', employer: 'Dwp', sourceType: 'online', sourceUrl: 'http://indeed.com',
      rating: '2', status: 'applied',
    };
    before(() => addJobPage.visit(accountId));

    it('should prepopulate filled form fields after error', () =>
      addJobPage.fillJobApplication(form)
        .then(() => expect(addJobPage.formValues()).to.eql(form))
    );

    describe('for empty form', () => {
      before(() =>
        addJobPage.visit(accountId)
          .then(() => addJobPage.submit())
      );

      it('should show title is required error', () =>
        expect(addJobPage.getValidationError()).to.contain('Job title is required')
      );
      it('should show jog progression is required error', () =>
        expect(addJobPage.getValidationError())
          .to.contain('Where are you in the process is required')
      );
    });

    describe('post', () => {
      it('should disallow incorrect progression', () =>
        addJobPage
          .post(accountId, { title: 'some', status: 'incorrect' })
          .then(response => {
            expect(response.status).to.equal(400);
            expect(response.text).to.include('We&#39;re experiencing technical problems.');
          })
      );

      progression.getInitialSubset().forEach(s => {
        it(`should allow '${s}' progression`, () =>
          addJobPage
            .post(accountId, { title: 'some', status: s })
            .then(response => {
              expect(response.status).to.equal(302);
            })
        );
      });

      ['inPerson', 'online'].forEach(s => {
        it(`should allow '${s}' source type`, () =>
          addJobPage
            .post(accountId,
            {
              title: 'some',
              status: progression.getInitialSubset()[0],
              sourceType: s,
            })
            .then(response => {
              expect(response.status).to.equal(302);
            })
        );
      });

      it('should disallow incorrect source type', () =>
        addJobPage
          .post(accountId,
          {
            title: 'some',
            status: progression.getInitialSubset()[0],
            sourceType: 'incorrect',
          })
          .then(response => {
            expect(response.status).to.equal(400);
            expect(response.text).to.include('We&#39;re experiencing technical problems.');
          })
      );

      ratings.forEach(s => {
        it(`should allow rating of '${s}'`, () =>
          addJobPage
            .post(accountId,
            {
              title: 'some',
              status: progression.getInitialSubset()[0],
              rating: s,
            })
            .then(response => {
              expect(response.status).to.equal(302);
            })
        );
      });

      it('should disallow rating of \'6\'', () =>
        addJobPage
          .post(accountId,
          {
            title: 'some',
            status: progression.getInitialSubset()[0],
            rating: '6',
          })
          .then(response => {
            expect(response.status).to.equal(400);
            expect(response.text).to.include('We&#39;re experiencing technical problems.');
          })
      );
    });
  });
});
