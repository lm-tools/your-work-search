const helper = require('./support/integration-spec-helper');

const dashboardPage = helper.dashboardPage;

describe('Entrypoints', () => {
  const accountId = 'someAccountId';
  const dashboardUrl = `/${accountId}`;

  describe('Access the tool for the first time with my account id', () => {
    it('should see the dashboard page', () =>
      dashboardPage.browser.visit(`/?id=${accountId}`)
        .then(() => dashboardPage.browser.assert.url({ pathname: dashboardUrl }))
    );
  });

  describe('Access an existing account with my account id', () => {
    before(function () {
      dashboardPage.browser.visit(`/?id=${accountId}`);
    });

    it('should see the dashboard page', () =>
      dashboardPage.browser.visit(`/${accountId}`)
        .then(() => dashboardPage.browser.assert.url({ pathname: dashboardUrl }))
    );
  });

  describe('Access the tool without an account identifier', () => {
    it('should see the dashboard page', () =>
      dashboardPage.browser.visit('/')
        .then(() => dashboardPage.browser.assert.url(
          new RegExp('/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$')))
    );
  });
});

