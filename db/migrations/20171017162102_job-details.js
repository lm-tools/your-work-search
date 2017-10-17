exports.up = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.string('details');
  });

exports.down = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.dropColumn('details');
  });
