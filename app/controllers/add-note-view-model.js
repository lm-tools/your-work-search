const i18n = require('i18n');
/* eslint-disable no-underscore-dangle */

class AddWorkSearchNoteViewModel {
  constructor(accountId, body, csrfToken, validationErrors) {
    Object.assign(this, body);
    this.csrfToken = csrfToken;
    this.accountId = accountId;
    this.isSourceUrlHidden = body.sourceType !== 'online';
    this.validationErrors = validationErrors;
  }
}

module.exports = AddWorkSearchNoteViewModel;
