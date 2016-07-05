class ConfirmationPage {
  constructor(browser) {
    this.browser = browser;
  }

  getDescription() {
    return this.browser.text('[data-test="confirmation-description"]');
  }

  clickBack() {
    return this.browser.click('[data-test="back"]');
  }
}
module.exports = ConfirmationPage;
