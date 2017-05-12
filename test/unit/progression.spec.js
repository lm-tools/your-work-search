const expect = require('chai').expect;

const progression = require('../../app/models/progression');

describe('Progression', function () {
  it('should return progression status date fields', function () {
    expect(progression.getAllDateFields().sort())
      .to.deep.equal(['deadlineDate', 'interviewDate', 'applicationDate'].sort());
  });

  it('should be able to establish if status has associated date field', function () {
    expect(progression.hasDateField('failure')).to.equal(false);
  });

  it('should be able to establish if status has associated date field', function () {
    expect(progression.getDateField('failure')).to.equal(undefined);
  });
});
