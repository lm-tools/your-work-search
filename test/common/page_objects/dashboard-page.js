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

  this.timelineStatusSize = (status) =>
    Number(
      browser.query(`[data-test=timeline] [data-test=${status}]`)
        .className
        .match(/size-(\d+)/)[1]
    );

  this.isFirstUseHelpDisplayed = () => browser.query('#first-use-help') != null;
  this.isHasJobHelpDisplayed = () => browser.query('#has-job-help') != null;
  this.isSortVisible = () => browser.query('#sort') != null;
  this.isFilterVisible = () => browser.query('#filter') != null;
  this.selectedSortType = () => browser.text('#sort option:selected');
  this.selectedFilterType = () => browser.text('#filter option:selected');
  this.clickAddJobButton = () => browser.click('a.button');
  this.clickJobDetailsButton = job => browser.click(jobElementSelector(job, 'details-button'));
  this.jobList = () => browser.text('ul [data-test="title"]');
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
  this.getDeadline = (job) => browser.text(jobElementSelector(job, 'deadline'));
  this.getUpdated = (job) => browser.text(jobElementSelector(job, 'updated'));
  this.getInterestLevel = (job) => {
    const element = browser.query(`${jobElementSelector(job, 'rating')}:checked`);
    return element && element.value;
  };
  this.getJobSource = (job) => browser.text(jobElementSelector(job, 'source'));
  this.hasJobSource = (job) => !!browser.query(jobElementSelector(job, 'source'));
  this.isJobDetailsVisible = job => !browser.query(jobElementSelector(job, 'details'))
      .className.split(/\s+/).includes('js-hidden');

  this.deleteJob = (job) => browser.click(
    `${jobContainerSelector(job)} [data-test="delete-button"]`
  );
  this.checkBrowserHasLocalLink = (link) => browser.request.url.includes(`#${link}`);
  this.browserPath = () => browser.location.pathname;
  this.checkBrowserHasQueryParam = (queryParam) => browser.request.url.includes(queryParam);
};

module.exports = DashboardPage;
