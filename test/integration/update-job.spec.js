const helper = require('./support/integration-spec-helper');
const updateJobPage = helper.updateJobPage;
const dashboardPage = helper.dashboardPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const chai = require('chai');
chai.use(require('chai-moment'));
const expect = chai.expect;
const progression = require('../../app/models/progression');
const labels = helper.labels;
const moment = require('moment');

describe('Update a job', () => {
  const accountId = 'c86df559-38b9-4f7c-89b7-794278655bc0';
  const job = helper.sampleJob({
    accountId,
    title: 'Job to update',
    rating: '4',
    status: 'applied',
    applicationDate: '2017-05-20',
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

    [
      {
        statusSelected: 'interested',
        interestedHidden: false, appliedHidden: true, interviewHidden: true,
      },
      {
        statusSelected: 'applied',
        interestedHidden: true, appliedHidden: false, interviewHidden: true,
      },
    ].forEach(s => {
      it(`should show and hide status date sections when ${s.statusSelected} status chosen`,
        (done) => {
          updateJobPage.setJobProgression('interested');
          updateJobPage.setJobProgression(s.statusSelected);

          expect(updateJobPage.isDateSectionHidden('deadlineDate'))
            .to.equal(s.interestedHidden, 'interested is hidden?');
          expect(updateJobPage.isDateSectionHidden('applicationDate'))
            .to.equal(s.appliedHidden, 'applied is hidden?');
          expect(updateJobPage.isDateSectionHidden('interviewDate'))
            .to.equal(s.interviewHidden, 'interview is hidden?');
          done();
        });
    });
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
      const jobWithoutUrl = { id: 911, accountId, status: 'interested' };
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

    it('should display job status date', () => {
      expect(updateJobPage.getFormField('applicationDate'))
        .to.equal(moment(job.applicationDate).format('YYYY-MM-DD'));
    });
  });

  describe('update job details', () => {
    progression.getAllIds().forEach(s => {
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

    [
      { status: 'success', dateField: 'successDate' },
      { status: 'failure', dateField: 'failureDate' },
    ].forEach(s => {
      it(`should save ${s.dateField}  when status changed to ${s.status}`, () => {
        updateJobPage.setJobProgression(s.status);
        return updateJobPage.clickSave()
          .then(() => helper.findJobInDbById(job.id))
          .then(result => {
            expect(result[s.dateField]).to.be.sameMoment(new Date(), 'day');
          });
      });
    });
  });

  describe('not found job', () => {
    it('should return 404 page if job not found', () =>
      updateJobPage.visit(accountId, { id: 900 })
        .catch(() => expect(updateJobPage.browser.status).to.equal(404))
    );
  });

  describe('validate inputs', () => {
    const aDayAgo = moment().subtract(1, 'day').toDate();
    const today = moment();
    const inADay = moment().add(1, 'day').toDate();
    const inADayString = moment().add(1, 'day').format('YYYY-MM-DD');

    describe('update', () => {
      [
        { field: 'deadlineDate', label: 'in the past', date: aDayAgo, valid: true },
        { field: 'deadlineDate', label: 'today', date: today, valid: true },
        { field: 'deadlineDate', label: 'in the future', date: inADay, valid: true },
        { field: 'applicationDate', label: 'in the past', date: aDayAgo, valid: true },
        { field: 'applicationDate', label: 'today', date: today, valid: true },
        {
          field: 'applicationDate', label: 'in the future', date: inADay, valid: false,
          error: '\'When did you apply?\' cannot be in the future',
        },
        { field: 'interviewDate', label: 'in the past', date: aDayAgo, valid: true },
        { field: 'interviewDate', label: 'today', date: today, valid: true },
        { field: 'interviewDate', label: 'in the future', date: inADay, valid: true },
      ].forEach(s => {
        const statusMap = {
          deadlineDate: 'interested',
          applicationDate: 'applied',
          interviewDate: 'interview',
        };

        it(`${s.field} ${s.label} should ${s.valid ? '' : 'not '}be valid`, () => {
          updateJobPage.setJobProgression(statusMap[s.field]);
          updateJobPage.setStatusDate(s.field, s.date);
          return updateJobPage.clickSave().then(() => {
            if (s.valid) {
              expect(dashboardPage.browserPath()).to.match(new RegExp(`^/${accountId}`));
            } else {
              expect(updateJobPage.getValidationError()).to.contain(s.error);
            }
          });
        });
      });

      it('should prepopulate filled form fields after error', () => {
        updateJobPage.setJobProgression('applied');
        updateJobPage.setStatusDate('applicationDate', inADay);
        updateJobPage.setJobRating(3);
        return updateJobPage.clickSave().then(() => {
          expect(updateJobPage.getJobProgress()).to.equal('applied');
          expect(updateJobPage.getJobStatusDate('applicationDate')).to.equal(inADayString);
          expect(updateJobPage.getJobRating()).to.equal('3');
        });
      }
      );
    });

    describe('validate GET /:accountId/jobs/:jobId', () => {
      [
        { jobId: job.id, statusCode: 200 },
        { jobId: 'abd', statusCode: 400 },
        { jobId: '0', statusCode: 400 },
        { jobId: '-1', statusCode: 400 },
      ].forEach(s => {
        it(`jobId "${s.jobId}" should return ${s.statusCode}`, () =>
          updateJobPage.get(accountId, s.jobId)
            .then(response => {
              expect(response.status).to.equal(s.statusCode);
            })
        );
      });
    });

    describe('validate PATCH /:accountId/jobs/:jobId', () => {
      [
        { jobId: job.id, body: {}, statusCode: 302 },
        { jobId: job.id, body: { status: progression.getAllIds()[2] }, statusCode: 302 },
        { jobId: job.id, body: { status: 'incorrect' }, statusCode: 400 },
        { jobId: job.id, body: { rating: '2' }, statusCode: 302 },
        { jobId: job.id, body: { rating: '0' }, statusCode: 400 },
        {
          jobId: job.id,
          body: { status: progression.getAllIds()[2], rating: '4' },
          statusCode: 302,
        },
        {
          jobId: job.id,
          body: { status: progression.getAllIds()[2], rating: '4', incorrect: 'attribute' },
          statusCode: 400,
        },
      ].forEach(s => {
        it(`jobId "${s.jobId}" with body: ${JSON.stringify(s.body)} returns ${s.statusCode}`, () =>
          updateJobPage.patchWithCsrfToken(accountId, s.jobId, s.body)
            .then(response => {
              expect(response.status).to.equal(s.statusCode);
            })
        );
      });

      [
        { jobId: 'abd', body: {}, statusCode: 400 },
        { jobId: '0', body: {}, statusCode: 400 },
        { jobId: '-1', body: {}, statusCode: 400 },
      ].forEach(s => {
        it(`jobId "${s.jobId}" with body: ${JSON.stringify(s.body)} returns ${s.statusCode}`, () =>
          updateJobPage.patch(accountId, s.jobId, s.body)
            .then(response => {
              expect(response.status).to.equal(s.statusCode);
            })
        );
      });

      it('should validate missing csrf token', () =>
        updateJobPage.patch(job.accountId, job.id, {}).then(response =>
          expect(response.status).to.equal(403)
        )
      );
    });
  });
});

