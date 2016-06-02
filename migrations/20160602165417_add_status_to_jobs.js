exports.up = (knex) => knex.schema.table('jobs', (table) => table.text('status'));
exports.down = (knex) => knex.schema.table('jobs', (table) => table.dropColumn('status'));
