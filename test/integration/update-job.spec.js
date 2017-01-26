const helper = require('./support/integration-spec-helper');
const updateJobPage = helper.updateJobPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;

describe('Update a job', () => {
  const accountId = 'c86df559-38b9-4f7c-89b7-794278655bc0';
  const job = helper.sampleJob({
    accountId,
    title: 'Job to update',
    id: 666,
  });

  beforeEach(function () {
    return helper.cleanDb()
      .then(() => helper.createJobsInDb([job]))
      .then(() => updateJobPage.visit(accountId, job));
  });

  describe('page outline', () => {
    it('should have correct title', () =>
      expect(updateJobPage.browser.text('title')).to.equal('Update a job - Your work search')
    );

    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId)
    );
  });
});

