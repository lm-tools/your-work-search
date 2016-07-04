const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';
const browser = new Zombie();
const screenshots = require('./screenshots');
const knexCleaner = require('knex-cleaner');
const knex = require('../../../app/db').knex;
const DashboardPage = require('../../common/page_objects/dashboard-page');
const AddJobPage = require('../../common/page_objects/add-job-page');


require('../../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

module.exports = {
  cleanDb() {
    return knexCleaner.clean(knex, { ignoreTables: ['knex_migrations'] });
  },
  browser,
  dashboardPage: new DashboardPage(browser),
  addJobPage: new AddJobPage(browser),
};
