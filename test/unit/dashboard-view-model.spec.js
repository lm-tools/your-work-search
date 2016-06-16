const helper = require('./unit-spec-helper');
const sampleJob = helper.sampleJob;
const DashboardViewModel = require('../../app/controllers/dashboard-view-model');
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
    ].forEach(s => {
      it(`should ${s.name}, date: '${s.deadline}' expected: '${s.expected}'`, function () {
        const dashboardViewModel = new DashboardViewModel('123', [
          sampleJob({ deadline: s.deadline }),
        ]);
        expect(dashboardViewModel.jobs[0].deadlineFormatted).to.equal(s.expected);
      });
    });
  });

  describe('source', function () {
    [
      {
        name: 'should equal "In person" for "inPerson" sourceType',
        job: sampleJob({ sourceType: 'inPerson', sourceUrl: '' }),
        expectedSource: 'In person',
      },
      {
        name: 'should equal sourceUrl for "online" sourceType',
        job: sampleJob({ sourceType: 'online', sourceUrl: 'http://example.org' }),
        expectedSource: 'http://example.org',
      },
      {
        name: 'should equal "Online" for "online" sourceType when sourceUrl is missing',
        job: sampleJob({ sourceType: 'online', sourceUrl: '' }),
        expectedSource: 'Online',
      },
    ].forEach(s => {
      it(s.name, function () {
        const model = new DashboardViewModel('', [s.job]);
        expect(model.jobs[0].source).to.equal(s.expectedSource);
      });
    })
    ;
  });
});
