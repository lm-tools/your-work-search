exports.up = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.string('sourceType');
    table.string('sourceUrl');
    table.date('deadline');
    table.integer('rating');
  });


exports.down = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.dropColumn('sourceType');
    table.dropColumn('sourceUrl');
    table.dropColumn('deadline');
    table.dropColumn('rating');
  });
