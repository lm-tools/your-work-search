const db = require('../db');
const moment = require('moment');

const sortRef = {
  created: { field: 'created_at', direction: 'DESC' },
  updated: { field: 'updated_at', direction: 'DESC' },
  title: { field: 'title', direction: 'ASC' },
  status: { field: 'status_sort_index', direction: 'DESC' },
  employer: { field: 'employer', direction: 'ASC' },
};

const historicDate = {
  week: moment().subtract(moment.duration(1, 'w')),
  fortnight: moment().subtract(moment.duration(2, 'w')),
  month: moment().subtract(moment.duration(1, 'M')),
  all: moment('2016-01-01'),
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
        let jobs = queryResult.serialize();
        const totalSavedJobs = jobs.length;

        if (options.filter) {
          jobs = jobs.filter((job) =>
            moment(job.updated_at).isAfter(historicDate[options.filter]));
        }

        return ({ totalSavedJobs, jobs });
      });
    },
  }
);
