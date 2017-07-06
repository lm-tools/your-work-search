class CookiePage {
  constructor(browser) {
    this.browser = browser;
  }

  visit(accountId) {
    return accountId ? this.browser.visit(`/${accountId}/cookie`) : this.browser.visit('/cookie');
  }

  isDisplayed() {
    return !! this.browser.text('[data-test="cookie-title"]');
  }

}
module.exports = CookiePage;
