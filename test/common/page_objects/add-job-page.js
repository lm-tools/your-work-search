const AddJobPage = function AddJobPage(browser) {
  this.browser = browser;

  this.fillJobApplication = (data) => {
    this.fillTitle(data.title);
    this.setJobProgression(data.status);
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
  this.isSourceUrlHidden = () =>
    browser.query('#job-sourceUrl-group').className.split(/\s+/).includes('js-hidden');
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
    browser.queryAll('[data-test="progression"] input')
      .map(i => i.value);
  this.submit = () => browser.pressButton('input[type=submit]');
};

module.exports = AddJobPage;
