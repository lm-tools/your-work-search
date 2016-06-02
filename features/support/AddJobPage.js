const AddJobPage = function AddJobPage(browser) {
  this.browser = browser;

  this.fillJobApplication = (data) =>
    browser
      .fill('#job-title', data.jobTitle)
      .fill('#job-employer', data.employer)
      .pressButton('input[type=submit]');

  this.getValidationError = () => browser.text('#validation-errors');
};

module.exports = AddJobPage;
