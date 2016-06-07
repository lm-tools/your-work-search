const chai = require('chai');
const DashboardPage = require('./../../common/page_objects/DashboardPage');
const AddJobPage = require('./../../common/page_objects/AddJobPage');
const Fixtures = require('./Fixtures');
const ScenarioData = require('./ScenarioData');
const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';

require('../../../bin/www');  // This starts the web server, and ensures it is only
                              // started once. It is a misuse of "require", and
                              // should be improved.


function World() {
  this.expect = chai.expect;
  this.browser = new Zombie();

  this.fixtures = new Fixtures();
  this.scenarioData = new ScenarioData();
  this.dashboardPage = new DashboardPage(this.browser);
  this.addJobPage = new AddJobPage(this.browser);
}

module.exports = function () {
  this.World = World;
  // eslint-disable-next-line new-cap
  this.Before({ tags: ['@js-disabled'] }, function () {
    this.browser.runScripts = false;
  });
  // eslint-disable-next-line new-cap
  this.After({ tags: ['@js-disabled'] }, function () {
    this.browser.runScripts = true;
  });
};
