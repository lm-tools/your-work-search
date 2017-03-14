const moment = require('moment');
const day = moment.duration(1, 'd');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');
const quarter = moment.duration(3, 'M');

exports.seed = function (knex) {
  return knex('jobs').where('accountId', 'TEST-123').del() // Deletes specific account entries

    .then(function () {
      return knex('jobs').insert({
        id: '900000908',
        accountId: 'TEST-123',
        title: 'Title-908',
        employer: 'Employer-908',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000909',
        accountId: 'TEST-123',
        title: 'Title-909',
        employer: 'Employer-909',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000910',
        accountId: 'TEST-123',
        title: 'Title-910',
        employer: 'Employer-910',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000911',
        accountId: 'TEST-123',
        title: 'Title-911',
        employer: 'Employer-911',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000912',
        accountId: 'TEST-123',
        title: 'Title-912',
        employer: 'Employer-912',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000913',
        accountId: 'TEST-123',
        title: 'Title-913',
        employer: 'Employer-913',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000914',
        accountId: 'TEST-123',
        title: 'Title-914',
        employer: 'Employer-914',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'failure',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000915',
        accountId: 'TEST-123',
        title: 'Title-915',
        employer: 'Employer-915',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'failure',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000916',
        accountId: 'TEST-123',
        title: 'Title-916',
        employer: 'Employer-916',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000917',
        accountId: 'TEST-123',
        title: 'Title-917',
        employer: 'Employer-917',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000918',
        accountId: 'TEST-123',
        title: 'Title-918',
        employer: 'Employer-918',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000919',
        accountId: 'TEST-123',
        title: 'Title-919',
        employer: 'Employer-919',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'failure',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000920',
        accountId: 'TEST-123',
        title: 'Title-920',
        employer: 'Employer-920',
        created_at: moment().subtract(quarter).add(day),
        updated_at: moment().subtract(quarter).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(quarter).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000921',
        accountId: 'TEST-123',
        title: 'Title-921',
        employer: 'Employer-921',
        created_at: moment().subtract(quarter).add(day),
        updated_at: moment().subtract(quarter).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(quarter).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000922',
        accountId: 'TEST-123',
        title: 'Title-922',
        employer: 'Employer-922',
        created_at: moment().subtract(quarter).add(day),
        updated_at: moment().subtract(quarter).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(quarter).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000923',
        accountId: 'TEST-123',
        title: 'Title-923',
        employer: 'Employer-923',
        created_at: moment().subtract(quarter).add(day),
        updated_at: moment().subtract(quarter).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(quarter).add(fortnight),
        rating: '3',
        status: 'failure',
        status_sort_index: 3,
      });
    });
};

