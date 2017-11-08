const i18n = require('i18n');
class ProgressionViewDecorator {
  decorate(progressionIds, selectedStatus) {
    return progressionIds.map((status) => ({
      name: status,
      isChecked: (selectedStatus === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.long.${status}`),
      displayDeadlineDate: status === 'interested',
      displayApplicationDate: status === 'applied',
      displayInterviewDate: status === 'interview',
      displayFailureDetails: status === 'failure',
      displaySuccessDetails: status === 'success',
    }));
  }
}

module.exports = new ProgressionViewDecorator();
