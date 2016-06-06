const JobsModel = require('../../../models/jobs-model');

module.exports = function () {
  this.Given(/^I have never accessed my account$/, () => { /* noop */ });
  this.Given(/^I have an existing account$/, () => { /* noop */ });

  this.Given(/^I have added a job application to my account$/, function () {
    const jobData = Object.assign({}, this.fixtures.sampleJob,
      { accountId: this.scenarioData.accountIdentifier });

    return new JobsModel(jobData)
      .save()
      .then((model) => this.scenarioData.addJob(model.serialize()));
  });
};
