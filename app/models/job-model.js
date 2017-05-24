const progression = require('./progression');

class JobModel {
  constructor(dbJob) {
    Object.assign(this, dbJob);
    this.statusDate = dbJob[progression.getById(this.status).dateField];
  }
}

module.exports = JobModel;


