const uuid = require('node-uuid');

const ScenarioData = function ScenarioData() {
  this.accountIdentifier = uuid.v4();

  this.claimants = {};
  this.addClaimant = (claimant) => {
    this.claimants[claimant] = { accountId: uuid.v4() };
    return this.claimants[claimant];
  };
  this.idFor = (claimant) => this.claimants[claimant].accountId;

  this.jobs = [];
  this.addJob = (job) => this.jobs.unshift(job);
};

module.exports = ScenarioData;
