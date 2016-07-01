const db = require('../db');
const moment = require('moment');

const sortRef = {
  created: { field: 'created_at', direction: 'DESC' },
  updated: { field: 'updated_at', direction: 'DESC' },
  title: { field: 'title', direction: 'ASC' },
  deadline: { field: 'deadline', direction: 'ASC' },
  status: { field: 'status_sort_index', direction: 'DESC' },
  employer: { field: 'employer', direction: 'ASC' },
};

const historicDate = {
  week: moment().subtract(moment.duration(1, 'w')),
  fortnight: moment().subtract(moment.duration(2, 'w')),
  month: moment().subtract(moment.duration(1, 'M')),
  none: moment('2016-01-01'),
};

module.exports = db.Model.extend(
  {
    tableName: 'jobs',
    hasTimestamps: true,
  },
  {
    findAllByAccountId(accountId, sort, filter) {
      const sortOrDefault = sort || 'created';
      const filterOrDefault = filter || 'none';

      return this.forge().query({ where: { accountId } })
        .where('updated_at', '>', historicDate[filterOrDefault].format('YYYY-MM-DD'))
        .orderBy(sortRef[sortOrDefault].field, sortRef[sortOrDefault].direction)
        .fetchAll();
    },
  }
);
