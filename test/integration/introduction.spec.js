const helper = require('./support/integration-spec-helper');
const introductionPage = helper.introductionPage;
const googleTagManagerHelper = helper.googleTagManagerHelper;

const expect = require('chai').expect;

describe('Introduction page', () => {
  const accountId = 'someAccount';

  describe('page outline', () => {
    it('should have correct title', () =>
      introductionPage.visit(accountId)
      .then(() => expect(introductionPage.browser.text('title'))
        .to.equal('Record your work search'))
    );

    it('should contain valid google tag manager data', () =>
      introductionPage.visit(accountId)
      .then(() => expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId))
    );

    it('should link to add a job page', () =>
      introductionPage.visit(accountId)
      .then(() => introductionPage.clickNext())
      .then(() => expect(introductionPage.browserPath()).to.equal(`/${accountId}/jobs/new`))
    );
  });
});
