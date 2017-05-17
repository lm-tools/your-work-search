const progression = require('../models/progression');
const progressionDecorator = require('./progression-view-decorator');

class UpdateJobViewModel {
  constructor(accountId, job, basePath, csrfToken) {
    Object.assign(this, job);
    this.csrfToken = csrfToken;
    this.accountId = accountId;
    this.basePath = basePath;

    const ratingOptionList = [5, 4, 3, 2, 1].map(value => ({ value }));
    this.ratingOptions = this.addCheckedFlag(ratingOptionList, job.rating);
    this.progression = progressionDecorator.decorate(progression.getAllIds(), this.status);
  }
  addCheckedFlag(options, checkedValue) {
    return options.map(opt => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

}

module.exports = UpdateJobViewModel;
