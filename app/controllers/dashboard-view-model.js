const moment = require('moment');
const i18n = require('i18n');
const progression = require('../models/progression');

module.exports = class DashboardViewModel {

  constructor(accountId, jobs, totalSavedJobs, sort, focus) {
    this.accountId = accountId;
    this.jobs = this.dashboardJobs(jobs, focus);
    this.hasJobs = totalSavedJobs > 0;
    this.sortType = sort;
    this.sortOptions = this.dashboardSortOptions(sort);
  }

  dashboardJobs(jobs, jobIdInFocus) {
    return jobs
      .map((job) => Object.assign(
        {
          progression: this.dashboardJobProgression(job),
          // eslint-disable-next-line no-underscore-dangle
          statusString: i18n.__(`progression.${job.status}`),
          updatedFormatted: this.formatDate(job.updated_at),
          interestLevel: [5, 4, 3, 2, 1].map(v => ({ value: v, isChecked: v === job.rating })),
          source: this.formatSource(job),
          hasFocus: job.id === parseInt(jobIdInFocus, 10),
        },
        job));
  }

  dashboardJobProgression(job) {
    return progression.getAllIds().map((status) => ({
      name: status,
      isChecked: (job.status === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.${status}`),
    }));
  }

  dashboardSortOptions(sort) {
    return [
      { value: 'created',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.created'), selected: sort === 'created' },
      { value: 'updated',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.updated'), selected: sort === 'updated' },
      { value: 'status',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.status'), selected: sort === 'status' },
      { value: 'title',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.title'), selected: sort === 'title' },
      { value: 'employer',
       // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.employer'), selected: sort === 'employer' },
    ];
  }

  formatDate(inputDate) {
    if (!inputDate) return '';
    return moment(inputDate).format('D MMMM YYYY');
  }

  formatSource(job) {
    return job.sourceType === 'online' && job.sourceUrl ? job.sourceUrl : '';
  }
};
