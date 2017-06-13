const moment = require('moment');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert([
        {
          id: '100',
          accountId: 'TIMELINE',
          title: 'Interested',
          status: 'interested',
          created_at: moment(),
          updated_at: moment(),
          status_sort_index: 0,
        },
        {
          id: '101',
          accountId: 'TIMELINE',
          title: 'Applied',
          status: 'applied',
          created_at: moment(),
          updated_at: moment(),
          status_sort_index: 1,
        },
        {
          id: '102',
          accountId: 'TIMELINE',
          title: 'Interview',
          status: 'interview',
          created_at: moment(),
          updated_at: moment(),
          status_sort_index: 2,
        },
        {
          id: '103',
          accountId: 'TIMELINE',
          title: 'Success',
          status: 'success',
          created_at: moment(),
          updated_at: moment(),
          successDate: moment(),
          status_sort_index: 4,
        },
      ]);
    });
};
