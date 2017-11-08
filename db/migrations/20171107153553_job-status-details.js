exports.up = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.string('interestedDetails');
    table.string('appliedDetails');
    table.string('interviewDetails');
    table.string('failureDetails');
    table.string('successDetails');
    table.date('startDate');
  });

exports.down = (knex) =>
  knex.schema.table('jobs', (table) => {
    table.dropColumn('interestedDetails');
    table.dropColumn('appliedDetails');
    table.dropColumn('interviewDetails');
    table.dropColumn('failureDetails');
    table.dropColumn('successDetails');
    table.dropColumn('startDate');
  });
