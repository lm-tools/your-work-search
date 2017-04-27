const expect = require('chai').expect;
const uuid = require('node-uuid');
const helper = require('./support/integration-spec-helper');
const browser = helper.browser;
const dashboardPage = helper.dashboardPage;

describe('Entrypoints', () => {
  const accountId = uuid.v4();
  const dashboardUrl = `/${accountId}`;
  const addJobUrl = `/${accountId}/jobs/new`;
  const exampleDashboardUrl = '/EXAMPLE';

  describe('Access the tool with my account id BEFORE ive added a job', () => {
    before(() =>
      helper.cleanDb()
    );

    it('should see the add job page', () =>
      browser.visit(`/?id=${accountId}`)
        .then(() => browser.assert.url({ pathname: addJobUrl }))
    );
  });

  describe('Access the tool with my account id AFTER ive added a job', () => {
    before(() =>
      helper.cleanDb()
      .then(() => helper.createJobsInDb(helper.sampleJob({ accountId: `${accountId}` })))
    );

    it('should see the dashboard page', () =>
      browser.visit(`/?id=${accountId}`)
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


  describe('FIX agent viewing EXAMPLE', () => {
    it('should redirect to add job when url params before job has been added', () =>
      helper.cleanDb()
        .then(() => browser.visit(`/EXAMPLE?id=${accountId}`))
        .then(() => browser.assert.url({ pathname: addJobUrl }))
    );

    it('should redirect to dashboard when url params after job has been added', () =>
      helper.cleanDb()
        .then(() => helper.createJobsInDb(helper.sampleJob({ accountId: `${accountId}` })))
        .then(() => browser.visit(`/EXAMPLE?id=${accountId}`))
        .then(() => browser.assert.url({ pathname: dashboardUrl }))
    );

    it('should redirect to EXAMPLE dashboard when no url params', () =>
      helper.cleanDb()
        .then(() => browser.visit('/EXAMPLE'))
        .then(() => browser.assert.url({ pathname: exampleDashboardUrl }))
    );
  });
});

