const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';
const browser = new Zombie();
const screenshots = require('./screenshots');
const dbHelper = require('./db-helper');
const IntroductionPage = require('../../common/page_objects/introduction-page');
const DashboardPage = require('../../common/page_objects/dashboard-page');
const AddJobPage = require('../../common/page_objects/add-job-page');
const UpdateJobPage = require('../../common/page_objects/update-job-page');
const ConfirmationPage = require('../../common/page_objects/confirmation-page');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');


process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
require('../../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

module.exports = Object.assign(
  {
    browser,
    addJobPage: new AddJobPage(browser),
    updateJobPage: new UpdateJobPage(browser),
    googleTagManagerHelper: new GoogleTagManagerHelper(browser),
    confirmationPage: new ConfirmationPage(browser),
    dashboardPage: new DashboardPage(browser),
    introductionPage: new IntroductionPage(browser),
  },
  dbHelper
);
