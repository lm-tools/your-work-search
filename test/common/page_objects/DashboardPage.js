const assert = require('assert');

const DashboardPage = function DashboardPage(browser) {
  this.browser = browser;
  this.visit = (accountId) => {
    assert(accountId, 'accountId is required');
    return browser.visit(`/${accountId}`);
  };

  this.clickAddJobButton = () => browser.click('a.button');
  this.jobList = () => browser.text('ul h4');
  this.setJobProgressionStatus = (job, status) => browser
      .click(`#job-${job.id} input[name="status"][value="${status}"]`);
  this.submitJobProgressionStatus = (job, status) => this
    .setJobProgressionStatus(job, status)
    .then(() => browser.click(`#job-${job.id} input[type="submit"]`));
  this.jobProgressionStatus = (job) => browser.text(`#job-${job.id} .progression-status`);
  this.selectedProgressionStatus = (job) => {
    const element = browser.query(`#job-${job.id} input[name="status"]:checked`);
    return element && element.value;
  };
  this.getTitle = (job) => browser.text(`#job-${job.id} [data-test="title"]`);
};

module.exports = DashboardPage;
