const chai = require('chai');
const ScenarioData = require('./ScenarioData');
const Zombie = require('zombie');
const testServerPath = path => `http://localhost:3000${path}`;

require('../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.


function World() {
  this.expect = chai.expect;

  this.browser = new Zombie();
  this.scenarioData = new ScenarioData();

  this.visit = (relativeUrl, callback) => {
    this.browser.visit(testServerPath(relativeUrl), callback);
  };
}

module.exports = function () {
  this.World = World;
};
