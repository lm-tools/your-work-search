const db = require('../db');

const sortRef = {
  created: { field: 'created_at', direction: 'DESC' },
  updated: { field: 'updated_at', direction: 'DESC' },
  title: { field: 'title', direction: 'ASC' },
  status: { field: 'status_sort_index', direction: 'DESC' },
  employer: { field: 'employer', direction: 'ASC' },
};

module.exports = db.Model.extend(
  {
    tableName: 'jobs',
    hasTimestamps: true,
  },
  {
    findAllByAccountId(accountId, options = {}) {
      let query = this.forge().query({ where: { accountId } });

      if (options.sort) {
        query = query.orderBy(sortRef[options.sort].field, sortRef[options.sort].direction);
      }

      return query.fetchAll().then((queryResult) => {
        const jobs = queryResult.serialize();
        const totalSavedJobs = jobs.length;
        return ({ totalSavedJobs, jobs });
      });
    },
  }
);
