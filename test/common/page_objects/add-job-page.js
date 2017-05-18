const request = require('supertest');
const moment = require('moment');
const extractCsrfToken = require('../csrf-token-helper').extractCsrfToken;
const AddJobPage = function AddJobPage(browser, app) {
  this.browser = browser;
  this.app = app;

  this.setStatusDateValues = (data) => {
    if (data.deadlineDate) { this.setStatusDate('deadlineDate', data.deadlineDate); }
    if (data.applicationDate) { this.setStatusDate('applicationDate', data.applicationDate); }
    if (data.interviewDate) { this.setStatusDate('interviewDate', data.interviewDate); }
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

  this.setStatusDate = (dateField, value) =>
    browser.fill(`[data-test="${dateField}"]`, moment(value).format('YYYY-MM-DD'));

  this.isFormFieldHidden = (dateField) => browser.query(`[data-test="${dateField}"]`)
    .className.split(/\s+/).includes('hidden');

  this.getValidationError = () => browser.text('#validation-errors');

  this.visit = (accountId) => browser.visit(`/${accountId}/jobs/new`);
  this.patch = (accountId, jobId) => browser.visit(`/${accountId}/jobs/${jobId}?_method=PATCH`);

  this.employerFieldValue = () => browser.field('[name="employer"]').value;
  this.chooseSourceType = (sourceType) => browser.choose(`#job-sourceType-${sourceType}`);
  this.isSourceUrlHidden = () =>
    browser.query('#job-sourceUrl-group').className.split(/\s+/).includes('js-hidden');
  this.isDateSectionHidden = (dateField) =>
    browser.query(`#job-statusDateGroup-${dateField}`).className.split(/\s+/).includes('js-hidden');
  this.formValues = () =>
    ({
      title: browser.field('[name="title"]').value,
      employer: browser.field('[name="employer"]').value,
      sourceType: browser.field('[name="sourceType"][checked]').value,
      sourceUrl: browser.field('[name="sourceUrl"]').value,
      rating: browser.field('[name="rating"][checked]').value,
      status: browser.field('[data-test="progression"] input[checked]').value,
      deadlineDate: browser.field('[data-test="deadlineDate"]').value,
      applicationDate: browser.field('[data-test="applicationDate"]').value,
      interviewDate: browser.field('[data-test="interviewDate"]').value,
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
  this.postWithCsrfToken = (accountId, form) =>
    request(this.app)
      .get(`/${accountId}/jobs/new`)
      .then(res => {
        const csrfToken = extractCsrfToken(res);
        return request(this.app)
          .post(`/${accountId}/jobs/new`)
          .set({ cookie: res.headers['set-cookie'] })
          .send(Object.assign({}, form, { _csrf: csrfToken }));
      });
};

module.exports = AddJobPage;
