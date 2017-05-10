const expect = require('chai').expect;
const moment = require('moment');
const rules = require('../../app/rules/single-status-rules');

describe('Single status rules', function () {
  describe('priority', function () {
    [
      {
        status: 'interested',
        date: { name: 'empty', value: null },
        expected: 'default',
      },
      {
        status: 'interested',
        date: { name: '8 days from now', value: moment().add(8, 'days').toDate() },
        expected: 'default',
      },
      {
        status: 'interested',
        date: { name: '7 days from now', value: moment().add(7, 'days').toDate() },
        expected: 'high',
      },
      {
        status: 'interested',
        date: { name: '6 days from now', value: moment().add(6, 'days').toDate() },
        expected: 'high',
      },
      {
        status: 'applied',
        date: { name: 'empty', value: null },
        expected: 'default',
      },
      {
        status: 'applied',
        date: { name: 'in the past', value: moment().subtract(1, 'day').toDate() },
        expected: 'default',
      },
      {
        status: 'applied',
        date: { name: 'today', value: new Date() },
        expected: 'default',
      },
      {
        status: 'applied',
        date: { name: 'in the future', value: moment().add(1, 'day').toDate() },
        expected: 'default',
      },
      {
        status: 'interview',
        date: { name: 'empty', value: null },
        expected: 'high',
      },
      {
        status: 'interview',
        date: { name: 'in the future', value: moment().add(1, 'day').toDate() },
        expected: 'high',
      },
      {
        status: 'interview',
        date: { name: 'today', value: new Date() },
        expected: 'high',
      },
      {
        status: 'interview',
        date: { name: '20 days ago', value: moment().subtract(20, 'days').toDate() },
        expected: 'high',
      },
      {
        status: 'interview',
        date: { name: '21 days ago', value: moment().subtract(21, 'days').toDate() },
        expected: 'default',
      },
      {
        status: 'failure',
        date: { name: 'empty', value: null },
        expected: 'default',
      },
      {
        status: 'failure',
        date: { name: 'in the past', value: moment().subtract(1, 'day').toDate() },
        expected: 'default',
      },
      {
        status: 'failure',
        date: { name: 'today', value: new Date() },
        expected: 'default',
      },
      {
        status: 'failure',
        date: { name: 'in the future', value: moment().add(1, 'day').toDate() },
        expected: 'default',
      },
      {
        status: 'success',
        date: { name: 'empty', value: null },
        expected: 'high',
      },
      {
        status: 'success',
        date: { name: '22 days ago', value: moment().subtract(22, 'day').toDate() },
        expected: 'default',
      },
      {
        status: 'success',
        date: { name: '21 days ago', value: moment().subtract(21, 'day').toDate() },
        expected: 'high',
      },
    ].forEach(s => {
      it(`for status: '${s.status}' and date: '${s.date.name}' returns '${s.expected}' `, () =>
        expect(rules.priority(s.status, s.date.value)).to.equal(s.expected)
      );
    });
  });
});
