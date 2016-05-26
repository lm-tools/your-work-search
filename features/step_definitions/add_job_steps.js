module.exports = function () {
  this.When(/^I add a job application$/, function () {
    const job = {
      jobTitle: 'Test job',
      employer: 'Test employer',
    };
    this.scenarioData.addedJob = job;
    return this.dashboardPage
      .visit(this.scenarioData.accountIdentifier)
      .then(() => this.dashboardPage.clickAddJobButton())
      .then(() => this.addJobPage.fillJobApplication(job));
  });

  this.Then(/^it should show on my dashboard$/, function () {
    return this
      .expect(this.dashboardPage.jobList())
      .to.contain(this.scenarioData.addedJob.jobTitle);
  });
};
