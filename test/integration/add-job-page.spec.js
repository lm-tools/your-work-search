const helper = require('./integration-spec-helper');
const promise = helper.promise;
const AddJobPage = require('../common/page_objects/add-job-page');
const addJobPage = new AddJobPage(helper.browser);
const expect = require('chai').expect;

describe('Add a job page', () => {
  beforeEach(() => addJobPage.visit('someAccount'));

  it('should show/hide sourceUrl depending on sourceType', () =>
    promise(() => expect(addJobPage.isSourceUrlHidden()).to.equal(false))
      .then(() => addJobPage.chooseSourceType('inPerson'))
      .then(() => expect(addJobPage.isSourceUrlHidden()).to.equal(true))
  );

  describe('validation error', () => {
    const form = {
      title: '', employer: 'Dwp', sourceType: 'online', sourceUrl: 'http://indeed.com',
      rating: '2', deadline: '25/11/2016',
    };

    it('should prepopulate filled form fields after error', () =>
      promise(() => expect(addJobPage.employerFieldValue()).to.equal(''))
        .then(() => addJobPage.fillJobApplication(form))
        .then(() => expect(addJobPage.formValues()).to.eql(form))
    );

    ['abc', '2016-21-12'].forEach(deadline => {
      it(`should fail incorrect deadline format for date '${deadline}'`, () =>
        promise(() => addJobPage.fillTitle('Some job title'))
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
        promise(() => addJobPage.fillTitle('Some job title'))
          .then(() => addJobPage.fillDeadline(scenario.date))
          .then(() => addJobPage.submit())
          .then(() => expect(addJobPage.getValidationError()).to.equal(''))
      );
    });
  });
});

