const request = require('supertest');
const extractCsrfToken = require('../csrf-token-helper').extractCsrfToken;

const UpdateJobPage = function UpdateJobPage(browser, app) {
  this.browser = browser;
  this.app = app;

  this.visit = (accountId, job) => browser.visit(`/${accountId}/jobs/${job.id}`);
  this.clickSave = () => browser.pressButton('[data-test="save"]');
  this.getJobTitle = () => browser.text('[data-test="title"]');
  this.getJobEmployer = () => browser.text('[data-test="employer"]');
  this.getJobSource = () => browser.text('[data-test="source"]');
  this.getJobProgress = () => browser.query('[data-test="progression"] input[checked]').value;
  this.getJobRating = () => browser.query('[data-test="rating"] input[checked]').value;
  this.setJobProgression = (status) => browser
    .click(`[data-test="progression"] input[value="${status}"]`);
  this.setJobRating = (rating) => browser
    .click(`[data-test="rating"] input[value="${rating}"]`);
  this.deleteJob = () => browser.click('[data-test="delete-button"]');

  this.get = (accountId, jobId) => request(this.app).get(`/${accountId}/jobs/${jobId}`);

  this.delete = (accountId, jobId) => request(this.app).delete(`/${accountId}/jobs/${jobId}`);

  this.deleteWithCsrfToken = (accountId, jobId) =>
    this.get(accountId, jobId).then(res => {
      const csrfToken = extractCsrfToken(res);
      return request(this.app)
        .delete(`/${accountId}/jobs/${jobId}`)
        .set({ cookie: res.headers['set-cookie'] })
        .send({ _csrf: csrfToken });
    });

  this.patch = (accountId, jobId, body) =>
    request(this.app).patch(`/${accountId}/jobs/${jobId}`).send(body);

  this.patchWithCsrfToken = (accountId, jobId, body) =>
    this.get(accountId, jobId).then(res => {
      const csrfToken = extractCsrfToken(res);
      return request(this.app)
        .patch(`/${accountId}/jobs/${jobId}`)
        .set({ cookie: res.headers['set-cookie'] })
        .send(Object.assign({}, body, { _csrf: csrfToken }));
    });

  this.isDateSectionHidden = (dateField) =>
    browser.query(`#job-statusDateGroup-${dateField}`).className.split(/\s+/).includes('js-hidden');

  this.getFormField = (dateField) => browser.query(`[data-test="${dateField}"]`).value;
  this.setFormField = (dateField, value) =>
    browser.fill(`[data-test="${dateField}"]`, value);
  this.isFormFieldHidden = (dateField) => browser.query(`[data-test="${dateField}"]`)
    .className.split(/\s+/).includes('hidden');
};

module.exports = UpdateJobPage;
