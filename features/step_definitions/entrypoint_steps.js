module.exports = function () {
  this.When(/^I access the tool with my account identifier$/, function (callback) {
    this.visit(`/?id=${this.scenarioData.accountIdentifier}`, callback);
  });
  this.When(/^I access the tool without an account identifier$/, function (callback) {
    this.visit('/', callback);
  });
};
