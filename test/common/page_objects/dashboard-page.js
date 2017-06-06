const assert = require('assert');
const url = require('url');
const request = require('supertest');

const DashboardPage = function DashboardPage(browser, app) {
  this.browser = browser;
  this.app = app;

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

  this.firstUseHelpDisplayed = () => browser.assert.elements('#first-use-help', 1);
  this.hasJobHelpDisplayed = () => browser.assert.elements('#has-job-help', 1);
  this.isSortVisible = () => browser.query('.desktop-only #sort') != null;
  this.isFilterVisible = () => browser.query('#filter') != null;
  this.selectedSortType = () => browser.text('.desktop-only #sort option:selected');
  this.clickAddJobButton = () => browser.click('a.button');
  this.jobList = () => browser.text('ul [data-test="title"]');
  this.jobCount = () => browser.queryAll('[data-test|=job-container]').length;
  this.getJobProgressionStatus = (job) => browser.text(jobElementSelector(job, 'status'));
  this.getJobProgressionStatusDate = (job) => browser.text(jobElementSelector(job, 'statusDate'));
  this.getJobProgressionStatusPriority = (job) =>
    browser.query(jobElementSelector(job, 'statusDate'))
      .className.split(/\s+/).find(it => it.startsWith('status-')).split('-')[1];
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
  this.getJobIdFromQueryParams = () =>
    url.parse(browser.request.url, { parseQueryString: true }).query.focus;

  this.getAccount = (accountId, query) => request(this.app).get(`/${accountId}`).query(query);
};

module.exports = DashboardPage;
