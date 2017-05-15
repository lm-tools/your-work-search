const moment = require('moment');
const labels = require('../locales/en.json');
const PRIORITY = {
  DEFAULT: 'default',
  HIGH: 'high',
};

function isBefore8DaysFromNow(date) {
  return moment(date).isBefore(moment().add(8, 'days'), 'day');
}
function isBefore20DaysAgo(date) {
  return moment(date).isBefore(moment().subtract(20, 'days'), 'day');
}
function isBefore21DaysAgo(date) {
  return moment(date).isBefore(moment().subtract(21, 'days'), 'day');
}
function isBetweenNowAnd8Days(date) {
  return moment(date).isBetween(moment(), moment().add(8, 'days'), 'day', '[)');
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  const mDate = moment(date);
  if (mDate.isSame(moment(), 'day')) {
    return labels.date.today;
  }
  return capitalize(mDate.fromNow());
}

function priority(status, date) {
  switch (status) {
    case 'interested':
      return isBefore8DaysFromNow(date) ? PRIORITY.HIGH : PRIORITY.DEFAULT;
    case 'applied':
      return PRIORITY.DEFAULT;
    case 'interview':
      return isBefore20DaysAgo(date) ? PRIORITY.DEFAULT : PRIORITY.HIGH;
    case 'failure':
      return PRIORITY.DEFAULT;
    case 'success':
      return isBefore21DaysAgo(date) ? PRIORITY.DEFAULT : PRIORITY.HIGH;
    default:
      return PRIORITY.DEFAULT;
  }
}

function dateText(status, date) {
  if (!date) return '';
  switch (status) {
    case 'interested':
      return isBetweenNowAnd8Days(date) ? labels.date.expiringSoon : formatDate(date);
    case 'applied':
      return formatDate(date);
    case 'interview':
      return formatDate(date);
    case 'failure':
      return formatDate(date);
    case 'success':
      return formatDate(date);
    default:
      return formatDate(date);
  }
}

module.exports = {
  priority,
  dateText,
};
