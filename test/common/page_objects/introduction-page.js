const IntroductionPage = function IntroductionPage(browser) {
  this.browser = browser;

  this.visit = (accountId) => this.browser.visit(`/${accountId}/introduction`);
  this.clickNext = () => this.browser.click('[data-test="next"]');
  this.browserPath = () => browser.location.pathname;
};

module.exports = IntroductionPage;
