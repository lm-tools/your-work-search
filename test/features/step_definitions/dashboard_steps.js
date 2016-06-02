const JobsModel = require('../../../models/jobs-model');

module.exports = function () {
  function ensureSingleJobScenario() {
    const jobs = this.scenarioData.jobs;
    this.expect(jobs).to.have.lengthOf(
      1,
      `Invalid scenario, expected "1" job in scenarioData.jobs, found "${jobs.length}"`
    );
  }

  this.Then(/^I should see the dashboard, within my account$/, function () {
    this.expect(this.browser.url).to.match(
      new RegExp(`/${this.scenarioData.accountIdentifier}$`),
      "should be within test users's account"
    );
  });

  this.Then(/^I should see the dashboard, within a new account$/, function () {
    this.expect(this.browser.url).to.match(
      /\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/i,
      'a valid account identifier should be allocated'
    );
    this.expect(this.browser.url).not.to.match(
      new RegExp(`/${this.scenarioData.accountIdentifier}$`),
      'a new account identifier should be allocated'
    );
  });

  this.When(/^I set that job's progression status$/, function () {
    ensureSingleJobScenario.call(this);

    const job = this.scenarioData.jobs[0];

    return this.dashboardPage
      .visit(this.scenarioData.accountIdentifier)
      .then(() => this.dashboardPage.setJobProgressionStatus(job, 'interview'))
      .then(() => { job.status = 'interview'; });
  });

  this.Then(/^the status should be saved$/, function () {
    // TODO: this step definition is awkward in this file,
    // TODO: should we even be validating this directly!?
    ensureSingleJobScenario.call(this);

    const job = this.scenarioData.jobs[0];

    return new JobsModel({ id: job.id })
      .fetch()
      .then((model) => this.expect(model.status).to.equal(job.status));
  });

  this.Then(/^the status should reflect on the dashboard$/, function () {
    ensureSingleJobScenario.call(this);

    const job = this.scenarioData.jobs[0];

    return this.dashboardPage
      .visit(this.scenarioData.accountIdentifier)
      .then(() => {
        this.expect(this.dashboardPage.jobProgressionStatus(job)).to.equal(job.status);
      });
  });
};
