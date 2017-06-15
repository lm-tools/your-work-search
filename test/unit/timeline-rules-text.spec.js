const expect = require('chai').expect;
const moment = require('moment');
const rules = require('../../app/rules/timeline-rules-text');
const Job = require('../../app/models/job-model');
const progression = require('../../app/models/progression');

describe('Timeline rules', function () {
  const in8days = moment().add(8, 'days').toDate();
  const in7days = moment().add(7, 'days').toDate();
  const now = new Date();
  const yesterday = moment().subtract(1, 'day').toDate();
  const time10daysAgo = moment().subtract(10, 'day').toDate();
  const time3daysAgo = moment().subtract(3, 'day').toDate();
  const time3weeksAgo = moment().subtract(3, 'weeks').toDate();
  const time3weeksAnd1DayAgo = moment().subtract(22, 'days').toDate();
  const time3weeksAnd2DaysAgo = moment().subtract(23, 'days').toDate();

  function aJob(opts) {
    return new Job(Object.assign(
      { status_sort_index: progression.getById(opts.status).order },
      opts
    ));
  }

  describe('text', function () {
    describe('interested', () => {
      [
        { name: 'empty for empty list', jobs: [], result: [] },
        {
          name: 'updated date when there is a job without date',
          jobs: [
            aJob({ status: 'interested', updated_at: yesterday }),
            aJob({ status: 'interested', updated_at: now }),
          ],
          result: ['Updated a few seconds ago'],
        },
        {
          name: 'updated date when every input date is more then 7 days in the future',
          jobs: [
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: yesterday }),
          ],
          result: ['Updated a few seconds ago'],
        },
        {
          name: 'updated date when one date is 7 days in the future and rest are after',
          jobs: [
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in7days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: now }),
          ],
          result: ['One job expiring soon'],
        },
        {
          name: 'updated date when one date expires in less then a week',
          jobs: [
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in7days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: now }),
          ],
          result: ['One job expiring soon'],
        },
        {
          name: 'updated date when few dates expires in less then a week',
          jobs: [
            aJob({ status: 'interested', deadlineDate: in7days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in7days, updated_at: now }),
            aJob({ status: 'interested', deadlineDate: in8days, updated_at: now }),
          ],
          result: ['2 jobs expiring soon'],
        },
        {
          name: 'jobs without a deadline date should not be included',
          jobs: [
            aJob({ status: 'interested', deadlineDate: in7days, updated_at: now }),
            aJob({ status: 'interested', updated_at: now }),
          ],
          result: ['One job expiring soon'],
        },


      ].forEach(s => {
        it(s.name, () => {
          expect(rules.text(s.jobs).interested).to.eql(s.result);
        });
      });
    });

    describe('applied', () => {
      [
        { name: 'empty for empty list', jobs: [], result: [] },
        {
          name: 'empty for jobs in the future',
          jobs: [aJob({ status: 'applied', applicationDate: in7days })],
          result: [],
        },
        {
          name: 'empty for some jobs in the future and some in the past',
          jobs: [
            aJob({ status: 'applied', applicationDate: in7days }),
            aJob({ status: 'applied', applicationDate: yesterday }),
          ],
          result: [],
        },
        {
          name: 'X days ago when all the jobs in the past',
          jobs: [
            aJob({ status: 'applied', applicationDate: time10daysAgo }),
            aJob({ status: 'applied', applicationDate: time3daysAgo }),
          ],
          result: ['Last 3 days ago'],
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.text(s.jobs).applied).to.eql(s.result);
        });
      });
    });

    describe('interview', () => {
      [
        { name: 'empty for empty list', jobs: [], result: [] },
        {
          name: 'empty for jobs without date',
          jobs: [aJob({ status: 'interview' })],
          result: [],
        },
        {
          name: 'Next in X days for all dates in future',
          jobs: [
            aJob({ status: 'interview', interviewDate: in7days }),
            aJob({ status: 'interview', interviewDate: in8days }),
          ],
          result: ['Next in 7 days'],
        },
        {
          name: 'Interviewing today when at least one today',
          jobs: [
            aJob({ status: 'interview', interviewDate: now }),
            aJob({ status: 'interview', interviewDate: in8days }),
          ],
          result: ['Interviewing today'],
        },
        {
          name: 'Last X days ago when all dates in the past',
          jobs: [
            aJob({ status: 'interview', interviewDate: time3daysAgo }),
            aJob({ status: 'interview', interviewDate: time10daysAgo }),
          ],
          result: ['Last 3 days ago'],
        },
        {
          name: 'Last X days ago, Next in X days when dates in the past and future',
          jobs: [
            aJob({ status: 'interview', interviewDate: in7days }),
            aJob({ status: 'interview', interviewDate: time10daysAgo }),
          ],
          result: ['Next in 7 days', 'Last 10 days ago'],
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.text(s.jobs).interview).to.eql(s.result);
        });
      });
    });

    describe('success', () => {
      [
        { name: 'empty for empty list', jobs: [], result: [] },
        {
          name: 'Congratulations for job without date',
          jobs: [aJob({ status: 'success' })],
          result: ['Congratulations – make sure your work coach knows.'],
        },
        {
          name: 'Congratulations for job expired in last 3 weeks',
          jobs: [
            aJob({ status: 'success', successDate: time3weeksAgo }),
            aJob({ status: 'success', successDate: time3daysAgo }),
          ],
          result: ['Congratulations – make sure your work coach knows.'],
        },
        {
          name: 'Last X days ago for job without date',
          jobs: [
            aJob({ status: 'success', successDate: time3weeksAnd1DayAgo }),
            aJob({ status: 'success', successDate: time3weeksAnd2DaysAgo }),
          ],
          result: ['Last 22 days ago'],
        },
      ].forEach(s => {
        it(s.name, () => {
          expect(rules.text(s.jobs).success).to.eql(s.result);
        });
      });
    });
  });
});
