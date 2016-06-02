module.exports = function () {
  this.When(/^I access the tool with my account identifier$/, function () {
    return this.browser.visit(`/?id=${this.scenarioData.accountIdentifier}`);
  });

  this.When(/^I access the tool without an account identifier$/, function () {
    return this.browser.visit('/');
  });
};
