const db = require('../db');

const sortRef = {
  created: { field: 'created_at', direction: 'ASC' },
  updated: { field: 'updated_at', direction: 'DESC' },
  alpha: { field: 'title', direction: 'ASC' },
};

module.exports = db.Model.extend(
  {
    tableName: 'jobs',
    hasTimestamps: true,
  },
  {
    findAllByAccountId(accountId, sort) {
      const sortOrDefault = (sort == null) ? 'created' : sort;

      return this.forge().query({ where: { accountId } })
        .orderBy(sortRef[sortOrDefault].field, sortRef[sortOrDefault].direction)
        .fetchAll();
    },
  }
);
