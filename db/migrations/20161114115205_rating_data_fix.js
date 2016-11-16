exports.up = function (knex, Promise) {
  return Promise.all([
    knex('jobs').update({ rating: knex.raw('rating + 10') }),
    knex('jobs').where('rating', '=', 11).update({ rating: knex.raw('rating - 6') }),
    knex('jobs').where('rating', '=', 12).update({ rating: knex.raw('rating - 8') }),
    knex('jobs').where('rating', '=', 13).update({ rating: knex.raw('rating - 10') }),
    knex('jobs').where('rating', '=', 14).update({ rating: knex.raw('rating - 12') }),
    knex('jobs').where('rating', '=', 15).update({ rating: knex.raw('rating - 14') }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex('jobs').update({ rating: knex.raw('rating + 10') }),
    knex('jobs').where('rating', '=', 11).update({ rating: knex.raw('rating - 6') }),
    knex('jobs').where('rating', '=', 12).update({ rating: knex.raw('rating - 8') }),
    knex('jobs').where('rating', '=', 13).update({ rating: knex.raw('rating - 10') }),
    knex('jobs').where('rating', '=', 14).update({ rating: knex.raw('rating - 12') }),
    knex('jobs').where('rating', '=', 15).update({ rating: knex.raw('rating - 14') }),
  ]);
};
