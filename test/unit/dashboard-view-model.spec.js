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
        expected: '11 October',
      },
      {
        name: 'include year for future year',
        deadline: new Date('2017-01-01'),
        expected: '1 January 2017',
      },
      {
        name: 'include year for previous year',
        deadline: new Date('2015-02-02'),
        expected: '2 February 2015',
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

  describe('dashboardTimeline', function () {
    const createTimeline = (statusCounts) => {
      const jobs = [];
      Object.keys(statusCounts).forEach((status) => {
        for (let i = statusCounts[status]; i > 0; i--) {
          jobs.push({ status });
        }
      });

      return DashboardViewModel.prototype.dashboardTimeline(jobs);
    };

    describe('maxScale', function () {
      it('should equal the highest status count', function () {
        const timeline = createTimeline({
          interested: 1,
          applied: 2,
          interview: 4,
          result: 3,
        });

        expect(timeline.maxScale).to.equal(4);
      });

      it('should not exceed 6', function () {
        const timeline = createTimeline({
          interested: 10,
          applied: 20,
          interview: 40,
          result: 30,
        });

        expect(timeline.maxScale).to.equal(6);
      });
    });

    describe('totals', function () {
      const statusCounts = {
        interested: 2,
        applied: 0,
        interview: 6,
        result: 10,
      };

      let totals;

      before(function () {
        totals = createTimeline(statusCounts).totals;
      });

      it('should contain 4 elements', function () {
        expect(totals).to.have.lengthOf(4);
      });

      it('should contain an entry for each status', function () {
        expect(totals.map(t => t.type)).to.eql(['interested', 'applied', 'interview', 'result']);
      });

      it('should contain the total count for each status', function () {
        const countsByType = {};
        totals.forEach(t => { countsByType[t.type] = t.total; });

        expect(countsByType).to.eql(statusCounts);
      });

      it('should contain the scale for each status, as total count with a max of 6', function () {
        const scalesByType = {};
        totals.forEach(t => { scalesByType[t.type] = t.scale; });

        expect(scalesByType).to.eql({
          interested: 2,
          applied: 0,
          interview: 6,
          result: 6,
        });
      });
    });
  });
});
