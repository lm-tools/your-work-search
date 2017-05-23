const progression = require('../models/progression');
const progressionDecorator = require('./progression-view-decorator');
const ratings = require('../models/ratings');
const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD';

class UpdateJobViewModel {
  constructor(accountId, job, basePath, csrfToken, validationErrors) {
    Object.assign(this, job);
    this.csrfToken = csrfToken;
    this.accountId = accountId;
    this.basePath = basePath;
    this.errors = validationErrors;

    this.ratingOptions = this.addCheckedFlag(
      ratings().reverse().map(value => ({ value })),
      job.rating
    );

    progression.getAllDateFields().forEach(df => {
      if (this[df]) {
        this[df] = moment(this[df]).format(DATE_FORMAT);
      }
    });
    this.progression = progressionDecorator.decorate(progression.getAllIds(), this.status);
  }

  addCheckedFlag(options, checkedValue) {
    return options.map(opt => Object.assign({}, opt,
      { isChecked: checkedValue && (opt.value.toString() === checkedValue.toString()) }
    ));
  }

}

module.exports = UpdateJobViewModel;
