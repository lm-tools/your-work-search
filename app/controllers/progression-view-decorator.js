const i18n = require('i18n');
const progression = require('../models/progression');

class ProgressionViewDecorator {
  decorate(progressionIds, selectedStatus) {
    return progressionIds.map((status) => ({
      name: status,
      isChecked: (selectedStatus === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.long.${status}`),
      // eslint-disable-next-line no-underscore-dangle
      dateLabel: i18n.__(`progression.date.label.${status}`),
      dateField: progression.getDateField(status),
    }));
  }
}

module.exports = new ProgressionViewDecorator();
