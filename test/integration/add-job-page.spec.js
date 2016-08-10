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
  });

  describe('validation error', () => {
    const form = {
      title: '', employer: 'Dwp', sourceType: 'online', sourceUrl: 'http://indeed.com',
      rating: '2', deadline: '25/11/2016',
    };

    it('should prepopulate filled form fields after error', () =>
      Promise.resolve(expect(addJobPage.employerFieldValue()).to.equal(''))
        .then(() => addJobPage.fillJobApplication(form))
        .then(() => expect(addJobPage.formValues()).to.eql(form))
    );

    ['abc', '2016-21-12'].forEach(deadline => {
      it(`should fail incorrect deadline format for date '${deadline}'`, () =>
        Promise.resolve(addJobPage.fillTitle('Some job title'))
          .then(() => addJobPage.fillDeadline(deadline))
          .then(() => addJobPage.submit())
          .then(() => expect(addJobPage.getValidationError())
            .to.equal('Deadline should be in "dd/mm/yyyy" format'))
      );
    });

    [
      { name: 'desktop format "dd/mm/yyyy"', date: '21/10/2016' },
      { name: 'mobile format "yyyy-mm-dd"', date: '2016-12-21' },
      { name: 'empty date', date: '' },
    ].forEach(scenario => {
      it(`should not fail deadline validation for '${scenario.name}' `, () =>
        Promise.resolve(addJobPage.fillTitle('Some job title'))
          .then(() => addJobPage.fillDeadline(scenario.date))
          .then(() => addJobPage.submit())
          .then(() => expect(addJobPage.getValidationError()).to.equal(''))
      );
    });
  });
});

