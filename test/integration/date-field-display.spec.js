const helper = require('./support/integration-spec-helper');
const addJobPage = helper.addJobPage;
const updateJobPage = helper.updateJobPage;
const expect = require('chai').expect;

describe('Status date fields', () => {
  describe('add job date fields', () => {
    const accountId = '6e253198-3be2-11e7-8c9e-dbdc75f76106';

    before(() => addJobPage.visit(accountId));

    it('should display the correct date field by default', () => {
      expect(addJobPage.isFormFieldHidden('deadlineDate')).to.equal(true);
      expect(addJobPage.isFormFieldHidden('datepicker-deadlineDate')).to.equal(false);

      expect(addJobPage.isFormFieldHidden('applicationDate')).to.equal(true);
      expect(addJobPage.isFormFieldHidden('datepicker-applicationDate')).to.equal(false);

      expect(addJobPage.isFormFieldHidden('interviewDate')).to.equal(true);
      expect(addJobPage.isFormFieldHidden('datepicker-interviewDate')).to.equal(false);
    });
  });

  describe('update job date fields', () => {
    before(() => {
      const job = helper.sampleJob(
        {
          id: 999,
          deadlineDate: '2017-12-24',
          applicationDate: '2017-12-25',
          interviewDate: '2017-12-26',
        });

      return helper.cleanDb()
        .then(() => helper.createJobsInDb(job))
        .then(() => updateJobPage.visit(job.accountId, job));
    });

    it('should display the correct date field by default', () => {
      expect(addJobPage.isFormFieldHidden('deadlineDate')).to.equal(true);
      expect(addJobPage.isFormFieldHidden('datepicker-deadlineDate')).to.equal(false);
      expect(updateJobPage.getFormField('deadlineDate')).to.equal('2017-12-24');

      expect(addJobPage.isFormFieldHidden('applicationDate')).to.equal(true);
      expect(addJobPage.isFormFieldHidden('datepicker-applicationDate')).to.equal(false);
      expect(updateJobPage.getFormField('applicationDate')).to.equal('2017-12-25');

      expect(addJobPage.isFormFieldHidden('interviewDate')).to.equal(true);
      expect(addJobPage.isFormFieldHidden('datepicker-interviewDate')).to.equal(false);
      expect(updateJobPage.getFormField('interviewDate')).to.equal('2017-12-26');
    });
  });
});

