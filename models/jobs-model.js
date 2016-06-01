const db = require('../db');

module.exports = db.Model.extend(
  {
    tableName: 'jobs',
  },
  {
    findAllByAccountId(accountId) {
      return this.forge().query({ where: { accountId } }).fetchAll();
    },
  }
);
