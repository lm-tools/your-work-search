exports.up = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.integer('status_sort_index');
  });


exports.down = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.dropColumn('status_sort_index');
  });
