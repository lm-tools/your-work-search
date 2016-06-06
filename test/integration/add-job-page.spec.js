const helper = require('./integrationSpecHelper');
const promise = helper.promise;
const Zombie = require('zombie');
const AddJobPage = require('../common/page_objects/AddJobPage');
const addJobPage = new AddJobPage(new Zombie());
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

    it('should fail incorrect deadline format', () =>
      promise(() => addJobPage.fillTitle('Some job title'))
        .then(() => addJobPage.fillDeadline('abc'))
        .then(() => addJobPage.submit())
        .then(() => expect(addJobPage.getValidationError())
          .to.equal('Deadline should be in "dd/mm/yyyy" format'))
    );

    ['21/10/2016', ''].forEach((deadline) => {
      it(`should not fail deadline validation for '${deadline}' `, () =>
        promise(() => addJobPage.fillTitle('Some job title'))
          .then(() => addJobPage.fillDeadline(deadline))
          .then(() => addJobPage.submit())
          .then(() => expect(addJobPage.getValidationError()).to.equal(''))
      );
    });
  });
});

