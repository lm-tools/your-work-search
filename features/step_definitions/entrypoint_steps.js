module.exports = function () {
  this.When(/^I access the tool with my account identifier$/, function (callback) {
    this.visit(`/?id=${this.scenarioData.accountIdentifier}`, callback);
  });
};
