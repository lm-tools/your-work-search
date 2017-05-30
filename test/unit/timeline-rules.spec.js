const expect = require('chai').expect;
const moment = require('moment');
const rules = require('../../app/rules/timeline-rules');
const Job = require('../../app/models/job-model');
const progression = require('../../app/models/progression');

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
    }, override);
  }

  function aJob(opts) {
    return new Job(Object.assign(
      { status_sort_index: progression.getById(opts.status).order },
      opts
    ));
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
        jobList: [aJob({ status: 'interested' })],
        result: priorityResultWith({ interested: 'high' }),
      },
      {
        name: 'job list containing applied that overrides',
        jobList: [aJob({ status: 'applied' })],
        result: priorityResultWith({ interested: 'high', applied: 'high' }),
      },
      {
        name: 'job list containing interview without date that overrides statuses',
        jobList: [aJob({ status: 'interview' })],
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
          aJob({ status: 'interview', interviewDate: _21daysAgo }),
          aJob({ status: 'interview', interviewDate: _20daysAgo }),
        ],
        result: priorityResultWith({ interested: 'high', applied: 'high', interview: 'high' }),
      },
    ].forEach(s => {
      it(s.name, () => {
        expect(rules.priority(s.jobList)).to.eql(s.result);
      });
    });
  });

  describe('date text', function () {
  });
});
