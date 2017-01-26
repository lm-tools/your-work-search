const UpdateJobPage = function UpdateJobPage(browser) {
  this.browser = browser;

  this.visit = (accountId, job) => browser.visit(`/${accountId}/jobs/${job.id}`);
  this.submit = () => browser.pressButton('input[type=submit]');
};

module.exports = UpdateJobPage;
