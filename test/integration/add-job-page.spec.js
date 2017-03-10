const helper = require('./support/integration-spec-helper');
const addJobPage = helper.addJobPage;
const dashboardPage = helper.dashboardPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;
const sampleJob = helper.sampleJob();

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
      expect(dashboardPage.getJobProgressionStatus(newlyCreatedJob())).to.equal('Interested')
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
      rating: '2',
    };

    before(() => addJobPage.visit(accountId));

    it('should prepopulate filled form fields after error', () =>
      Promise.resolve(expect(addJobPage.employerFieldValue()).to.equal(''))
        .then(() => addJobPage.fillJobApplication(form))
        .then(() => expect(addJobPage.formValues()).to.eql(form))
    );
  });
});

