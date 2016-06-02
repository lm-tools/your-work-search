module.exports = function () {
  this.Then(/^I should see the dashboard, within my account$/, function () {
    this.expect(this.browser.url).to.match(
      new RegExp(`/${this.scenarioData.accountIdentifier}$`),
      "should be within test users's account"
    );
  });

  this.Then(/^I should see the dashboard, within a new account$/, function () {
    this.expect(this.browser.url).to.match(
      /\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/i,
      'a valid account identifier should be allocated'
    );
    this.expect(this.browser.url).not.to.match(
      new RegExp(`/${this.scenarioData.accountIdentifier}$`),
      'a new account identifier should be allocated'
    );
  });
};
