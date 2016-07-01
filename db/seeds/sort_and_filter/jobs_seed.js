const moment = require('moment');
const day = moment.duration(1, 'd');
const week = moment.duration(1, 'w');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('jobs').insert({
        id: '100',
        accountId: 'c8330c1f-23f5-4577-943d-151d059af588',
        title: 'Organ Grinder',
        employer: 'Monkey',
        created_at: moment().subtract(month).subtract(day),
        updated_at: moment().subtract(month).subtract(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-14',
        rating: '1',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '101',
        accountId: 'c8330c1f-23f5-4577-943d-151d059af588',
        title: 'Roundabout Operator',
        employer: 'Mr Rusty',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '1',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '102',
        accountId: 'c8330c1f-23f5-4577-943d-151d059af588',
        title: 'Goalkeeper',
        employer: 'England Manager',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-13',
        rating: '1',
        status: 'result',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '103',
        accountId: 'c8330c1f-23f5-4577-943d-151d059af588',
        title: 'Grocer',
        employer: 'Bananaman',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-11',
        rating: '1',
        status: 'interview',
        status_sort_index: 2,
      });
    });
};
