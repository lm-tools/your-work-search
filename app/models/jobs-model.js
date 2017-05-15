const db = require('../db');
const progression = require('./progression');

class JobModel {
  constructor(dbJob) {
    Object.assign(this, dbJob);
    this.statusDate = dbJob[progression.getById(this.status).dateField];
  }
}

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
        const jobs = queryResult.serialize().map(it => new JobModel(it));
        const totalSavedJobs = jobs.length;
        return ({ totalSavedJobs, jobs });
      });
    },
  }
);
