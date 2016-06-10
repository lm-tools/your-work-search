const assert = require('assert');

const DashboardPage = function DashboardPage(browser) {
  this.browser = browser;

  function jobContainerSelector(job) {
    return `[data-test="job-container-${job.id}"]`;
  }

  function jobElementSelector(job, element) {
    return `${jobContainerSelector(job)} [data-test="${element}"]`;
  }

  this.visit = (accountId) => {
    assert(accountId, 'accountId is required');
    return browser.visit(`/${accountId}`);
  };

  this.clickAddJobButton = () => browser.click('a.button');
  this.jobList = () => browser.text('ul h4');
  this.jobCount = () => browser.queryAll('[data-test|=job-container]').length;
  this.setJobProgressionStatus = (job, status) => browser
      .click(`${jobElementSelector(job, 'progression')}[value="${status}"]`);
  this.submitJobProgressionStatus = (job, status) => this
    .setJobProgressionStatus(job, status)
    .then(() => browser.click(`${jobContainerSelector(job)} input[type="submit"]`));
  this.getJobProgressionStatus = (job) => browser.text(jobElementSelector(job, 'status'));
  this.getSelectedProgressionStatus = (job) => {
    const element = browser.query(`${jobElementSelector(job, 'progression')}:checked`);
    return element && element.value;
  };
  this.getTitle = (job) => browser.text(jobElementSelector(job, 'title'));
  this.getEmployer = (job) => browser.text(jobElementSelector(job, 'employer'));
};

module.exports = DashboardPage;
