const expect = require('chai').expect;
const moment = require('moment');
const rules = require('../../app/rules/timeline-rules');
const Job = require('../../app/models/job-model');

describe('Timeline rules', function () {

  const _21daysAgo = moment().subtract(21, 'days').toDate();
  const _20daysAgo = moment().subtract(20, 'days').toDate();

  function priorityResultWith(override) {
    return Object.assign({
      interested: 'default',
      applied: 'default',
      interview: 'default',
      failure: 'default',
      success: 'default',
    }, override)
  }

  describe('priority', function () {
    [
      {
        name: 'empty job list should has default priority',
        jobList: [],
        result: priorityResultWith({}),
      },
      {
        name: 'job list containing interested',
        jobList: [new Job({ status: 'interested' })],
        result: priorityResultWith({ interested: 'high' }),
      },
      {
        name: 'job list containing applied',
        jobList: [new Job({ status: 'applied' })],
        result: priorityResultWith({ interested: 'high', applied: 'high' }),
      },
      {
        name: 'job list containing interview without date',
        jobList: [new Job({ status: 'interview' })],
        result: priorityResultWith({ interested: 'high', applied: 'high', interview: 'high' }),
      },
      {
        name: 'job list containing interview with date 21 days ago',
        jobList: [new Job({ status: 'interview', interviewDate: _21daysAgo })],
        result: priorityResultWith({ interested: 'default', applied: 'default', interview: 'default' }),
      },
      {
        name: 'job list containing interview with date 21 days ago and some that are earlier',
        jobList: [
          new Job({ status: 'interview', interviewDate: _21daysAgo }),
          new Job({ status: 'interview', interviewDate: _20daysAgo }),
        ],
        result: priorityResultWith({ interested: 'high', applied: 'high', interview: 'high' }),
      }
    ].forEach(s => {
      it(s.name, () => {
        expect(rules.priority(s.jobList)).to.eql(s.result);
      });
    });
  });

  describe('date text', function () {
  });
});
