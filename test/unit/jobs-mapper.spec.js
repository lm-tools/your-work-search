const expect = require('chai').expect;
const sinon = require('sinon');
const jobsMapper = require('../../app/controllers/jobs-mapper');

describe('Jobs mapper', function () {
  describe('mapToUpdateModel', function () {
    const now = new Date();
    before(function () {
      this.clock = sinon.useFakeTimers(now.getTime());
    });
    after(function () {
      this.clock.restore();
    });

    [
      {
        name: 'should remove _csrf token',
        input: { _csrf: 'token' },
        output: {},
      },
      {
        name: 'should only save date related to status success',
        input: {
          status: 'success',
          deadlineDate: now,
          applicationDate: now,
          interviewDate: now,
        },
        output: {
          status: 'success',
          successDate: now,
          status_sort_index: 4,
        },
      },
      {
        name: 'should only save date related to status failure',
        input: {
          status: 'failure',
          deadlineDate: now,
          applicationDate: now,
          interviewDate: now,
        },
        output: {
          status: 'failure',
          failureDate: now,
          status_sort_index: 3,
        },
      },
      {
        name: 'should only save date related to status applied',
        input: {
          status: 'applied',
          deadlineDate: now,
          applicationDate: now,
          interviewDate: now,
        },
        output: {
          status: 'applied',
          applicationDate: now,
          status_sort_index: 1,
        },
      },
      {
        name: 'should only save date related to status interested',
        input: {
          status: 'interested',
          deadlineDate: now,
          applicationDate: now,
          interviewDate: now,
        },
        output: {
          status: 'interested',
          deadlineDate: now,
          status_sort_index: 0,
        },
      },
      {
        name: 'should only save date related to status interview',
        input: {
          status: 'interview',
          deadlineDate: now,
          applicationDate: now,
          interviewDate: now,
        },
        output: {
          status: 'interview',
          interviewDate: now,
          status_sort_index: 2,
        },
      },

      {
        name: 'should substitute empty string with null for interview date',
        input: {
          status: 'interview',
          deadlineDate: '',
          applicationDate: '',
          interviewDate: '',
        },
        output: {
          status: 'interview',
          interviewDate: null,
          status_sort_index: 2,
        },
      },
      {
        name: 'should substitute empty string with null for applied date',
        input: {
          status: 'applied',
          deadlineDate: '',
          applicationDate: '',
          interviewDate: '',
        },
        output: {
          status: 'applied',
          applicationDate: null,
          status_sort_index: 1,
        },
      },
      {
        name: 'should substitute empty string with null for deadline date',
        input: {
          status: 'interested',
          deadlineDate: '',
          applicationDate: '',
          interviewDate: '',
        },
        output: {
          status: 'interested',
          deadlineDate: null,
          status_sort_index: 0,
        },
      },
    ].forEach(s => {
      it(s.name, () => {
        expect(jobsMapper.mapToUpdateModel(s.input)).to.eql(s.output);
      });
    });
  });
});
