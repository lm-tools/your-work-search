const moment = require('moment');
const day = moment.duration(1, 'd');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert([
        {
          id: '100',
          accountId: 'ACCOUNT-A',
          title: 'A-',
          employer: 'Z-',
          status: 'interested',
          updated_at: moment().subtract(month).add(day),
        },
        {
          id: '101',
          accountId: 'ACCOUNT-A',
          title: 'B-',
          employer: 'Y-',
          status: 'interested',
          updated_at: moment().subtract(fortnight).add(day),
        },
        {
          id: '102',
          accountId: 'ACCOUNT-B',
          title: 'A-',
          employer: 'Z-',
          status: 'interested',
          updated_at: moment().subtract(month).add(day),
        },
        {
          id: '103',
          accountId: 'ACCOUNT-C',
          title: 'A-',
          employer: 'Z-',
          status: 'interested',
          updated_at: moment().subtract(fortnight).add(day),
        },
        {
          id: '104',
          accountId: 'ACCOUNT-C',
          title: 'B-',
          employer: 'Y-',
          status: 'interested',
          updated_at: moment().subtract(month).add(day),
        },
        {
          id: '105',
          accountId: 'ACCOUNT-C',
          title: 'C-',
          employer: 'X-',
          status: 'interested',
          updated_at: moment().subtract(fortnight).add(day),
        },
      ]);
    });
};
