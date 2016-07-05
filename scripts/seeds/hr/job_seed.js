const moment = require('moment');
const day = moment.duration(1, 'd');
const week = moment.duration(1, 'w');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');

exports.seed = function (knex) {
    return knex('jobs').insert({
      id: '200',
      accountId: 'HR-123',
      title: 'HR Manager',
      employer: 'Herbert and Schenkel',
      created_at: moment().subtract(month).add(day),
      updated_at: moment().subtract(month).add(day),
      sourceType: 'online',
      sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
      deadline: moment().subtract(month).add(day).add(fortnight),
      rating: '3',
      status: 'result',
      status_sort_index: 3,
    })
    .then(function () {
      return knex('jobs').insert({
        id: '201',
        accountId: 'HR-123',
        title: 'People Manager',
        employer: 'Paramount Pictures',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(day).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '202',
        accountId: 'HR-123',
        title: 'Human Resources Advisor',
        employer: 'JRR Events',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(day).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '203',
        accountId: 'HR-123',
        title: 'HR Administrator',
        employer: 'HRT Management',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '204',
        accountId: 'HR-123',
        title: 'HR Advisor',
        employer: 'James Fitzgerald plc',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '205',
        accountId: 'HR-123',
        title: 'HR Operations Administrator',
        employer: 'Islington Studios',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(day).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '206',
        accountId: 'HR-123',
        title: 'Talent Manager',
        employer: 'Joint Operations',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '207',
        accountId: 'HR-123',
        title: 'Regional HR Manager',
        employer: 'Snoitulos Solutions',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '208',
        accountId: 'HR-123',
        title: 'HR Manager',
        employer: 'Sunzoom Media',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(day).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '209',
        accountId: 'HR-123',
        title: 'People Manager',
        employer: 'Oswald Filigree -employer- Associates ',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '210',
        accountId: 'HR-123',
        title: 'Human Resources Advisor',
        employer: 'Dreamline Pictures',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(day).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '211',
        accountId: 'HR-123',
        title: 'HR Administrator',
        employer: 'Surreal Technology',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(day).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '212',
        accountId: 'HR-123',
        title: 'HR Advisor',
        employer: 'Indigo Operations',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '213',
        accountId: 'HR-123',
        title: 'HR Operations Administrator',
        employer: 'Foundation Consulting',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(day).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '214',
        accountId: 'HR-123',
        title: 'Talent Manager',
        employer: 'Discover Technologic',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(day).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })
};

