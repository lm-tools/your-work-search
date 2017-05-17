const i18n = require('i18n');
const progression = require('../models/progression');
const ratings = require('../models/ratings');
const progressionDecorator = require('./progression-view-decorator');
/* eslint-disable no-underscore-dangle */

class AddJobViewModel {
  constructor(accountId, body, csrfToken, validationErrors) {
    Object.assign(this, body);
    this.csrfToken = csrfToken;
    this.accountId = accountId;
    this.ratingOptions = this.addCheckedFlag(
      ratings.reverse().map(value => ({ value })),
      body.rating
    );

    this.sourceTypeOptions = this.addCheckedFlag(
      [
        { value: 'online', label: i18n.__('sourceType.online') },
        { value: 'inPerson', label: i18n.__('sourceType.inPerson') },
      ],
      body.sourceType
    );

    this.errors = validationErrors;
    this.isSourceUrlHidden = body.sourceType !== 'online';
    this.progression = progressionDecorator.decorate(progression.getInitialSubset(), this.status);
  }

  addCheckedFlag(options, checkedValue) {
    return options.map((opt) => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

}

module.exports = AddJobViewModel;
