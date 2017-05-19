exports.up = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.date('deadlineDate');
    table.date('applicationDate');
    table.date('interviewDate');
  });

exports.down = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.dropColumn('deadlineDate');
    table.dropColumn('applicationDate');
    table.dropColumn('interviewDate');
  });
