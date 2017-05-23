const helper = require('./support/integration-spec-helper');
const addJobPage = helper.addJobPage;
const dashboardPage = helper.dashboardPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;
const moment = require('moment');
const sampleJob = helper.sampleJob();
const progression = require('../../app/models/progression');
const ratings = require('../../app/models/ratings');

describe('Add a job page', () => {
  const accountId = 'someAccount';
  const aDayAgo = moment().subtract(1, 'day').toDate();
  const today = moment();
  const inADay = moment().add(1, 'day').toDate();

  function newlyCreatedJob() {
    return { id: dashboardPage.getJobIdFromQueryParams() };
  }

  describe('page outline', () => {
    before(() => addJobPage.visit(accountId));

    it('should hide sourceUrl if no sourceType is selected', () =>
      expect(addJobPage.isSourceUrlHidden()).to.equal(true)
    );

    [
      { name: 'should hide', sourceType: 'inPerson', isSourceUrlHidden: true },
      { name: 'should show', sourceType: 'online', isSourceUrlHidden: false },
    ].forEach(s => {
      it(`${s.name} sourceUrl when source type is ${s.sourceType}`, () => {
        addJobPage.chooseSourceType(s.sourceType);
        expect(addJobPage.isSourceUrlHidden()).to.equal(s.isSourceUrlHidden);
      });
    });

    [
      {
        statusSelected: 'interested',
        interestedHidden: false, appliedHidden: true, interviewHidden: true,
      },
      {
        statusSelected: 'applied',
        interestedHidden: true, appliedHidden: false, interviewHidden: true,
      },
      {
        statusSelected: 'interview',
        interestedHidden: true, appliedHidden: true, interviewHidden: false,
      },
    ].forEach(s => {
      it(`should show associated status date section when ${s.statusSelected} status chosen`,
        () => {
          addJobPage.setJobProgression(s.statusSelected);

          expect(addJobPage.isDateSectionHidden('deadlineDate'))
            .to.equal(s.interestedHidden, 'interested is hidden?');
          expect(addJobPage.isDateSectionHidden('applicationDate'))
            .to.equal(s.appliedHidden, 'applied is hidden?');
          expect(addJobPage.isDateSectionHidden('interviewDate'))
            .to.equal(s.interviewHidden, 'interview is hidden?');
        });
    });

    it('should have correct title', () =>
      expect(addJobPage.browser.text('title')).to.equal('Add a job - Your work search')
    );

    it('should contain valid google tag manager data', () =>
      expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId)
    );

    it('should display subset of progression statuses', () =>
      expect(addJobPage.getJobProgressionOptions())
        .to.eql(['interested', 'applied', 'interview'])
    );

    it('should render rating in correct order', () =>
      expect(addJobPage.getRatings()).to.eql(['5', '4', '3', '2', '1'])
    );
  });

  describe('successful selective status date persistence', () => {
    const formInputDate = '2017-04-26';

    [
      {
        status: 'interested',
        dateField: 'deadlineDate',
        emptyFields: ['applicationDate', 'interviewDate'],
      },
      {
        status: 'applied',
        dateField: 'applicationDate',
        emptyFields: ['deadlineDate', 'interviewDate'],
      },
      {
        status: 'interview',
        dateField: 'interviewDate',
        emptyFields: ['applicationDate', 'deadlineDate'],
      },
    ]
      .forEach(j => {
        it(`should only save ${j.dateField} associated with status ${j.status}`, (done) => {
          const jobData = Object.assign({}, sampleJob,
            { status: j.status },
            { deadlineDate: formInputDate },
            { applicationDate: formInputDate },
            { interviewDate: formInputDate }
          );

          helper.cleanDb()
            .then(() => addJobPage.visit(accountId))
            .then(() => addJobPage.fillJobApplication(jobData))
            .then(() => helper.findJobInDb(accountId))
            .then((job) => {
              expect(moment(job[`${j.dateField}`]).format('YYYY-MM-DD')).to.equal(formInputDate);

              j.emptyFields.forEach(f => expect(job[f]).not.exist);

              done();
            });
        });
      });
  });

  describe('successful job creation', () => {
    before(() =>
      addJobPage.visit(accountId)
        .then(() => addJobPage.fillJobApplication(sampleJob))
    );

    it('should redirect user to dashboard page', () =>
      expect(dashboardPage.browserPath()).to.match(new RegExp(`^/${accountId}`))
    );

    it('should add focus parameter when job added', () =>
      expect(dashboardPage.checkBrowserHasQueryParam('focus=')).to.equal(true)
    );

    it('should display newly created job title', () =>
      expect(dashboardPage.getTitle(newlyCreatedJob())).to.equal(sampleJob.title)
    );

    it('should display newly created job employer', () =>
      expect(dashboardPage.getEmployer(newlyCreatedJob())).to.equal(sampleJob.employer)
    );

    it('should display newly created job progression status', () =>
      expect(dashboardPage.getJobProgressionStatus(newlyCreatedJob()))
        .to.equal(helper.labels.progression[sampleJob.status])
    );

    it('should display newly created job rating', () =>
      expect(dashboardPage.getInterestLevel(newlyCreatedJob())).to.equal(sampleJob.rating)
    );

    it('should display newly created job source url', () =>
      expect(dashboardPage.getJobSource(newlyCreatedJob())).to.equal(sampleJob.sourceUrl)
    );
  });

  describe('validation error', () => {
    const form = {
      title: '', employer: 'Dwp', sourceType: 'online', sourceUrl: 'http://indeed.com',
      rating: '2', status: 'applied', deadlineDate: '', applicationDate: '2017-12-26',
      interviewDate: '',
    };
    beforeEach(() => addJobPage.visit(accountId));

    it('should prepopulate filled form fields after error', () =>
      addJobPage.fillJobApplication(form)
        .then(() => expect(addJobPage.formValues()).to.eql(form))
    );

    describe('for empty form', () => {
      beforeEach(() =>
        addJobPage.visit(accountId)
          .then(() => addJobPage.submit())
      );

      it('should show title is required error', () =>
        expect(addJobPage.getValidationError()).to.contain('\'Job title\' is required')
      );
      it('should show jog progression is required error', () =>
        expect(addJobPage.getValidationError())
          .to.contain('\'Where are you in the process?\' is required')
      );
    });

    describe('post', () => {
      it('should disallow incorrect progression', () =>
        addJobPage
          .postWithCsrfToken(accountId, { title: 'some', status: 'incorrect' })
          .then(response => {
            expect(response.status).to.equal(400);
            expect(response.text).to.include('We&#39;re experiencing technical problems.');
          })
      );

      progression.getInitialSubset().forEach(s => {
        it(`should allow '${s}' progression`, () =>
          addJobPage
            .postWithCsrfToken(accountId, { title: 'some', status: s })
            .then(response => {
              expect(response.status).to.equal(302);
            })
        );
      });

      ['inPerson', 'online'].forEach(s => {
        it(`should allow '${s}' source type`, () =>
          addJobPage
            .postWithCsrfToken(accountId,
            {
              title: 'some',
              status: progression.getInitialSubset()[0],
              sourceType: s,
            })
            .then(response => {
              expect(response.status).to.equal(302);
            })
        );
      });

      it('should disallow incorrect source type', () =>
        addJobPage
          .postWithCsrfToken(accountId,
          {
            title: 'some',
            status: progression.getInitialSubset()[0],
            sourceType: 'incorrect',
          })
          .then(response => {
            expect(response.status).to.equal(400);
            expect(response.text).to.include('We&#39;re experiencing technical problems.');
          })
      );

      ratings().forEach(s => {
        it(`should allow rating of '${s}'`, () =>
          addJobPage
            .postWithCsrfToken(accountId,
            {
              title: 'some',
              status: progression.getInitialSubset()[0],
              rating: s,
            })
            .then(response => {
              expect(response.status).to.equal(302);
            })
        );
      });

      it('should disallow rating of \'6\'', () =>
        addJobPage
          .postWithCsrfToken(accountId,
          {
            title: 'some',
            status: progression.getInitialSubset()[0],
            rating: '6',
          })
          .then(response => {
            expect(response.status).to.equal(400);
            expect(response.text).to.include('We&#39;re experiencing technical problems.');
          })
      );

      it('should validate missing csrf token', () =>
        addJobPage
          .post(accountId,
          {
            title: 'some',
            status: progression.getInitialSubset()[0],
          })
          .then(response => {
            expect(response.status).to.equal(403);
          })
      );

      ['deadlineDate', 'applicationDate', 'interviewDate'].forEach(d => {
        const formData = { title: 'title' };
        formData[d] = '2017_05_12';

        it(`should disallow incorrect ${d} format`, () =>
          addJobPage
            .postWithCsrfToken(accountId, formData)
            .then(response => {
              expect(response.status).to.equal(400);
              expect(response.text).to.include('We&#39;re experiencing technical problems.');
            })
        );
      });

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
          addJobPage.fillTitle('title');
          addJobPage.setJobProgression(statusMap[s.field]);
          addJobPage.setStatusDate(s.field, s.date);
          return addJobPage.submit().then(() => {
            if (s.valid) {
              expect(dashboardPage.browserPath()).to.match(new RegExp(`^/${accountId}`));
            } else {
              expect(addJobPage.getValidationError()).to.contain(s.error);
            }
          });
        });
      });
    });
  });
});
