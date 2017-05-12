const JobsModel = require('../../../app/models/jobs-model');
const initialStatus = require('../../../app/models/progression').getAllIds()[0];

function jobDataFormattedForDb(job) {
  return Object.assign({}, job,
    { status: initialStatus }
  );
}

module.exports = function () {
  this.Given(/^I have never accessed my account$/, () => { /* noop */ });
  this.Given(/^I have an existing account$/, () => { /* noop */ });

  this.Given(/^I have added a job application to my account$/, function () {
    const jobData = Object.assign({}, jobDataFormattedForDb(this.fixtures.sampleJob),
      { accountId: this.scenarioData.accountIdentifier });

    return new JobsModel(jobData)
      .save()
      .then((model) => this.scenarioData.addJob(model.serialize()));
  });
};
