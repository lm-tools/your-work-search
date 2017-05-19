const moment = require('moment');
const labels = require('../locales/en.json');
const PRIORITY = {
  DEFAULT: 'default',
  HIGH: 'high',
};

function isBefore20DaysAgo(date) {
  return moment(date).isBefore(moment().subtract(20, 'days'), 'day');
}
function isBefore21DaysAgo(date) {
  return moment(date).isBefore(moment().subtract(21, 'days'), 'day');
}
function isBetweenTodayAnd7Days(date) {
  return moment(date).isBetween(moment(), moment().add(7, 'days'), 'day', '[]');
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  if (moment(date).isSame(moment(), 'day')) {
    return labels.date.today;
  }
  const endOfDayDate = moment(date).endOf('day');
  return endOfDayDate.from(moment().endOf('day'));
}

function priority(status, date) {
  switch (status) {
    case 'interested':
      return (date && isBetweenTodayAnd7Days(date)) ? PRIORITY.HIGH : PRIORITY.DEFAULT;
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
      return isBetweenTodayAnd7Days(date) ?
        `${labels.date.expiringSoon} ${formatDate(date)}` : capitalize(formatDate(date));
    case 'applied':
      return capitalize(formatDate(date));
    case 'interview':
      return capitalize(formatDate(date));
    case 'failure':
      return capitalize(formatDate(date));
    case 'success':
      return capitalize(formatDate(date));
    default:
      return capitalize(formatDate(date));
  }
}

module.exports = {
  priority,
  dateText,
};
