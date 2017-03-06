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

  this.sort = (accountId, sort) => {
    assert(accountId, 'accountId is required');
    return browser.visit(`/${accountId}?sort=${sort}`);
  };

  this.filter = (accountId, filter) => {
    assert(accountId, 'accountId is required');
    return browser.visit(`/${accountId}?filter=${filter}`);
  };

  this.focus = (accountId, focus) => {
    assert(accountId, 'accountId is required');
    return browser.visit(`/${accountId}?focus=${focus}`);
  };

  this.sortAndFilter = (accountId, sort, filter) => {
    assert(accountId, 'accountId is required');
    return browser.visit(`/${accountId}?sort=${sort}&filter=${filter}`);
  };

  this.isSortVisible = () => browser.query('#sort') != null;
  this.isFilterVisible = () => browser.query('#filter') != null;
  this.selectedSortType = () => browser.text('#sort option:selected');
  this.clickAddJobButton = () => browser.click('a.button');
  this.jobList = () => browser.text('ul [data-test="title"]');
  this.jobCount = () => browser.queryAll('[data-test|=job-container]').length;
  this.getJobProgressionStatus = (job) => browser.text(jobElementSelector(job, 'status'));
  this.getTitle = (job) => browser.text(jobElementSelector(job, 'title'));
  this.getEmployer = (job) => browser.text(jobElementSelector(job, 'employer'));
  this.getUpdated = (job) => browser.text(jobElementSelector(job, 'updated'));
  this.getInterestLevel = (job) => {
    const element = browser.query(`${jobElementSelector(job, 'rating')}:checked`);
    return element && element.value;
  };
  this.getJobSource = (job) => browser.text(jobElementSelector(job, 'source'));
  this.clickUpdateJobButton = (job) => browser.click(
    `${jobContainerSelector(job)} [data-test="update-button"]`
  );
  this.checkBrowserHasLocalLink = (link) => browser.request.url.includes(`#${link}`);
  this.browserPath = () => browser.location.pathname;
  this.checkBrowserHasQueryParam = (queryParam) => browser.request.url.includes(queryParam);
};

module.exports = DashboardPage;
