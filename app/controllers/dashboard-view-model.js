const moment = require('moment');
const i18n = require('i18n');
const progression = require('../models/progression');

module.exports = class DashboardViewModel {

  constructor(accountId, jobs, totalSavedJobs, sort, filter, focus) {
    this.accountId = accountId;
    this.jobs = this.dashboardJobs(jobs, focus);
    this.hasJobs = totalSavedJobs > 0;
    this.sortType = sort;
    this.filterType = filter;
    this.sortOptions = this.dashboardSortOptions(sort);
    this.filterOptions = this.dashboardFilterOptions(filter);
    this.timelineData = this.dashboardTimeline(jobs);
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
    return progression.map((status) => ({
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

  dashboardFilterOptions(filter) {
    return [
      { value: 'all',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.all'), selected: filter === 'all' },
      { value: 'week',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.week'), selected: filter === 'week' },
      { value: 'fortnight',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.fortnight'), selected: filter === 'fortnight' },
      { value: 'month',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.month'), selected: filter === 'month' },
    ];
  }

  formatDate(inputDate) {
    if (!inputDate) return '';
    return moment(inputDate).format('D MMMM YYYY');
  }

  formatSource(job) {
    if (!job.sourceType) return null;

    // eslint-disable-next-line no-underscore-dangle
    return job.sourceUrl ? job.sourceUrl : i18n.__(`sourceType.${job.sourceType}`);
  }

  dashboardTimeline(jobs) {
    const totals = { interested: 0, applied: 0, interview: 0, result: 0 };

    jobs.forEach(function (job) {
      totals[job.status]++;
    });

    const totalsArray = Object.keys(totals).map(function (k) { return totals[k]; });
    const maxTotal = Math.max(...totalsArray);

    return {
      maxScale: this.getTimelineScale(maxTotal),
      totals: [
        { type: 'interested',
          // eslint-disable-next-line no-underscore-dangle
          label: i18n.__('progression.interested'),
          total: totals.interested,
          scale: this.getTimelineScale(totals.interested) },
        { type: 'applied',
          // eslint-disable-next-line no-underscore-dangle
          label: i18n.__('progression.applied'),
          total: totals.applied,
          scale: this.getTimelineScale(totals.applied) },
        { type: 'interview',
          // eslint-disable-next-line no-underscore-dangle
          label: i18n.__('progression.interview'),
          total: totals.interview,
          scale: this.getTimelineScale(totals.interview) },
        { type: 'result',
          // eslint-disable-next-line no-underscore-dangle
          label: i18n.__('progression.result'),
          total: totals.result,
          scale: this.getTimelineScale(totals.result) },
      ],
    };
  }

  getTimelineScale(total) {
    return total < 6 ? total : 6;
  }
};
