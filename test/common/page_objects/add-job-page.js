const AddJobPage = function AddJobPage(browser) {
  this.browser = browser;

  this.fillJobApplication = (data) =>
    browser
      .fill('[name="title"]', data.title)
      .fill('[name="employer"]', data.employer)
      .choose(`#job-sourceType-${data.sourceType}`)
      .fill('[name="sourceUrl"]', data.sourceUrl)
      .choose(`#job-rating-${data.rating}`)
      .pressButton('input[type=submit]');

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
    });
  this.fillTitle = title => browser.fill('[name="title"]', title);
  this.submit = () => browser.pressButton('input[type=submit]');
};

module.exports = AddJobPage;
