const JobsModel = require('../../../app/models/jobs-model');

module.exports = function () {
  this.Then(/^it should be be at the beginning of the job application progression$/, function () {
    return JobsModel
      .findAllByAccountId(this.scenarioData.accountIdentifier)
      .then((result) => {
        this.expect(result.jobs.length)
          .to.equal(1, 'This step must requires exactly 1 saved job');
        this.expect(
          this.dashboardPage.getJobProgressionStatus(result.jobs[0]))
            .to.equal('Interested');
      });
  });
};
