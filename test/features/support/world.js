const chai = require('chai');
const DashboardPage = require('./../../common/page_objects/dashboard-page');
const AddJobPage = require('./../../common/page_objects/add-job-page');
const Fixtures = require('./fixtures');
const ScenarioData = require('./scenario-data');
const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';

process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
require('../../../bin/www');  // This starts the web server, and ensures it is only
                              // started once. It is a misuse of "require", and
                              // should be improved.

const basePath = process.env.EXPRESS_BASE_PATH || '';

const visitWithBasePath = (browser) => {
  const visit = browser.visit.bind(browser);
  return (url, ...args) => visit(basePath + url, ...args);
};

function World() {
  this.expect = chai.expect;
  this.browser = new Zombie();
  this.browser.visit = visitWithBasePath(this.browser);

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
