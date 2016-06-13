const helper = require('./unitSpecHelper');
const DashboardViewModel = require('../../app/controllers/DashboardViewModel');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('DashboardViewModel', function () {
  const now = new Date('2016-04-21');
  before(function () {
    this.clock = sinon.useFakeTimers(now.getTime());
  });
  after(function () {
    this.clock.restore();
  });

  describe('deadlineFormatted', function () {
    [
      {
        name: 'exclude year for current year',
        deadline: new Date('2016-10-11'),
        expected: '11th October',
      },
      {
        name: 'include year for future year',
        deadline: new Date('2017-01-01'),
        expected: '1st January 2017',
      },
      {
        name: 'include year for previous year',
        deadline: new Date('2015-02-02'),
        expected: '2nd February 2015',
      },
      { name: 'return empty string', deadline: undefined, expected: '' },
      { name: 'return empty string', deadline: null, expected: '' },
    ].forEach(function (s) {
      it(`should ${s.name}, date: '${s.deadline}' expected: '${s.expected}'`, function () {
        const dashboardViewModel = new DashboardViewModel('123', [{
          status: helper.initialStatus,
          deadline: s.deadline,
        }]);
        expect(dashboardViewModel.jobs[0].deadlineFormatted).to.equal(s.expected);
      });
    });
  });
});
