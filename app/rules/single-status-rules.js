const moment = require('moment');
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
  return isBetweenNowAnd8Days(date) ? 'Expiring soon' : capitalize(moment(date).fromNow());
}

module.exports = {
  priority,
  dateText,
};
