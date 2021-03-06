const expect = require('chai').expect;
const moment = require('moment');
const rules = require('../../app/rules/timeline-rules-priority');
const Job = require('../../app/models/job-model');
const progression = require('../../app/models/progression');

describe('Timeline rules', function () {
  const time21daysAgo = moment().subtract(21, 'days').toDate();
  const time20daysAgo = moment().subtract(20, 'days').toDate();

  function aJob(opts) {
    return new Job(Object.assign(
      { status_sort_index: progression.getById(opts.status).order },
      opts
    ));
  }

  describe('priority', function () {
    describe('interested', () => {
      [
        { name: 'default for empty list', jobs: [], result: 'default' },
        {
          name: 'high when there is a job',
          jobs: [aJob({ status: 'interested' })],
          result: 'high',
        },
        {
          name: 'high when there is a job without a deadline date',
          jobs: [aJob({ status: 'interested', deadlineDate: null })],
          result: 'high',
        },
        {
          name: 'default when job list contains date 21 days ago',
          jobs: [aJob({ status: 'interested', deadlineDate: time21daysAgo })],
          result: 'default',
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.priority(s.jobs).interested).to.equal(s.result);
        });
      });
    });

    describe('applied', () => {
      [
        { name: 'default for empty list', jobs: [], result: 'default' },
        {
          name: 'high when there is a job',
          jobs: [aJob({ status: 'applied' })],
          result: 'high',
        },
        {
          name: 'high when there is a job without a date',
          jobs: [aJob({ status: 'applied', applicationDate: null })],
          result: 'high',
        },
        {
          name: 'default when job list contains date 21 days ago',
          jobs: [aJob({ status: 'applied', applicationDate: time21daysAgo })],
          result: 'default',
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.priority(s.jobs).applied).to.equal(s.result);
        });
      });
    });

    describe('interview', () => {
      [
        { name: 'default for empty list', jobs: [], result: 'default' },
        {
          name: 'high when there is a job without an interview date',
          jobs: [aJob({ status: 'interview', interviewDate: null })],
          result: 'high',
        },
        {
          name: 'high when there is a job younger then 21 days',
          jobs: [aJob({ status: 'interview', interviewDate: time20daysAgo })],
          result: 'high',
        },
        {
          name: 'high when job list contains date 21 days ago and some that are earlier',
          jobs: [
            aJob({ status: 'interview', interviewDate: time21daysAgo }),
            aJob({ status: 'interview', interviewDate: time20daysAgo }),
          ],
          result: 'high',
        },
        {
          name: 'default when job list contains date 21 days ago',
          jobs: [aJob({ status: 'interview', interviewDate: time21daysAgo })],
          result: 'default',
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.priority(s.jobs).interview).to.equal(s.result);
        });
      });
    });

    describe('success', () => {
      [
        { name: 'default for empty list', jobs: [], result: 'default' },
        {
          name: 'high when there is a job with date younger the 21 days',
          jobs: [aJob({ status: 'success', successDate: time20daysAgo })],
          result: 'high',
        },
        {
          name: 'default when there is a job with date older the 21 days',
          jobs: [aJob({ status: 'success', successDate: time21daysAgo })],
          result: 'default',
        },
        {
          name: 'default when there all jobs with date older the 21 days',
          jobs: [
            aJob({ status: 'success', successDate: time21daysAgo }),
            aJob({ status: 'success', successDate: time21daysAgo }),
          ],
          result: 'default',
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.priority(s.jobs).success).to.equal(s.result);
        });
      });
    });

    describe('status dependencies', () => {
      [
        {
          name: 'empty job list',
          jobs: [],
          result: {
            interested: 'default',
            applied: 'default',
            interview: 'default',
            success: 'default',
          },
        },
        {
          name: 'job with status applied and high priority',
          jobs: [aJob({ status: 'applied' })],
          result: {
            interested: 'high',
            applied: 'high',
            interview: 'default',
            success: 'default',
          },
        },
        {
          name: 'job with status interview and high priority',
          jobs: [aJob({ status: 'interview', interviewDate: time20daysAgo })],
          result: {
            interested: 'high',
            applied: 'high',
            interview: 'high',
            success: 'default',
          },
        },
        {
          name: 'job with status interview and default priority',
          jobs: [
            aJob({ status: 'interview', interviewDate: time21daysAgo }),
            aJob({ status: 'applied' }),
          ],
          result: {
            interested: 'high',
            applied: 'high',
            interview: 'default',
            success: 'default',
          },
        },
        {
          name: 'job with status success and default priority',
          jobs: [
            aJob({ status: 'success', successDate: time21daysAgo }),
            aJob({ status: 'interview', interviewDate: time20daysAgo }),
            aJob({ status: 'applied' }),
          ],
          result: {
            interested: 'high',
            applied: 'high',
            interview: 'high',
            success: 'default',
          },
        },
        {
          name: 'job with status success and high priority',
          jobs: [
            aJob({ status: 'success', successDate: time20daysAgo }),
            aJob({ status: 'interview', interviewDate: time21daysAgo }),
          ],
          result: {
            interested: 'high',
            applied: 'high',
            interview: 'high',
            success: 'high',
          },
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.priority(s.jobs)).to.eql(s.result);
        });
      });
    });
  });
});
