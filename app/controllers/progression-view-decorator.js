const i18n = require('i18n');
const progression = require('../models/progression');
const moment = require('moment');

class ProgressionViewDecorator {
  decorate(progressionIds, selectedStatus, job) {
    return progressionIds.map((status) => ({
      name: status,
      isChecked: (selectedStatus === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.long.${status}`),
      // eslint-disable-next-line no-underscore-dangle
      dateLabel: i18n.__(`progression.date.label.${status}`),
      dateField: progression.getDateField(status),
      hasDateField: progression.hasDateField(status),
      statusDate: this.formatStatusDate(status, job),
    }));
  }

  formatStatusDate(status, job) {
    if (job && progression.hasDateField(status) && job[progression.getDateField(status)]) {
      return moment(job[progression.getDateField(status)]).format('DD/MM/YYYY');
    }
    return '';
  }
}

module.exports = new ProgressionViewDecorator();
