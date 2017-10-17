exports.up = (knex) =>
  knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.string('accountId');
    table.string('details');
    table.timestamps();
  });

exports.down = (knex) => knex.schema.dropTable('notes');
