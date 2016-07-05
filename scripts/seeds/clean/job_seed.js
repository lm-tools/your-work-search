
exports.seed = function (knex) {
  return knex('jobs').del(); // Deletes ALL existing entries
};

