const moment = require('moment');
const day = moment.duration(1, 'd');
const week = moment.duration(1, 'w');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');

exports.seed = function (knex) {
  return knex('jobs').where('accountId', 'CHEF-123').del() // Deletes specific account entries

    .then(function () {
      return knex('jobs').insert({
        id: '900000100',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'The Green Goblin',
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
        id: '900000101',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'The Boar’s Shoulder',
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
        id: '900000102',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Duke’s Arms',
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
        id: '900000103',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Bubble -employer- Squeak',
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
        id: '900000104',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'Hobgoblin Inn',
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
        id: '900000105',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'The Turtle Tavern',
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
        id: '900000106',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'The Food Factory',
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
        id: '900000107',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'The Red Rabit',
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
        id: '900000108',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'Squid and Thistle ',
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
        id: '900000109',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The King’s Whistle',
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
        id: '900000110',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Flying Crab Tavern',
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
        id: '900000111',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'The Lost Leprechaun',
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
        id: '900000112',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'The Wax Minotaur',
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
        id: '900000113',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'Fish and Gravy',
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
        id: '900000114',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'Giggling Grapefruit',
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
        id: '900000115',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'The Grey Goat',
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
        id: '900000116',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Fickle Fig',
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
        id: '900000117',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Petit Pears',
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
        id: '900000118',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'The Raging Orchid',
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
        id: '900000119',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'Hedgehog and Cucumber',
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
        id: '900000120',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'The Fountainer',
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
        id: '900000121',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'Hobnobs Inn',
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
        id: '900000122',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'Peas -employer- Shortbread',
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
        id: '900000123',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Queen’s Stead',
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
        id: '900000124',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'The Atrium',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.indeed.com/kjsdjflisdn',
        deadline: moment().subtract(week).add(fortnight),
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    });
};

