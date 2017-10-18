const progression = require('./progression');

class WorkSearchNoteModel {
  constructor(dbNote) {
    Object.assign(this, dbNote);
    this.statusDate = dbNote[progression.getById(this.status).dateField];
  }
}

module.exports = WorkSearchNoteModel;

