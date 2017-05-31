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
      [].forEach(s => {
        it(s.name, () => {
          expect(rules.text(s.jobs).interview).to.eql(s.result);
        });
      });
    });

    describe('success', () => {
      [].forEach(s => {
        it(s.name, () => {
          expect(rules.text(s.jobs).success).to.eql(s.result);
        });
      });
    });
  });
});
