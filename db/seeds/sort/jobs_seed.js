const moment = require('moment');
const day = moment.duration(1, 'd');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert({
        id: '100',
        accountId: 'SORT',
        title: 'A-',
        employer: 'A-',
        created_at: moment().subtract(day),
        updated_at: moment().subtract(day),
        deadline: moment().add(day),
        rating: '1',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert({
        id: '101',
        accountId: 'SORT',
        title: 'B-',
        employer: 'B-',
        created_at: moment().subtract(day).subtract(day),
        updated_at: moment().subtract(day).subtract(day),
        deadline: moment().add(day).add(day),
        rating: '2',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert({
        id: '102',
        accountId: 'SORT',
        title: 'C-',
        employer: 'C-',
        created_at: moment().subtract(day).subtract(day).subtract(day),
        updated_at: moment().subtract(day).subtract(day).subtract(day),
        deadline: moment().add(day).add(day).add(day),
        rating: '3',
        status: 'applied',
        status_sort_index: 2,
      });
    })
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert({
        id: '103',
        accountId: 'SORT',
        title: 'D-',
        employer: 'D-',
        created_at: moment().subtract(day).subtract(day).subtract(day).subtract(day),
        updated_at: moment().subtract(day).subtract(day).subtract(day).subtract(day),
        deadline: moment().add(day).add(day).add(day).add(day),
        rating: '4',
        status: 'result',
        status_sort_index: 3,
      });
    });
};
