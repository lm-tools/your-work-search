const uuid = require('node-uuid');

const ScenarioData = function ScenarioData() {
  this.claimants = {};
  this.accountIdentifier = uuid.v4();
  this.addClaimant = (claimant) => {
    this.claimants[claimant] = { accountId: uuid.v4() };
    return this.claimants[claimant];
  };
  this.idFor = (claimant) => this.claimants[claimant].accountId;
};

module.exports = ScenarioData;
