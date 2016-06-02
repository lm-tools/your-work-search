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
      .click(`#job-${job.id} input[name="status"][value="${status}"]`)
      .then(() => browser.click(`#job-${job.id} input[type="submit"]`));
  this.jobProgressionStatus = (job) => browser.text(`#job-${job.id} .progression-status`);
};

module.exports = DashboardPage;
