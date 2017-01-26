const UpdateJobPage = function UpdateJobPage(browser) {
  this.browser = browser;

  this.visit = (accountId, job) => browser.visit(`/${accountId}/jobs/${job.id}`);
  this.submit = () => browser.pressButton('input[type="submit"]');
  this.getJobTitle = () => browser.text('[data-test="title"]');
  this.getJobEmployer = () => browser.text('[data-test="employer"]');
  this.getJobSource = () => browser.text('[data-test="source"]');
  this.getJobProgress = () => browser.query('[data-test="progression"] input[checked]').value;
  this.getJobRating = () => browser.query('[data-test="rating"] input[checked]').value;
  this.setJobProgression = (status) => browser
    .click(`[data-test="progression"] input[value="${status}"]`);
};

module.exports = UpdateJobPage;
