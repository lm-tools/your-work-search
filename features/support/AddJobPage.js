const DashboardPage = function DashboardPage(browser) {
  this.browser = browser;

  this.fillJobApplication = (data) =>
    browser
      .fill('#job-title', data.jobTitle)
      .fill('#job-employer', data.employer)
      .pressButton('input[type=submit]');
};

module.exports = DashboardPage;
