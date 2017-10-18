const db = require('../db');
const NoteModel = require('./note-model');

module.exports = db.Model.extend(
  {
    tableName: 'notes',
    hasTimestamps: true,
  },
  {
    findAllByAccountId(accountId) {
      let query = this.forge().query({ where: { accountId } });

      return query.fetchAll().then(queryResult => {
        const notes = queryResult.serialize().map(it => new NoteModel(it));
        const totalNotes = notes.length;
        return ({ totalNotes, notes });
      });
    },
  }
);
