const i18n = require('i18n');
/* eslint-disable no-underscore-dangle */

class AddWorkSearchNoteViewModel {
  constructor(accountId, body, csrfToken) {
    Object.assign(this, body);
    this.csrfToken = csrfToken;
    this.accountId = accountId;
    this.isSourceUrlHidden = body.sourceType !== 'online';
  }
}

module.exports = AddWorkSearchNoteViewModel;
