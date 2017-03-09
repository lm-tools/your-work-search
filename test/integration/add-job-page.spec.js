const helper = require('./support/integration-spec-helper');
const addJobPage = helper.addJobPage;
const dashboardPage = helper.dashboardPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;

describe('Add a job page', () => {
  const accountId = 'someAccount';
  beforeEach(() => addJobPage.visit(accountId));

  describe('page outline', () => {
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
    beforeEach(() =>
      Promise.resolve(addJobPage.fillTitle('Some job title'))
        .then(() => addJobPage.submit())
    );

    it('should redirect user to dashboard page', () =>
      expect(dashboardPage.browserPath()).to.match(new RegExp(`^/${accountId}`))
    );

    it('should add focus parameter when job added', () =>
      expect(dashboardPage.checkBrowserHasQueryParam('focus=')).to.equal(true)
    );

    it('should send "job_created" virtual pageView to google analytics');
  });

  describe('validation error', () => {
    const form = {
      title: '', employer: 'Dwp', sourceType: 'online', sourceUrl: 'http://indeed.com',
      rating: '2',
    };

    it('should prepopulate filled form fields after error', () =>
      Promise.resolve(expect(addJobPage.employerFieldValue()).to.equal(''))
        .then(() => addJobPage.fillJobApplication(form))
        .then(() => expect(addJobPage.formValues()).to.eql(form))
    );
  });
});

