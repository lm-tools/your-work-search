require('./integrationSpecHelper');
const Zombie = require('zombie');
const AddJobPage = require('../common/page_objects/AddJobPage');
const addJobPage = new AddJobPage(new Zombie());
const expect = require('chai').expect;

describe('Add a job page', () => {
  describe('validation error', () => {
    it('should prepopulate filled form fields after error', () =>
      addJobPage.visit('randomAccountId')
        .then(() => expect(addJobPage.employerFieldValue()).to.equal(''))
        .then(() => addJobPage.fillJobApplication({
          employer: 'Dwp', title: '', sourceType: 'online',
        }))
        .then(() => expect(addJobPage.employerFieldValue()).to.equal('Dwp'))
    );
  });
});

