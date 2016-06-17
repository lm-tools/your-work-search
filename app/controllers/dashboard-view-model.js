const moment = require('moment');
const i18n = require('i18n');
const progression = require('../models/progression');

module.exports = class DashboardViewModel {

  constructor(accountId, jobModels, sort) {
    this.accountId = accountId;
    this.jobs = this.dashboardJobs(jobModels);
    this.sortOptions = this.dashboardSortOptions(sort);
  }

  dashboardJobs(jobModels) {
    return jobModels
      .map((job) => Object.assign(
        {
          progression: this.dashboardJobProgression(job),
          // eslint-disable-next-line no-underscore-dangle
          statusString: i18n.__(`progression.${job.status}`),
          deadlineFormatted: this.formatDeadline(job.deadline),
          interestLevel: [1, 2, 3, 4, 5].map(v => ({ value: v, isChecked: v === job.rating })),
          source: this.formatSource(job),
        },
        job));
  }

  dashboardJobProgression(job) {
    return progression.map((status) => ({
      name: status,
      isChecked: (job.status === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.${status}`),
    }));
  }

  dashboardSortOptions(sort) {
    return [
      // eslint-disable-next-line no-underscore-dangle
      { value: 'created', label: i18n.__('dashboard.sort.created'), selected: sort === 'created' },
      // eslint-disable-next-line no-underscore-dangle
      { value: 'updated', label: i18n.__('dashboard.sort.updated'), selected: sort === 'updated' },
      // eslint-disable-next-line no-underscore-dangle
      { value: 'title', label: i18n.__('dashboard.sort.title'), selected: sort === 'title' },
      // eslint-disable-next-line no-underscore-dangle
      { value: 'deadline',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.deadline'), selected: sort === 'deadline' },
      // eslint-disable-next-line no-underscore-dangle
      { value: 'status', label: i18n.__('dashboard.sort.status'), selected: sort === 'status' },
    ];
  }

  formatDeadline(deadline) {
    if (!deadline) return '';

    const date = moment(deadline);
    return date.isSame(new Date(), 'year') ? date.format('Do MMMM') : date.format('Do MMMM YYYY');
  }

  formatSource(job) {
    // eslint-disable-next-line no-underscore-dangle
    return job.sourceUrl ? job.sourceUrl : i18n.__(`sourceType.${job.sourceType}`);
  }
};
