const knex = require('../app/db').knex;

module.exports = {
  getTotalSavedJobs: function getTotalSavedJobs() {
    let output = 'interventionRef,totalSaved\n';

    return knex('jobs')
      .select('accountId as interventionRef')
      .count('accountId as totalSaved')
      .groupBy('accountId')
      .then((result) => {
        result.forEach((account) => {
          output += `${account.interventionRef},${account.totalSaved}\n`;
        });
        return output;
      });
  },
};
