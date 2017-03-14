exports.up = (knex) =>
  knex('jobs')
    .update({ status: 'failure' })
    .where({ status: 'result' });

exports.down = (knex) =>
  knex('jobs')
    .update({ status: 'result' })
    .whereIn('status', ['success', 'failure']);
