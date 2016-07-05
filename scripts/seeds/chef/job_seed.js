const moment = require('moment');
const day = moment.duration(1, 'd');
const week = moment.duration(1, 'w');
const fortnight = moment.duration(2, 'w');
const month = moment.duration(1, 'M');

exports.seed = function (knex) {
  return knex('jobs').del() // Deletes ALL existing entries

    .then(function () {
      return knex('jobs').insert({
        id: '100',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Bubble & Squeak',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '101',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'The Salty Goblin',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '102',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'The Boar’s Shoulder',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '103',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Duke’s Arms',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '104',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Bubble & Squeak',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '105',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'Hobgoblin Inn',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '106',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'The Turtle Tavern',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '107',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'The Food Factory',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '108',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'The Red Rabit',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '109',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'Squid and Thistle ',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '110',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The King’s Whistle',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '111',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Flying Crab Tavern',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '112',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'The Lost Leprechaun',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '113',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'The Wax Minotaur',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '114',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'Fish and Gravy',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '115',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'Giggling Grapefruit',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '116',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'The Grey Goat',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '117',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Fickle Fig',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '118',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Petit Pears',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '119',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'The Raging Orchid',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '120',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'Hedgehog and Cucumber',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '121',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'The Fountainer',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '122',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'Hobnobs Inn',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '123',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'Peas & Shortbread',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '124',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'The Queen’s Stead',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '125',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'The Atrium',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '126',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Bubble & Squeak',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '127',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'The Salty Goblin',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '128',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'The Boar’s Shoulder',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interested',
        status_sort_index: 0,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '129',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Duke’s Arms',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '130',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Bubble & Squeak',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '131',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'Hobgoblin Inn',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '132',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'The Turtle Tavern',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '133',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'The Food Factory',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '134',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'The Red Rabit',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '135',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'Squid and Thistle ',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '136',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The King’s Whistle',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '137',
        accountId: 'CHEF-123',
        title: 'Commis Chef',
        employer: 'Flying Crab Tavern',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '138',
        accountId: 'CHEF-123',
        title: 'Section Chef',
        employer: 'The Lost Leprechaun',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'applied',
        status_sort_index: 1,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '139',
        accountId: 'CHEF-123',
        title: 'Chef de Cuisine',
        employer: 'The Wax Minotaur',
        created_at: moment().subtract(fortnight).add(day),
        updated_at: moment().subtract(fortnight).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '140',
        accountId: 'CHEF-123',
        title: 'Pastry Chef',
        employer: 'Fish and Gravy',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '141',
        accountId: 'CHEF-123',
        title: 'Sous Chef',
        employer: 'Giggling Grapefruit',
        created_at: moment().subtract(month).add(day),
        updated_at: moment().subtract(month).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '142',
        accountId: 'CHEF-123',
        title: 'Chef de Partie',
        employer: 'The Grey Goat',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    })

    .then(function () {
      return knex('jobs').insert({
        id: '143',
        accountId: 'CHEF-123',
        title: 'Head Chef',
        employer: 'The Fickle Fig',
        created_at: moment().subtract(week).add(day),
        updated_at: moment().subtract(week).add(day),
        sourceType: 'online',
        sourceUrl: 'http://www.stuff.com',
        deadline: '2016-07-12',
        rating: '3',
        status: 'interview',
        status_sort_index: 2,
      });
    });
};

