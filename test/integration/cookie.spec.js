/* eslint-disable no-underscore-dangle */
const helper = require('./support/integration-spec-helper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const cookiePage = helper.cookiePage;
const expect = require('chai').expect;
const uuid = require('node-uuid');

describe('Cookie page', () => {
  const accountId = uuid.v4();

  before(() =>
    cookiePage.visit(accountId)
  );

  it('should contain valid google tag manager data', () =>
    expect(googleTagManagerHelper.getAccountVariable()).to.equal(accountId)
  );

  it('displays govuk general cookie info', () =>
    expect(cookiePage.isDisplayed()).to.equal(true)
  );

  describe('Without account id', () => {
    before(() =>
      cookiePage.visit()
    );

    it('displays govuk general cookie info', () => {
      expect(cookiePage.isDisplayed()).to.equal(true);
    });
  });
});
