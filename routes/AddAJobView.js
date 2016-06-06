class AddAJobView {
  constructor(accountId, body, validationErrors) {
    Object.assign(this, body);
    this.accountId = accountId;
    this.ratingOptions = this.addCheckedFlag(
      ['1', '2', '3', '4', '5'].map(value => ({ value })),
      body.rating
    );

    this.sourceTypeOptions = this.addCheckedFlag(
      [
        { value: 'online', label: 'Online' },
        { value: 'inPerson', label: 'In person' },
      ],
      body.sourceType || 'online'
    );

    this.errors = validationErrors;
    this.isSourceUrlHidden = body.sourceType === 'inPerson';
  }

  addCheckedFlag(options, checkedValue) {
    return options.map((opt) => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

}

module.exports = AddAJobView;
