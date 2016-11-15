const i18n = require('i18n');
/* eslint-disable no-underscore-dangle */

class AddJobViewModel {
  constructor(accountId, body, validationErrors) {
    Object.assign(this, body);
    this.accountId = accountId;
    this.ratingOptions = this.addCheckedFlag(
      ['5', '4', '3', '2', '1'].map(value => ({ value })),
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
  }

  addCheckedFlag(options, checkedValue) {
    return options.map((opt) => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

}

module.exports = AddJobViewModel;
