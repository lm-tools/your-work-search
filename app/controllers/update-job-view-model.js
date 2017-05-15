const progressionModel = require('../models/progression');
const progressionDecorator = require('./progression-view-decorator');

class UpdateJobViewModel {
  constructor(accountId, job, basePath) {
    Object.assign(this, job);
    this.accountId = accountId;
    this.basePath = basePath;

    const ratingOptionList = [5, 4, 3, 2, 1].map(value => ({ value }));
    this.ratingOptions = this.addCheckedFlag(ratingOptionList, job.rating);
    this.progression = progressionDecorator.decorate(
      progressionModel.getAllIds(), this.status, job);
  }
  addCheckedFlag(options, checkedValue) {
    return options.map(opt => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }
}

module.exports = UpdateJobViewModel;
