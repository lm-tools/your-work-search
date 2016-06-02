require('./integrationSpecHelper');
const Zombie = require('zombie');
const AddJobPage = require('../../features/support/AddJobPage');
const addJobPage = new AddJobPage(new Zombie());

describe('Add a job page', () => {
  describe('validation error', () => {
    it('should prepopulate filled form fields after error', () =>
      addJobPage.visit('randomAccountId')
        .then(() => expect(addJobPage.employerFieldValue()).to.equal(''))
        .then(() => addJobPage.fillJobApplication({ employer: 'Dwp', jobTitle: '' }))
        .then(() => expect(addJobPage.employerFieldValue()).to.equal('Dwp'))
    );
  });
});

