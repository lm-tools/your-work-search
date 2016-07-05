const moment = require('moment');
const day = moment.duration(1, 'd');
const week = moment.duration(1, 'w');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');
const quarter = moment.duration(3, 'M');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries

    .then(function () {
      return knex('jobs').insert({
        id: '900',
        accountId: 'TEST-123',
        title: 'Title-900',
        employer: 'Employer-900',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '901',
        accountId: 'TEST-123',
        title: 'Title-901',
        employer: 'Employer-901',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '902',
        accountId: 'TEST-123',
        title: 'Title-902',
        employer: 'Employer-902',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '903',
        accountId: 'TEST-123',
        title: 'Title-903',
        employer: 'Employer-903',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '904',
        accountId: 'TEST-123',
        title: 'Title-904',
        employer: 'Employer-904',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '905',
        accountId: 'TEST-123',
        title: 'Title-905',
        employer: 'Employer-905',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '906',
        accountId: 'TEST-123',
        title: 'Title-906',
        employer: 'Employer-906',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'result',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '907',
        accountId: 'TEST-123',
        title: 'Title-907',
        employer: 'Employer-907',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'result',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '908',
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
        id: '909',
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
        id: '910',
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
        id: '911',
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
        id: '912',
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
        id: '913',
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
        id: '914',
        accountId: 'TEST-123',
        title: 'Title-914',
        employer: 'Employer-914',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'result',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '915',
        accountId: 'TEST-123',
        title: 'Title-915',
        employer: 'Employer-915',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'result',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '916',
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
        id: '917',
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
        id: '918',
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
        id: '919',
        accountId: 'TEST-123',
        title: 'Title-919',
        employer: 'Employer-919',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'result',
        status_sort_index: 3,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '920',
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
        id: '921',
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
        id: '922',
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
        id: '923',
        accountId: 'TEST-123',
        title: 'Title-923',
        employer: 'Employer-923',
        created_at: moment().subtract(quarter).add(day),
        updated_at: moment().subtract(quarter).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(quarter).add(fortnight),
        rating: '3',
        status: 'result',
        status_sort_index: 3,
      });
    });
};

