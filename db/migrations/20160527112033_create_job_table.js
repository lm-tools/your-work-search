exports.up = (knex) =>
  knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.string('accountId');
    table.string('title');
    table.string('employer');
    table.timestamps();
  });

exports.down = (knex) => knex.schema.dropTable('jobs');
