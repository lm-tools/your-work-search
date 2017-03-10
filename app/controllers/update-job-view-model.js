const i18n = require('i18n');
const progression = require('../models/progression');
/* eslint-disable no-underscore-dangle */

class UpdateJobViewModel {
  constructor(accountId, job, basePath) {
    Object.assign(this, job);
    this.accountId = accountId;
    this.basePath = basePath;

    const ratingOptionList = [5, 4, 3, 2, 1].map(value => ({ value }));
    this.ratingOptions = this.addCheckedFlag(ratingOptionList, job.rating);
    this.progression = this.jobProgression();
  }

  jobProgression() {
    return progression.getAllIds().map((status) => ({
      name: status,
      isChecked: (this.status === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.${status}`),
    }));
  }

  addCheckedFlag(options, checkedValue) {
    return options.map(opt => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

}

module.exports = UpdateJobViewModel;
