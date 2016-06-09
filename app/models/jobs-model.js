const db = require('../db');

module.exports = db.Model.extend(
  {
    tableName: 'jobs',
    hasTimestamps: true,
  },
  {
    findAllByAccountId(accountId) {
      return this.forge().query({ where: { accountId } }).fetchAll();
    },
  }
);
