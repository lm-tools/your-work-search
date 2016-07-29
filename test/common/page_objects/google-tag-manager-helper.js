class GoogleTagManagerHelper {
  constructor(browser) {
    this.browser = browser;
  }

  getAccountVariable() {
    return this.browser.window.dataLayer[0].accountId;
  }
}
module.exports = GoogleTagManagerHelper;
