const AddJobPage = function AddJobPage(browser) {
  this.browser = browser;

  this.fillJobApplication = (data) =>
    browser
      .fill('#job-title', data.title)
      .fill('#job-employer', data.employer)
      .choose(`#job-sourceType-${data.sourceType}`)
      .fill('#job-sourceUrl', data.sourceUrl)
      .pressButton('input[type=submit]');

  this.getValidationError = () => browser.text('#validation-errors');

  this.visit = (accountId) => browser.visit(`/${accountId}/jobs/new`);

  this.employerFieldValue = () => browser.field('#job-employer').value;
  this.chooseSourceType = (sourceType) => browser.choose(`#job-sourceType-${sourceType}`);
  this.isSourceUrlHidden = () =>
    browser.query('#job-sourceUrl-group').className.split(/\s+/).includes('js-hidden');
};

module.exports = AddJobPage;
