exports.up = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.date('successDate');
    table.date('failureDate');
  });

exports.down = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.dropColumn('successDate');
    table.dropColumn('failureDate');
  });
