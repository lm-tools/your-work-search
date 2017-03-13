module.exports = function () {
  function claimantJobTitle(claimant) {
    return `job for ${claimant}`;
  }

  function addJob(job, accountId) {
    return this.dashboardPage
      .visit(accountId)
      .then(() => this.dashboardPage.clickAddJobButton())
      .then(() => this.addJobPage.fillJobApplication(Object.assign(this.fixtures.sampleJob, job)));
  }

  function addJobForClaimant(claimant) {
    this.scenarioData.addClaimant(claimant);
    return addJob.call(this, { title: claimantJobTitle(claimant), status: 'applied' },
      this.scenarioData.idFor(claimant));
  }

  this.When(/^multiple claimants have added job applications to their accounts$/, function () {
    return addJobForClaimant.call(this, 'John').then(() => addJobForClaimant.call(this, 'Anna'));
  });

  this.Then(/^each claimant should only be able to see their respective job applications$/,
    function () {
      return this.dashboardPage.visit(this.scenarioData.idFor('John'))
        .then(() => this.expect(this.dashboardPage.jobList()).to.equal(claimantJobTitle('John')))
        .then(() => this.dashboardPage.visit(this.scenarioData.idFor('Anna')))
        .then(() => this.expect(this.dashboardPage.jobList()).to.equal(claimantJobTitle('Anna')));
    });
};
