const DashboardPage = function DashboardPage(browser) {
  this.browser = browser;
  this.visit = (accountId) => browser.visit(`/${accountId}`);

  this.clickAddJobButton = () => browser.click('a.button');
  this.jobList = () => browser.text('ul h4');
};

module.exports = DashboardPage;
