module.exports = function () {
  this.Then(/^I should see the dashboard, within my account$/, function () {
    this.expect(this.browser.url).to.match(
      new RegExp(`/${this.scenarioData.accountIdentifier}$`),
      "should be within test users's account"
    );
  });
};
