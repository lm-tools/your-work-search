const moment = require('moment');
const day = moment.duration(1, 'd');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');

exports.seed = function (knex) {
  return knex('jobs').where('accountId', 'EXAMPLE').del() // Deletes specific account entries

    .then(function () {
      return knex('jobs').insert({
        id: '900000401',
        accountId: 'EXAMPLE',
        title: 'People Manager',
        employer: 'Paramount Pictures',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
        details: 'Some details about the job https://hello.com',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000402',
        accountId: 'EXAMPLE',
        title: 'Human Resources Advisor',
        employer: 'JRR Events',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
        details: 'Some details about the job https://hello.com',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000403',
        accountId: 'EXAMPLE',
        title: 'HR Administrator',
        employer: 'HRT Management',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
        details: '',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000404',
        accountId: 'EXAMPLE',
        title: 'HR Advisor',
        employer: 'James Fitzgerald plc',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
        details: 'Some details about the job https://hello.com',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000405',
        accountId: 'EXAMPLE',
        title: 'HR Operations Administrator',
        employer: 'Islington Studios',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(month).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
        details: 'Some cool stuff',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000406',
        accountId: 'EXAMPLE',
        title: 'Talent Manager',
        employer: 'Joint Operations',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
        details: 'Some cool stuff',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000407',
        accountId: 'EXAMPLE',
        title: 'Regional HR Manager',
        employer: 'Snoitulos Solutions',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
        details: 'Some cool stuff',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000408',
        accountId: 'EXAMPLE',
        title: 'HR Manager',
        employer: 'Sunzoom Media',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
        details: '',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000409',
        accountId: 'EXAMPLE',
        title: 'People Manager',
        employer: 'Oswald Filigree -employer- Associates ',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
        details: '',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000410',
        accountId: 'EXAMPLE',
        title: 'Human Resources Advisor',
        employer: 'Dreamline Pictures',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
        details: '',
      });
    })
    .then(function () {
      return knex('jobs').insert({
        id: '900000411',
        accountId: 'EXAMPLE',
        title: 'HR Administrator',
        employer: 'Surreal Technology',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(fortnight).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
        details: '',
      });
    });
};

