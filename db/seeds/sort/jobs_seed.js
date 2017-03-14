const moment = require('moment');
const oneDay = moment.duration(1, 'd');
const twoDays = moment.duration(2, 'd');
const threeDays = moment.duration(3, 'd');
const fourDays = moment.duration(4, 'd');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert([
        {
          id: '100',
          accountId: 'SORT',
          title: 'A-',
          employer: 'A-',
          created_at: moment().subtract(oneDay),
          updated_at: moment().subtract(oneDay),
          deadline: moment().add(oneDay),
          rating: '1',
          status: 'interested',
          status_sort_index: 0,
        },
        {
          id: '101',
          accountId: 'SORT',
          title: 'B-',
          employer: 'B-',
          created_at: moment().subtract(twoDays),
          updated_at: moment().subtract(twoDays),
          deadline: moment().add(twoDays),
          rating: '2',
          status: 'applied',
          status_sort_index: 1,
        },
        {
          id: '102',
          accountId: 'SORT',
          title: 'C-',
          employer: 'C-',
          created_at: moment().subtract(threeDays),
          updated_at: moment().subtract(threeDays),
          deadline: moment().add(threeDays),
          rating: '3',
          status: 'applied',
          status_sort_index: 2,
        },
        {
          id: '103',
          accountId: 'SORT',
          title: 'D-',
          employer: 'D-',
          created_at: moment().subtract(fourDays),
          updated_at: moment().subtract(fourDays),
          deadline: moment().add(fourDays),
          rating: '4',
          status: 'failure',
          status_sort_index: 3,
        },
      ]);
    });
};
