module.exports = function () {
  const sampleJob = {
    jobTitle: 'Test job',
    employer: 'Test employer',
  };

  function addJob(job) {
    return this.dashboardPage
      .visit(this.scenarioData.accountIdentifier)
      .then(() => this.dashboardPage.clickAddJobButton())
      .then(() => this.addJobPage.fillJobApplication(job));
  }

  this.When(/^I add a job application$/, function () {
    this.scenarioData.addedJob = sampleJob;
    return addJob.call(this, sampleJob);
  });

  this.Then(/^it should show on my dashboard$/, function () {
    return this
      .expect(this.dashboardPage.jobList())
      .to.contain(this.scenarioData.addedJob.jobTitle);
  });

  this.When(/^I add a job application without a title$/, function () {
    sampleJob.jobTitle = '';
    return addJob.call(this, sampleJob);
  });

  this.Then(/^I should see a validation error$/, function () {
    return this.expect(this.addJobPage.getValidationError()).to.equal('Job title is required');
  });
};
