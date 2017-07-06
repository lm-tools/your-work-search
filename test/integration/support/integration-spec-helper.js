const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';
const browser = new Zombie();
const screenshots = require('./screenshots');
const dbHelper = require('./db-helper');
const DashboardPage = require('../../common/page_objects/dashboard-page');
const AddJobPage = require('../../common/page_objects/add-job-page');
const UpdateJobPage = require('../../common/page_objects/update-job-page');
const ConfirmationPage = require('../../common/page_objects/confirmation-page');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const labels = require('../../../app/locales/en.json');
const ErrorPage = require('../../common/page_objects/error-page');
const CookiePage = require('../../common/page_objects/cookie-page');


process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
const app = require('../../../bin/www'); // This starts the web server, and ensures it is only
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
    addJobPage: new AddJobPage(browser, app),
    updateJobPage: new UpdateJobPage(browser, app),
    googleTagManagerHelper: new GoogleTagManagerHelper(browser),
    confirmationPage: new ConfirmationPage(browser),
    dashboardPage: new DashboardPage(browser, app),
    errorPage: new ErrorPage(browser),
    cookiePage: new CookiePage(browser),
    labels,
    app,
  },
  dbHelper
);
