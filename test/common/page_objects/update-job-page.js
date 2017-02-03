const UpdateJobPage = function UpdateJobPage(browser) {
  this.browser = browser;

  this.visit = (accountId, job) => browser.visit(`/${accountId}/jobs/${job.id}`);
  this.clickSave = () => browser.pressButton('[data-test="save"]');
  this.getJobTitle = () => browser.text('[data-test="title"]');
  this.getJobEmployer = () => browser.text('[data-test="employer"]');
  this.getJobSource = () => browser.text('[data-test="source"]');
  this.getJobProgress = () => browser.query('[data-test="progression"] input[checked]').value;
  this.getJobRating = () => browser.query('[data-test="rating"] input[checked]').value;
  this.setJobProgression = (status) => browser
    .click(`[data-test="progression"] input[value="${status}"]`);
  this.setJobRating = (rating) => browser
    .click(`[data-test="rating"] input[value="${rating}"]`);
  this.deleteJob = () => browser.click('[data-test="delete-button"]');
};

module.exports = UpdateJobPage;
