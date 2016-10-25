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
          accountId: 'FILTER',
          title: 'A-',
          employer: 'Y-',
          status: 'interested',
          updated_at: moment().subtract(month).add(day),
        },
        {
          id: '101',
          accountId: 'FILTER',
          title: 'B-',
          employer: 'Z-',
          status: 'interested',
          updated_at: moment().subtract(fortnight).add(day),
        },
      ]);
    });
};
