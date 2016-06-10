const progression = require('../../../app/models/progression');
const JobsModel = require('../../../app/models/jobs-model');

module.exports = function () {
  this.Then(/^it should be be at the beginning of the job application progression$/, function () {
    return JobsModel
      .findAllByAccountId(this.scenarioData.accountIdentifier)
      .then((models) => {
        const jobs = models.serialize();
        this.expect(jobs.length).to.equal(1, 'This step must requires exactly 1 saved job');
        this.expect(this.dashboardPage.getJobProgressionStatus(jobs[0])).to.equal(progression[0]);
      });
  });
};
