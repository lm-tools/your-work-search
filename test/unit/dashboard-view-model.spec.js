const helper = require('./unit-spec-helper');
const sampleJob = helper.sampleJob;
const DashboardViewModel = require('../../app/controllers/dashboard-view-model');
const expect = require('chai').expect;
const sinon = require('sinon');
const moment = require('moment');

const oneDay = moment.duration(1, 'd');
const tenDays = moment.duration(10, 'd');

describe('DashboardViewModel', function () {
  const now = new Date('2016-04-21');
  before(function () {
    this.clock = sinon.useFakeTimers(now.getTime());
  });
  after(function () {
    this.clock.restore();
  });

  describe('displayFormattedDates', function () {
    [
      {
        name: 'include day month and year',
        inputDate: new Date('2016-12-22'),
        expected: '22 December 2016',
      },
      { name: 'return empty string', inputDate: undefined, expected: '' },
      { name: 'return empty string', inputDate: null, expected: '' },
    ].forEach(s => {
      it(`should ${s.name}, date: '${s.inputDate}' expected: '${s.expected}'`, function () {
        const dashboardViewModel = new DashboardViewModel('123', [
          sampleJob({ updated_at: s.inputDate }),
        ]);
        expect(dashboardViewModel.jobs[0].updatedFormatted).to.equal(s.expected);
      });
    });
  });

  describe('source', function () {
    [
      {
        name: 'should be empty for "inPerson" sourceType',
        job: sampleJob({ sourceType: 'inPerson', sourceUrl: '' }),
        expectedSource: '',
      },
      {
        name: 'should equal sourceUrl for "online" sourceType',
        job: sampleJob({ sourceType: 'online', sourceUrl: 'http://example.org' }),
        expectedSource: 'http://example.org',
      },
      {
        name: 'should be empty for "online" sourceType when sourceUrl is missing',
        job: sampleJob({ sourceType: 'online', sourceUrl: '' }),
        expectedSource: '',
      },
    ].forEach(s => {
      it(s.name, function () {
        const model = new DashboardViewModel('', [s.job]);
        expect(model.jobs[0].source).to.equal(s.expectedSource);
      });
    });
  });

  describe('timeline', function () {
    it('should have timeline details populated', () => {
      const expectedTimeline = [
        {
          status: 'interested',
          heading: 'Interested',
          class: 'timeline__item--highlight timeline__item--start',
          message: ['Updated a few seconds ago'],
        },
        {
          status: 'applied',
          heading: 'Applied',
          class: 'timeline__item--highlight timeline__item--current',
          message: [],
        },
        {
          status: 'interview',
          heading: 'Interview',
          class: 'timeline__item--default',
          message: [],
        },
        {
          status: 'success',
          heading: 'Offer',
          class: 'timeline__item--default timeline__item--finish',
          message: [],
        },
      ];

      const model = new DashboardViewModel('',
        [
          sampleJob({ status: 'interested' }),
          sampleJob({ status: 'applied' }),
        ]);

      expect(model.timeline).to.eql(expectedTimeline);
    });

    it('should accommodate multiple classes', () => {
      const expectedTimeline = [
        {
          status: 'interested',
          heading: 'Interested',
          class: 'timeline__item--highlight timeline__item--start timeline__item--current',
          message: ['Updated a day ago'],
        },
        {
          status: 'applied',
          heading: 'Applied',
          class: 'timeline__item--default',
          message: [],
        },
        {
          status: 'interview',
          heading: 'Interview',
          class: 'timeline__item--default',
          message: [],
        },
        {
          status: 'success',
          heading: 'Offer',
          class: 'timeline__item--default timeline__item--finish',
          message: [],
        },
      ];

      const model = new DashboardViewModel('',
        [
          sampleJob({ status: 'interested', updated_at: moment().subtract(oneDay) }),
        ]);

      expect(model.timeline).to.eql(expectedTimeline);
    });

    it('should accommodate multiple messages', () => {
      const expectedTimeline = [
        {
          status: 'interested',
          heading: 'Interested',
          class: 'timeline__item--highlight timeline__item--start',
          message: [],
        },
        {
          status: 'applied',
          heading: 'Applied',
          class: 'timeline__item--highlight',
          message: [],
        },
        {
          status: 'interview',
          heading: 'Interview',
          class: 'timeline__item--highlight timeline__item--current',
          message: ['Next in a day', 'Last 10 days ago'],
        },
        {
          status: 'success',
          heading: 'Offer',
          class: 'timeline__item--default timeline__item--finish',
          message: [],
        },
      ];

      const model = new DashboardViewModel('',
        [
          sampleJob(
            {
              status: 'interview',
              statusDate: moment().add(oneDay),
            }),
          sampleJob(
            { status: 'interview',
              statusDate: moment().subtract(tenDays),
            }),
        ]);

      expect(model.timeline).to.eql(expectedTimeline);
    });
  });
});
