const helper = require('./support/integration-spec-helper');
const updateJobPage = helper.updateJobPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;
const progression = require('../../app/models/progression');
const labels = require('../../app/locales/en.json');

describe('Update a job', () => {
  const accountId = 'c86df559-38b9-4f7c-89b7-794278655bc0';
  const job = helper.sampleJob({
    accountId,
    title: 'Job to update',
    rating: '4',
    status: 'applied',
    sourceUrl: 'http://www.stuff.on.the.updated.test.com',
    id: 666,
  });

  beforeEach(function () {
    return helper.cleanDb()
      .then(() => helper.createJobsInDb([job]))
      .then(() => updateJobPage.visit(accountId, job));
  });

  describe('page outline', () => {
    it('should have correct title', () =>
      expect(updateJobPage.browser.text('title')).to.equal('Update job - Your work search')
    );

    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId)
    );
  });

  describe('job details', () => {
    it('should display job title', () =>
      expect(updateJobPage.getJobTitle()).to.equal(job.title)
    );

    it('should display job employer', () =>
      expect(updateJobPage.getJobEmployer()).to.equal(job.employer)
    );

    it('should display job source when user specified source url', () =>
      expect(updateJobPage.getJobSource()).to.equal(job.sourceUrl)
    );

    it('should not display job source when user didn\'t specify source url', () => {
      const jobWithoutUrl = { id: 911, accountId };
      return helper.cleanDb()
        .then(() => helper.createJobsInDb([jobWithoutUrl]))
        .then(() => updateJobPage.visit(accountId, jobWithoutUrl))
        .then(() => expect(updateJobPage.getJobSource()).to.equal(''));
    });

    it('should display job progress', () =>
      expect(updateJobPage.getJobProgress()).to.equal(job.status)
    );

    it('should display job rating', () =>
      expect(updateJobPage.getJobRating()).to.equal(job.rating)
    );
  });

  describe('update job details', () => {
    progression.forEach(s => {
      it(`should update job progress to ${s}`, () =>
        updateJobPage.setJobProgression(s)
          .then(() => updateJobPage.clickSave())
          .then(() => expect(helper.dashboardPage.getJobProgressionStatus(job))
            .to.equal(labels.progression[s]))
      );
    });

    ['1', '2', '3', '4', '5'].forEach(s => {
      it(`should update rating to ${s}`, () =>
        updateJobPage.setJobRating(s)
          .then(() => updateJobPage.clickSave())
          .then(() => expect(helper.dashboardPage.getInterestLevel(job)).to.equal(s))
      );
    });
  });

  describe('not found job', () => {
    it('should return 404 page if job not found', () =>
      updateJobPage.visit(accountId, { id: 900 })
        .catch(() => expect(updateJobPage.browser.status).to.equal(404))
    );
  });
});

