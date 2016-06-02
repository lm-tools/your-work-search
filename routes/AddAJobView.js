class AddAJobView {
  constructor(accountId, body, validationErrors) {
    this.accountId = accountId;
    this.body = body;
    this.errors = validationErrors;
    this.options = [
      { value: 'online', label: 'Online' },
      { value: 'inPerson', label: 'In person' },
    ];
  }

  getSourceTypeOptions(checkedValue) {
    return this.options.map((opt) => Object.assign(opt, { isChecked: opt.value === checkedValue }));
  }

  build() {
    return Object.assign(this.body,
      {
        accountId: this.accountId,
        sourceTypeOptions: this.getSourceTypeOptions(this.body.sourceType || 'online'),
        errors: this.errors,
        isSourceUrlHidden: () => this.body.sourceType === 'inPerson',
      }
    );
  }
}

module.exports = AddAJobView;
