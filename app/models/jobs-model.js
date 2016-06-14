const db = require('../db');

module.exports = db.Model.extend(
  {
    tableName: 'jobs',
    hasTimestamps: true,
  },
  {
    findAllByAccountId(accountId) {
      return this.forge().query({ where: { accountId } })
        .fetchAll();
    },

    findAllByAccountIdWithSort(accountId, sort) {
      const sortType = {
        created: { field: 'created_at', direction: 'ASC' },
        updated: { field: 'updated_at', direction: 'DESC' },
        alpha: { field: 'title', direction: 'ASC' },
      };

      return this.forge().query({ where: { accountId } })
        .orderBy(sortType[sort].field, sortType[sort].direction)
        .fetchAll();
    },
  }
);
