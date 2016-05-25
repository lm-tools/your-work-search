const uuid = require('node-uuid');

const ScenarioData = function ScenarioData() {
  this.accountIdentifier = uuid.v4();
};

module.exports = ScenarioData;
