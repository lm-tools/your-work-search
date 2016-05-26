const chai = require('chai');
const ScenarioData = require('./ScenarioData');
const Zombie = require('zombie');
const DashboardPage = require('./DashboardPage');

require('../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.


function World() {
  this.expect = chai.expect;
  Zombie.site = 'http://localhost:3000';
  this.browser = new Zombie();

  this.scenarioData = new ScenarioData();
  this.dashboardPage = new DashboardPage(this.browser);
}

module.exports = function () {
  this.World = World;
};
