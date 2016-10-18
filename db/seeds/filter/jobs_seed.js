const moment = require('moment');
const day = moment.duration(1, 'd');
const week = moment.duration(1, 'w');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');
const threeMonths = moment.duration(3, 'M');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert([
        {
          id: '100',
          accountId: 'FILTER',
          title: 'C-',
          employer: 'X-',
          status: 'interested',
          updated_at: moment().subtract(month).add(day),
        },
        {
          id: '101',
          accountId: 'FILTER',
          title: 'A-',
          employer: 'Z-',
          status: 'interested',
          updated_at: moment().subtract(week).add(day),
        },
        {
          id: '102',
          accountId: 'FILTER',
          title: 'B-',
          employer: 'Y-',
          status: 'interested',
          updated_at: moment().subtract(fortnight).add(day),
        },
        {
          id: '103',
          accountId: 'FILTER',
          title: 'D-',
          employer: 'W-',
          status: 'interested',
          updated_at: moment().subtract(threeMonths),
        },
      ]);
    });
};