const expect = require('chai').expect;
const uuid = require('node-uuid');
const helper = require('./support/integration-spec-helper');
const browser = helper.browser;
const dashboardPage = helper.dashboardPage;

describe('Entrypoints', () => {
  const accountId = uuid.v4();
  const dashboardUrl = `/${accountId}`;
  const addJobUrl = `/${accountId}/jobs/new`;
  const introductionUrl = `/${accountId}/introduction`;

  describe('Access the tool with my account id BEFORE ive added a job', () => {
    before(() =>
      helper.cleanDb()
    );

    it('should see the introduction page', () =>
      browser.visit(`/?id=${accountId}`)
        .then(() => browser.assert.url({ pathname: introductionUrl }))
    );
  });

  describe('Access dashboard', () => {
    beforeEach(() => helper.cleanDb());

    it('should redirect to add a job page if no job added yet', () =>
      browser.visit(`/${accountId}`)
        .then(() => browser.assert.url({ pathname: addJobUrl }))
    );
    it('should display dashboard page if jobs already added', () =>
      helper.createJobsInDb(helper.sampleJob({ accountId: `${accountId}` }))
        .then(() => browser.visit(`/${accountId}`))
        .then(() => browser.assert.url({ pathname: dashboardUrl }))
        .then(() => expect(dashboardPage.jobCount()).to.equal(1))
    );
  });

  describe('Access the tool without an account identifier', () => {
    before(() =>
      helper.cleanDb()
    );

    it('should see an informative message when requested from base', () =>
      browser.visit('/')
        .then(() => browser.assert.text(
          '#heading', 'Sign in to your account'))
    );

    it('should see an informative message when no query id sent', () =>
      browser.visit('/?id=')
        .then(() => browser.assert.text(
          '#heading', 'Sign in to your account'))
    );

    it('should see an informative message if invalid account id', () =>
      browser.visit('/?id=something-rubbish')
        .then(() => browser.assert.text(
          '#heading', 'Sign in to your account'))
    );
  });
});

