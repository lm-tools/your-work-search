class AddAJobView {
  constructor(accountId, body, validationErrors) {
    this.accountId = accountId;
    this.body = body;
    this.errors = validationErrors;
    this.options = [
      { value: 'online', label: 'Online' },
      { value: 'inPerson', label: 'In person' },
    ];
    this.ratingOptions = ['1', '2', '3', '4', '5'].map(value => ({ value }));
  }

  addCheckedFlag(options, checkedValue) {
    return options.map((opt) => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

  build() {
    const model = {
      accountId: this.accountId,
      sourceTypeOptions: this.addCheckedFlag(this.options, this.body.sourceType || 'online'),
      ratingOptions: this.addCheckedFlag(this.ratingOptions, this.body.rating),
      errors: this.errors,
      isSourceUrlHidden: this.body.sourceType === 'inPerson',
    };

    return Object.assign(this.body, model);
  }
}

module.exports = AddAJobView;
