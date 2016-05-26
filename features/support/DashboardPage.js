const querystring = require('querystring');

const DashboardPage = function DashboardPage(browser) {
  this.browser = browser;

  function toQueryString(params) {
    return params ? `?${querystring.stringify(params)}` : '';
  }

  this.visit = (params) => browser.visit(`/${toQueryString(params)}`);
};

module.exports = DashboardPage;
