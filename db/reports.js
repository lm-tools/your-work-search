const knex = require('../app/db').knex;
const json2csv = require('json2csv');
const knexResult2Csv = data => `${json2csv({ data, fields: Object.keys(data[0]), quotes: '' })}\n`;

module.exports = {
  getTotalSavedJobs: function getTotalSavedJobs() {
    return knex('jobs')
      .select('accountId as interventionRef',
        knex.raw('sum(case when status = \'interested\' then 1 else 0 end) as total_interested'),
        knex.raw('sum(case when status = \'applied\' then 1 else 0 end) as total_applied'),
        knex.raw('sum(case when status = \'interview\' then 1 else 0 end) as total_interview'),
        knex.raw('sum(case when status = \'failure\' then 1 else 0 end) as total_failure'),
        knex.raw('sum(case when status = \'success\' then 1 else 0 end) as total_success'),
        knex.raw('sum(CASE WHEN status = \'interested\' AND ' +
                  'deadline IS NOT NULL THEN 1 ELSE 0 END) ' +
                  'as total_interested_with_deadline'),
        knex.raw('sum(case when rating = 1 then 1 else 0 end) as total_1_star'),
        knex.raw('sum(case when rating = 2 then 1 else 0 end) as total_2_star'),
        knex.raw('sum(case when rating = 3 then 1 else 0 end) as total_3_star'),
        knex.raw('sum(case when rating = 4 then 1 else 0 end) as total_4_star'),
        knex.raw('sum(case when rating = 5 then 1 else 0 end) as total_5_star')
      )
      .count('accountId as totalSaved')
      .groupBy('accountId')
      .then(knexResult2Csv);
  },
};
