const request = require('supertest');
const moment = require('moment');

const AddJobPage = function AddJobPage(browser, app) {
  this.browser = browser;
  this.app = app;

  this.parseDateForFillingForm = (inputDate) =>
    (inputDate.includes('-') ? moment(inputDate).format('DD/MM/YYYY') : inputDate);

  this.setStatusDateValues = (data) => {
    if (data.deadlineDate) {
      browser.fill('[name="deadlineDate"]', this.parseDateForFillingForm(data.deadlineDate));
    }
    if (data.applicationDate) {
      browser.fill('[name="applicationDate"]', this.parseDateForFillingForm(data.applicationDate));
    }
    if (data.interviewDate) {
      browser.fill('[name="interviewDate"]', this.parseDateForFillingForm(data.interviewDate));
    }
  };

  this.fillJobApplication = (data) => {
    this.fillTitle(data.title);
    this.setJobProgression(data.status);
    this.setStatusDateValues(data);
    return browser
      .fill('[name="employer"]', data.employer)
      .choose(`#job-sourceType-${data.sourceType}`)
      .fill('[name="sourceUrl"]', data.sourceUrl)
      .choose(`#job-rating-${data.rating}`)
      .pressButton('input[type=submit]');
  };

  this.getValidationError = () => browser.text('#validation-errors');

  this.visit = (accountId) => browser.visit(`/${accountId}/jobs/new`);
  this.patch = (accountId, jobId) => browser.visit(`/${accountId}/jobs/${jobId}?_method=PATCH`);

  this.employerFieldValue = () => browser.field('[name="employer"]').value;
  this.chooseSourceType = (sourceType) => browser.choose(`#job-sourceType-${sourceType}`);
  this.chooseStatusType = (statusType) => browser.choose(`#job-statusType-${statusType}`);
  this.isSourceUrlHidden = () =>
    browser.query('#job-sourceUrl-group').className.split(/\s+/).includes('js-hidden');
  this.isStatusDateSectionHidden = (status) =>
    browser.query(`#job-statusDateGroup-${status}`).className.split(/\s+/).includes('js-hidden');
  this.formValues = () =>
    ({
      title: browser.field('[name="title"]').value,
      employer: browser.field('[name="employer"]').value,
      sourceType: browser.field('[name="sourceType"][checked]').value,
      sourceUrl: browser.field('[name="sourceUrl"]').value,
      rating: browser.field('[name="rating"][checked]').value,
      status: browser.field('[data-test="progression"] input[checked]').value,
    });
  this.fillTitle = title => browser.fill('[name="title"]', title);
  this.setJobProgression = (status) => browser
    .click(`[data-test="progression"] input[value="${status}"]`);
  this.getJobProgressionOptions = () =>
    browser.queryAll('[data-test="progression"] input[name=status]')
      .map(i => i.value);
  this.getRatings = () =>
    browser.queryAll('input[name="rating"]')
      .map(i => i.value);
  this.submit = () => browser.pressButton('input[type=submit]');

  this.post = (accountId, form) => request(this.app).post(`/${accountId}/jobs/new`).send(form);
};

module.exports = AddJobPage;
