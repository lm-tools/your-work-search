const progression = require('./progression');

class NoteModel {
  constructor(dbNote) {
    Object.assign(this, dbNote);
  }
}

module.exports = NoteModel;

