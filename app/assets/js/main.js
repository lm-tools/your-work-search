const $ = require('jquery');
require('./_datepickers.js');
require('./_hide-show');
require('./_readmore');

// Use GOV.UK selection-buttons.js to set selected
// and focused states for block labels
const $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
// eslint-disable-next-line no-new
new GOVUK.SelectionButtons($blockLabels);

const hideAllStatusGroups = function () {
  $('#job-statusDateGroup-deadlineDate').addClass('js-hidden');
  $('#job-statusDateGroup-applicationDate').addClass('js-hidden');
  $('#job-statusDateGroup-interviewDate').addClass('js-hidden');
  $('#job-statusDateGroup-successSection').addClass('js-hidden');
  $('#job-statusDateGroup-failureSection').addClass('js-hidden');
};

// add-a-job page
$('label[for="job-sourceType-inPerson"]')
  .click(() => $('#job-sourceUrl-group').addClass('js-hidden'));
$('label[for="job-sourceType-online"]')
  .click(() => $('#job-sourceUrl-group').removeClass('js-hidden'));
$('label[for="job-statusType-interested"]')
  .click(() => {
    hideAllStatusGroups();
    $('#job-statusDateGroup-deadlineDate').removeClass('js-hidden');
  });
$('label[for="job-statusType-applied"]')
  .click(() => {
    hideAllStatusGroups();
    $('#job-statusDateGroup-applicationDate').removeClass('js-hidden');
  });
$('label[for="job-statusType-interview"]')
  .click(() => {
    hideAllStatusGroups();
    $('#job-statusDateGroup-interviewDate').removeClass('js-hidden');
  });
$('label[for="job-statusType-success"]')
  .click(() => {
    hideAllStatusGroups();
    $('#job-statusDateGroup-successSection').removeClass('js-hidden');
  });
$('label[for="job-statusType-failure"]')
  .click(() => {
    hideAllStatusGroups();
    $('#job-statusDateGroup-failureSection').removeClass('js-hidden');
  });
