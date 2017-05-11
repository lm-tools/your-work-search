const expect = require('chai').expect;

const progression = require('../../app/models/progression');

describe('Progression', function () {
  describe('should return progression status date fields', function () {
    expect(progression.getAllDateFields().sort())
      .to.deep.equal(['deadlineDate', 'interviewDate', 'applicationDate'].sort());
  });
});
